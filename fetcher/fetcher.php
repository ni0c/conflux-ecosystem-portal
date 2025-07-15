<?php

define("WEB_DIR", "../web/");
include(WEB_DIR . "funcs.php");

define("DEBUG_ENABLED", true);
define("DEBUG_JSON", true);

doInit();

$retVal = $error = $debug = $okFile = $errFile = null;

try
{
    list($retVal, $error, $debug) = runFetcher();
} catch (Exception $e) 
{
    $addErr = '';
    if (!is_null($errFile))
    {
        if (!file_put_contents($errFile, json_encode(["error"=>true, "critical"=>true, "msg"=>"PHP throws: " . $e->getMessage()],JSON_PRETTY_PRINT)))
        {
            $addErr .= " | ERR_ADD:Additionally could not save to error file.";
        }
    }
    die("ERRC:".json_encode($e->getMessage()) . $addErr);
}

if ($retVal)
{
    die("OK:success");
}

$vals = "";
if (!is_null($debug))
{
    $vals = json_encode($debug);
}

if (!is_null($errFile))
{
    if (!file_put_contents($errFile, json_encode(["error"=>true, "msg"=>$error, "code"=>$error, "debug"=>$debug],JSON_PRETTY_PRINT)))
    {
        $addErr .= " | ERR_ADD:Additionally could not save to error file.";
    }
}

die("ERR:".$error.":".$vals);


//

function runFetcher()
{
    global $okFile, $errFile;

    

    if (!isset($_SERVER["argv"][1]))
    {
        return [false, "ERR_NO_ARG", null];
    }
    


    $b64data = $_SERVER["argv"][1];

    $arr = json_decode(base64_decode($b64data), true);
    if (!is_array($arr))
    {
        return [false, "ERR_ARG_INVALID", null];
    }
    
    $okFile = $arr["okFile"];
    $errFile = $arr["errFile"];
    $file = $arr["file"];

    if (!is_file($file))
    {
        return [false, "ERR_NO_FILE", null];
    }
    
    $json = json_decode(file_get_contents($file), true);
    
    if (!is_array($json) || count($json) == 0)
    {
        return [false, "ERR_EMPTY_FILE", null];
    }
    
    $url = $json["url"]; 
    $type = $json["type"];
    $data = [];
    if (isset($json["data"]))
    {
        $data = $json["data"];
    }
    $returnAs = $json["returnAs"];
    $httpAuth = $json["httpAuth"];
    $headers = $json["headers"];
    if (!is_array($headers))
    {
        $headers = [];
    }
    
    // fetchURL($url, $data=[], $type='GET', $headersArray=[], $httpAuth='', $returnAs='JSON')
    //echo "fetchURL($url, $data, $type, $headers, $httpAuth, $returnAs)\n";
    $raw = fetchURL($url, $data, $type, $headers, $httpAuth, $returnAs);
    
    
    $ret = null;
    switch ($returnAs)
    {
        case 'JSON':
            $ret = $raw;
            break;
        case 'float':
            $ret = (float) (trim($raw));
            break;
        default: 
            $ret = trim($raw);
        
    }
    $raw = '';
    
    print_r($ret);

    // Do we require some attributes to be present or some attributes not to be present?
    $mustHave = $json["mustHave"];
    $mustNotHave = $json["mustNotHave"];
    
    if ($returnAs == 'JSON')
    {
        if (is_array($mustHave) && count($mustHave) > 0)
        {
            foreach ($mustHave as $must)
            {
                // value: has.many.parts
                //         0   1     2
                $parts = explode(".", $must);
                if (count($parts) == 1)
                {
                    $key = $parts[0];
                    if (!isset($ret[$key]))
                    {
                        return [false, "ERR_KEY_MISSING", ["array"=>$parts,"key"=>$key]];
                        //die("ERR_KEY_MISSING:" . $key);
                    }
                }
                
                $lastArray = $ret;
                $keys = "";
                foreach ($parts as $i=>$key)
                {
                    if (!isset($lastArray[$key]))
                    {
                        
                        return [false, "ERR_KEY_MISSING2", ["array"=>$parts, "last"=>$lastArray, "key"=>$key, "keys"=>$keys]];
                        //die("ERR_KEY_MISSING2:" . $keys . "." . $key);
                    }
                    $lastArray = $lastArray[$key];
                    if (strlen($keys) !== 0)
                    {
                        $keys .= ".";
                    }
                    $keys .= $key;
                }
            }
        }
    
        if (is_array($mustNotHave) && count($mustNotHave) > 0)
        {
            foreach ($mustNotHave as $must)
            {
                // value: has.many.parts
                //         0   1     2
                $parts = explode(".", $must);
                if (count($parts) == 1)
                {
                    $key = $parts[0];
                    if (isset($ret[$key]))
                    {
                        return [false, "ERR_KEY_FOUND", ["key"=>$key]];
                        //die("ERR_KEY_FOUND:" . $key);
                    }
                }
                
                $lastArray = $ret;
                $keys = "";
                foreach ($parts as $i=>$key)
                {
                    if (isset($lastArray[$key]))
                    {
                        return [false, "ERR_KEY_FOUND2", ["key"=>$key, "keys"=>$keys]];
                        //die("ERR_KEY_FOUND2:" . $keys . "." . $key);
                    }
                    $lastArray = $lastArray[$key];
                    if (strlen($keys) !== 0)
                    {
                        $keys .= ".";
                    }
                    $keys .= $key;
                }
            }
        }
    }
    
    $outputFile = $file;
    
    if (!file_put_contents($outputFile, json_encode(
        [
            "updated"=>date("U"),
            "ret"=>$ret, 
            "args"=>$json
        ]
    ))) 
    {
        return [false, "ERR_CANT_SAVE_FILE", $outputFile];
    } 
    
    if (!file_put_contents($okFile, json_encode(
        [
            "updated"=>date("U"),
            "data"=>$ret
        ]
    ))) 
    {
        return [false, "ERR_CANT_SAVE_OK_FILE", $outputFile];
    }
    


    return [true, null, null];
}
