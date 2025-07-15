<?php

define("APP_NAME", "CFX-Eco-App");

define("DB_USERS", "users");
define("DB_PROJECTS", "projects");
define("DB_MODS", "mods");
define("DB_HELPERS", "helpers");
define("DB_DATASOURCES", "datasources");
define("DB_DATAS", "datas");
define("DB_METRICS", "metrics");
define("DB_COOKIES", "cookies");
define("DB_TEMP", "temp");
define("DB_LOGIN_HISTORY", "loginhistory");

define("COOKIE_NAME", "userSessionCookie");
define("ERROR_LOGIN_COOKIE", "errorLoginCookie");

$_initialized = false;

function doInit()
{
    if (isInit())
    {
        return;
    }

    if (!function_exists('curl_init')) 
    {
        die("Installation Error: PHP-curl package missing.");    
    }
    $dotenvFile = WEB_DIR . ".env";
    dotenv::init($dotenvFile);

    $checkEnvs = [
        "DB_DIR",
        "MAIL_SENDER_EMAIL",
        "MAIL_SENDER_NAME",
        "GMAIL_USER",
        "GMAIL_AUTH",
        "PUBLIC_FILES_DIR",
        "RELATIVE_URL",
        "RELATIVE_URL_TO_PUB",
        "FETCHER_DIR",
    ];

    foreach ($checkEnvs as $cEnv)
    {
        $_test = dotenv::get($cEnv);
        if (empty($_test))
        {
            die("ERROR: Configuration error: $cEnv not set up to .env");
        }
    }

    db::init();

    setInit();
}

function isInit()
{
    global $_initialized;

    return $_initialized ? true : false;
}

function setInit()
{
    global $_initialized;

    $_initialized = true;
}

class dotenv
{
    private static $env = [];

    public static function init($file)
    {
        if (!is_file($file))
        {
            die("Configuration Error: .env file missing.");
        }
        self::readDotEnv($file);
    }

    public static function setEnv($env)
    {
        self::$env = $env;
    }

    public static function get($key)
    {
        if (!isset(self::$env[$key]))
        {
            return null;
        }

        return self::$env[$key];
    }

    private static function readDotEnv($file)
    {
        $raw = trim(file_get_contents($file));
        $lines = explode("\n", $raw);
    
        $env = [];
    
        foreach ($lines as $_line)
        {
            $line = trim($_line);
            if (strlen($line) == 0 || substr($line, 0, 1) == "#")
            {
                continue;
            }
            $lineAsArray = explode("=", $line);
            if (count($lineAsArray) < 2)
            {
                continue;
            }
            $firstArg = array_shift($lineAsArray);
            $secondArg = trim(implode("=", $lineAsArray));
    
            $env[$firstArg] = $secondArg;
        }
    
        self::setEnv($env);
    
    }
}

function makeDir($dir)
{
    if (!is_dir($dir))
    {
        $ret = mkdir($dir);

        // TODO! Check that mkdir error is ok
        if (!$ret)
        {
            die("ERROR: Configuration error: Incorrect modifying rights for the apache set for DB. Not enough rights or users incorrect.");
        }
    }
}

class db
{
    private static $db = [];

    private static $dbDir = null;

    private static $usersDir = null; 
    private static $projectsDir = null;
    private static $modsDir = null;
    private static $helpersDir = null;
    private static $datasourcesDir = null;
    private static $datasDir = null;
    private static $metricsDir = null;
    private static $loginHistoryDir = null;
    private static $cookiesDir = null;
    private static $tempDir = null;

    public static function init()
    {

  

        self::$dbDir = dotenv::get("DB_DIR");

        $dbDir = self::$dbDir;

        self::$usersDir = $dbDir . "users/";
        self::$projectsDir = $dbDir . "projects/";
        self::$modsDir = $dbDir . "mods/";
        self::$helpersDir = $dbDir . "helpers/";
        self::$datasourcesDir = $dbDir . "datasources/";
        self::$datasDir = $dbDir . "datas/";
        self::$metricsDir = $dbDir . "metrics/";
        self::$loginHistoryDir = $dbDir . "login-history/";
        self::$cookiesDir = $dbDir . "cookies/";
        self::$tempDir = $dbDir . "tmp/";

        // Making dirs if they dont exist. Assuming having enough user rights to make them.
        makeDir(self::$usersDir);
        makeDir(self::$projectsDir);
        makeDir(self::$modsDir);
        makeDir(self::$helpersDir);
        makeDir(self::$datasourcesDir);
        makeDir(self::$datasDir);
        makeDir(self::$metricsDir);
        makeDir(self::$loginHistoryDir);
        makeDir(self::$cookiesDir);
        makeDir(self::$tempDir);

    }

    public static function readDb($dbType, $dbFilename)
    {
        $dir = self::_getDbDir($dbType);
        if (is_null($dir))
        {
            return null;
        }

        $dbFile = $dir . $dbFilename;

        if (!is_file($dbFile))
        {
            return null;
        }

        $raw = trim(file_get_contents($dbFile));
        if (strlen($raw) == 0)
        {
            return null;
        }

        $array = json_decode($raw, true);
        /*
        if (!is_array($array))
        {
            return [];
        }
        */

        return $array;
    }

    public static function readDbDir($dbType)
    {
        $dir = self::_getDbDir($dbType);
        if (is_null($dir))
        {
            return [];
        }

        $files = getDirFiles($dir);

      
        if (is_null($files) || count($files) == 0)
        {
            return [];
        }

        $array = [];

        foreach ($files as $file)
        {
            $raw = file_get_contents($file);
        
            $arr = json_decode($raw, true);

            $array[] = $arr;
        
        }
        return $array;
    }

    public static function _getDbDir($dbType)
    {
        $dir = null;
        switch ($dbType)
        {
            case DB_USERS:
                $dir = self::$usersDir;
                break;
            case DB_PROJECTS:
                $dir = self::$projectsDir;
                break;
            case DB_MODS:
                $dir = self::$modsDir;
                break;
            case DB_HELPERS:
                $dir = self::$helpersDir;
                break;
            case DB_DATASOURCES:
                $dir = self::$datasourcesDir;
                break;
            case DB_DATAS:
                $dir = self::$datasDir;
                break;
            case DB_METRICS:
                $dir = self::$metricsDir;
                break;
            case DB_LOGIN_HISTORY:
                $dir = self::$loginHistoryDir;
                break;
            case DB_COOKIES:
                $dir = self::$cookiesDir;
                break;
            case DB_TEMP:
                $dir = self::$tempDir;
                break;
            default:
                // return null;
        }
        return $dir;
    }

    public static function writeDb($dbType, $dbFilename, $dataArray)
    {
        _debug("writeDb: $dbType | $dbFilename | " .json_encode($dataArray));

        if (!is_array($dataArray))
        {
            return [false, "ERROR: Errornous data: Data to write must be an array. Exiting."];        
        }

        $dir = self::_getDbDir($dbType);
        if (is_null($dir))
        {
            return [false, "ERROR: WriteDB: Invalid DbType given. Exiting."];
        }

        $dbFile = $dir . $dbFilename;

        $json = json_encode($dataArray);
        $flag = file_put_contents($dbFile, $json);
        
        //TODO! check the flag here - probably wrong
        if (!$flag)
        {
            return [false, "ERROR: Could not write to Database file. Exiting."];        
        }

        return [true, null];
    }

    public static function removeDbFile($dbType, $dbFilename)
    {
        _debug("removeDbFile: $dbType | $dbFilename");

        $dir = self::_getDbDir($dbType);
        if (is_null($dir))
        {
            return [false, "ERROR: removeDbFile: Invalid DbType given. Exiting."];
        }

        $dbFile = $dir . $dbFilename;

        if (!is_file($dbFile))
        {
            return [true, "Notice: removeDbFile: No file to delete"];
        }

        $flag = unlink($dbFile);
        
        //TODO! check the flag here - probably wrong
        if (!$flag)
        {
            return [false, "ERROR: removeDbFile: Could not remove file. Exiting."];        
        }

        return [true, null];
    }



}

function getDirFilenames($dir)
{
	$filenames = array_slice(scandir($dir), 2);
	return $filenames;
}

function getDirFiles($dir)
{
	$filenames = getDirFilenames($dir);
    $files = [];
    foreach ($filenames as $fn)
    {
        $files[] = $dir . $fn;
    }
	return $files;
}

function getRandomString($length) 
{
	$chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" . 
        "abcdefghijklmnopqrstuvwxyz" .
        "0123456789";	
	$str = "";

	while(strlen($str)<$length) 
	{
		$str .= substr($chars,(rand()%(strlen($chars))),1);
	}
	return($str);
}

function createProjectId()
{
    $id = date("U") . getRandomString(8);
    return $id;
}


function createDatasourceId()
{
    $id = date("U") . getRandomString(8);
    return $id;
}

function sendEmail($to, $subject, $message)
{
    list($ret, $err) = sendEmailRaw($to, $subject, $message);
    if (!$ret)
    {
        if ((defined("DEBUG_ENABLED") && DEBUG_ENABLED) && (defined("DEBUG_JSON") && DEBUG_JSON))
        {
            global $debugJson;
            if (!is_array($debugJson))
            {
                $debugJson = [];
            }
            $debugJson[] = "Mailer returned error:";
            $debugJson[] = $err;
        }
    }
    return $ret;
}

function sendEmailRaw($to, $subject, $message)
{
    $webDir = dotenv::get("WEB_DIR");
    include_once($webDir . "mailer.php");
    $ret = mailer::sendMail($to, $subject, $message);
    if (!$ret)
    {
        $error = mailer::getLog();
        return [false, $error];
    }
    return [true, null];
}

function getUser($username)
{
    if (empty($username))
    {
        return null;
    }

    _debug("getUser: ".$username);

    $user = parseGithubUsername($username);

    $filename = $user . ".json";

    /* 
        $userData = [
            "id"=>$userId,
            "user"=>$username,
            "data"=>$data,
            "modified"=>date("U"),
        ]; 
    */

    $userData = db::readDb(DB_USERS, $filename);
    
    if (count($userData)==0)
    {
        return null;
    }

    return $userData;

}

function parseProjectId($_value)
{
    $_val = trim((String) $_value);
    $__val = preg_replace("/[^A-Za-z0-9]/", "", $_val);
    if (strlen($__val) < 18)
    {
        return null;
    }
    return $__val;
}

function parseDatasourceId($_value)
{
    $_val = trim((String) $_value);
    $__val = preg_replace("/[^A-Za-z0-9]/", "", $_val);
    if (strlen($__val) > 8 || is_numeric(substr($__val, 0, 1)))
    {
        return null;
    }
    return $__val;
}

function parseHttpAuth($_value)
{
    $_val = trim((String) $_value);
    $count = substr_count($_val, ':');
    if (strlen($_val) < 3 || $count !== 1)
    {
        return null;
    }
    return $_val;
}

function parseGithubUsername($_username)
{
    // max 39 alpha-numeric + hyphens
    $_user = (string) $_username;
    $_user2 = preg_replace("/[^A-Za-z0-9-]/", "", trim($_user));
    if (strlen($_user2) > 39)
    {
        $_user2 = substr($_user2, 0, 39);
    }

    if (substr($_user2, 0, 1) == "-")
    {
        return null;
    }

    _debug("parseGithubUsername: $_username > $_user | $_user2");

    return strtolower($_user2);
}

function isValidGithubUsername($_username)
{
    $username = parseGithubUsername(trim((String) $_username));
    if (strlen($username) !== strlen($_username))
    {
        return false;
    }
    return true;

}

function parseCookieId($_cookieId)
{
    // numbers divided by one "_"

    $_cid1 = (string) $_cookieId;
    $_cid2 = preg_replace('/[^0-9_]/', '', trim($_cid1));

    if (strlen($_cid2) > 80)
    {
        return null;
    }

    $cidArray = explode("_", $_cid2);
    if (count($cidArray) != 2)
    {
        return null;
    }
    
    return $_cid2;
}

$debugJson = [];

function _debug($str)
{
    if ( DEBUG_ENABLED !== null && DEBUG_ENABLED )
    {
        // json form debug
        if (DEBUG_JSON !== null && DEBUG_JSON)
        {
            global $debugJson;

            $debugJson[] = $str;
            return;
        } 
        
        // normal debug
        echo "\n" . $str . "\n";

    }
}

function fetchURL($url, $data=[], $type='GET', $headersArray=[], $httpAuth='', $returnAs='JSON')
{
	$ch = curl_init();
    
    $response = null;

    //$headers = [];
    //$headers = explode("\n", $headersAsString);

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headersArray);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLOPT_URL, $url);

    if ($type=='POST')
    {
        curl_setopt($ch, CURLOPT_POST, 1);
        if (is_array($data))
        {
            $payload = http_build_query($data);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        }
    } else if ($type=='JSON')
    {
        curl_setopt($ch, CURLOPT_POST, 1);
        if (is_array($data))
        {
            $payload = json_encode($data);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        }
    } 
    if (strlen($httpAuth)>0)
    {
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
        curl_setopt($ch, CURLOPT_USERPWD, $httpAuth);
    }
    
    
    $response = curl_exec($ch);

    _debug($response);

    $ret = null;
    if ($returnAs == 'JSON' && strlen(trim($response)) > 0)
    {
        $ret = json_decode($response, true);
    } else
    { // string
        $ret = $response;
    }

    // $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    curl_close($ch);
    //$header = substr($response, 0, $header_size);
    //$body = substr($response, $header_size);
    //return [$header,$body];

    return $ret;
}


function fetchImageFromUrl($url)
{
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HTTPHEADER, ['User-Agent: curl']);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_ENCODING, '');
	curl_setopt($ch, CURLOPT_URL, $url);
	$result = curl_exec($ch);
	curl_close($ch);

	return $result;

}