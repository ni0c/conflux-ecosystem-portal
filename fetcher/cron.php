<?php

define("WEB_DIR", "../web/");

define("DEBUG_ENABLED", true);
define("DEBUG_JSON", true);

include(WEB_DIR . "funcs.php");

doInit();

define("PUBLIC_FILES_DIR", dotenv::get("PUBLIC_FILES_DIR"));
define("RELATIVE_URL", dotenv::get("RELATIVE_URL"));
define("RELATIVE_URL_TO_PUB", dotenv::get("RELATIVE_URL_TO_PUB"));
define("FETCHER_DIR", dotenv::get("FETCHER_DIR"));


runCrons();


//

function runCrons()
{
    $dayOfYear = date("z");
    $weekDay = date("w");
    $runDaily = true;
    $runBiDaily = ($dayOfYear % 2 == 0);
    $runTriDaily = ($dayOfYear % 3 == 0);
    $runWeekly = ($weekDay === 1); // monday
    $crons = [
        "once a day",
        "once every 2 days",
        "once every 3 days",
        "once a week",
    ];

    // Read Crons from DB
    $data = db::readDbDir(DB_DATASOURCES);
    foreach ($data as $ds)
    {
        if (!is_array($ds) || (is_array($ds) && count($ds) == 0))
        {
            // Error with data, aborting, TODO: report?
            continue;
        }

        $_cron = $ds["cron"];
        
        switch ($_cron)
        {
            case $crons[0]: 
                $doRun = $runDaily;
                break;
            case $crons[1]: 
                $doRun = $runBiDaily;
                break;                
            case $crons[2]: 
                $doRun = $runTriDaily;
                break;                
            case $crons[3]: 
                $doRun = $runWeekly;
                break;
            default:
                // Error with data, aborting, TODO: report?
                continue 2;                
    
        }

        if (!$doRun)
        {
            continue;
        }

        $did = $ds["did"];

        // Save file for fetcher
        $dir = db::_getDbDir(DB_TEMP);
        $filename = "cron." . $did . "." . date("U");

        $file = $dir . $filename;

        $datasdir = db::_getDbDir(DB_DATAS);

        $okfile = $datasdir . "ok." . $did;
        $errfile = $datasdir . "err." . $did;


        if (!file_put_contents($file, json_encode($ds)))
        {
            // TODO: Need to notify about this?
            die("ERROR_CRITICAL: Cant save to Datasources Db directory. Aborting.");
        }
        
        $b64data = base64_encode(json_encode(["okFile"=>$okfile, "errFile"=>$errfile, "file"=>$file]));

        // Run cron fetcher

        $fetcherPhpFile = FETCHER_DIR . "fetcher.php";

        $cmd = "/usr/bin/php " . $fetcherPhpFile . " " . $b64data . " 2&>1";

        $output = trim(shell_exec($cmd));
        // handle output


        if ($output == "OK:success")
        {
            unlink($file);
            continue;
        }


        // TODO: handle error here
        echo "Error with cmd: $cmd - out: $output\n";      
          
        // unlink($file);



    }



}

/*
    DS:
    {
        "name": "Testi 1",
        "dsid": "test1",
        "url": "https:\/\/google.com",
        "type": "JSON",
        "cron": "once a day",
        "returnAs": "JSON",
        "httpAuth": null,
        "headers": [
            "testing-header: 1.0 chicken"
        ],
        "mustHave": [
            "success"
        ],
        "mustNotHave": [
            "error",
            "err"
        ],
        "json": null,
        "did": "1744384630QB3Lv6WS",
        "creationDate": "1744384630",
        "creationUser": "web-o-matic"
    }
*/