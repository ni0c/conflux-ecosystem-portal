<?php

define("WEB_DIR", "../web/");

define("DEBUG_ENABLED", true);
define("DEBUG_JSON", true);

include(WEB_DIR . "funcs.php");

doInit();

define("PUBLIC_FILES_DIR", dotenv::get("PUBLIC_FILES_DIR"));
define("RELATIVE_URL", dotenv::get("RELATIVE_URL"));
define("RELATIVE_URL_TO_PUB", dotenv::get("RELATIVE_URL_TO_PUB"));

handleRequest();

//
/*

    DB 
    ====


    - USER DB
    -----------
    Naming scheme: userDir/[userid].[unixDate] (same as github userid/name in base64?)
    Data:
    - unique userid 
    - github username
    - github userid
    - github extra data
    - register date
    - modified date
    - modifier (unique used id)
    - user state: active / deleted


    - LOGIN DB   loginDir/[validUntil].[uniqueLoginId]
    ------------
    - last login
    - unique login token
    - unique userid
    - valid until

    - LOGIN DB HISTORY loginArchiveDir/[validUntil].[uniqueLoginId]
    -------------------
    - login date
    - (logout date)
    - unique userid
    - attempt: success / failure

    - MOD DB modDir/[uniqueUserId].[modifyDate]
    ----------
    - unique userid

    - MOD DB HISTORY modDir/[uniqueUserId].[modifyDate]
    ------------------
    - unique userid
    - creation-date
    - modify-date
    - added-by-unique-userid
    - removed-by-unique-userid
    
    - PROJECT DB projectDir/[uniqueProjectId].[modifyDate]
    --------------
    - unique ProjectId
    - editors (unique userid list)
    - creation-date
    - modify-date
    - creator
    - modifier
    - state: active / archived
    - archive-date ?

    - METRICS DB metricsDir/[uniqueMetricId].[modifyDate]
    --------------


    - HELPERS DB helpersDir/[uniqueHelpersId].[modifyDate]
    --------------


    - DATASOURCES DB datasourcesDir/[uniqueDatasourcesId],[modifyDate]
    ------------------




*/

class user
{
    public static $user = null;
    public static $username = null;
    public static $loggedState = false;
    public static $mod = false;

    public static function checkLogin()
    {

        $now = date("U");

        if (!isset($_COOKIE[COOKIE_NAME]))
        {
            // not logged in
            
            return [
                "loggedIn"=>false,
                "code"=>"NOT_LOGGED_IN_1"
            ];
        }
        $value = parseCookieId($_COOKIE[COOKIE_NAME]);
        if (is_null($value))
        {
            // not logged in (basically error)
            return [
                "loggedIn"=>false,
                "code"=>"NOT_LOGGED_IN_2",
                "debug1"=>$_COOKIE[COOKIE_NAME],
                "debug2"=>$value,
            ];
        }
        // Check if cookie exists and is valid from db
        $cookieDbFilename = $value . ".json";
        $dbArray = db::readDb(DB_COOKIES, $cookieDbFilename);
        if (!is_array($dbArray) || count($dbArray) == 0)
        {
            // Could be an internal error?
            return [
                "loggedIn"=>false,
                "code"=>"NOT_LOGGED_IN_3"
            ];
        }

        $user = $dbArray["user"];
        $username = $dbArray["username"];
        $valid = $dbArray["valid"];
        
        if ($valid<$now)
        {
            return [
                "loggedIn"=>false,
                "code"=>"LOGIN_EXPIRED"
            ];
        }

        // get user data
        $userData = getUser($username);
        if (is_null($userData))
        {
            // should not happen, internal error, user data missing
            return [ 
                "loggedIn"=>false,
                "code"=>"ERROR_USER_DATA_MISSING"
            ];
        }


        // is user a mod?
        $mod = false;
        $modsData = getListRaw("mods");
        foreach ($modsData as $modArr)
        {
            $_username = strtolower($modArr["username"]);
            if ($_username == $username)
            {
                $mod = true;
            }
            
        }

        self::$user = $userData;
        self::$username = $username;

        self::$mod = $mod;

        self::$loggedState = true;

        return [
            "loggedIn"=>true,
            "code"=>"COOKIE_OK",
            "mod" => $mod,
            "data" => $userData,
        ];


    }
}

function isUserInUsers($username, $users)
{
    $user1 = trim(strtolower($username));
    foreach ($users as $user)
    {
        $user2 = trim(strtolower($user));
        if ($user1 == $user2)
        {
            return true;
        }       
    }
    return false;
}


function ifNotMod_Exit()
{
    // Checking if user is a mod (and logged in)
    user::checkLogin();
            
    if (!user::$mod)
    {
        // Exits if not mod (or logged in)
        jsonError("ERR_NO_ACCESS", "No access");
    }
}

function ifNotLoggedIn_Exit()
{
     // Checking if user is logged in
    user::checkLogin();
            
    if (!user::$loggedState)
    {
        // Exits if not logged in
        jsonError("ERR_NO_ACCESS", "No access");
    }
}

function handleRequest()
{
    if (!isset($_POST["req"]))
    {
        // exits
        jsonError("ERR_INVALID_REQUEST_1", "Invalid request");

    }


    switch ($_POST["req"])
    {

        // public actions ( no need for login )
        /////////////////

        case 'checkLogin':
            checkLogin();
            break;

        case 'getMetrics':
            getMetrics();
            break;

        case 'projectsList':
 
            getProjects();
            
            break;          

        case 'helpersList':
            getList("helpers");
            break;


        // Logged in actions
        ////////////////////

        case 'addProject':      
            ifNotLoggedIn_Exit();

            addProject();  
            break;   

        case 'modifyProject':
            ifNotLoggedIn_Exit();

            modifyProject();  
            break;
            
        case 'removeProject':
            ifNotLoggedIn_Exit();
            
            removeProject();
            break;            

        // Mod actions
        //////////////

        case 'editProjectOrder':
            ifNotMod_Exit();
            
            editProjectOrder();
            break; 

        case 'approveProject':
            ifNotMod_Exit();
            
            approveProject();
            break;    
        
        case 'addDatasource':
            ifNotMod_Exit();

            addDatasource();
            break;

        case 'modifyDatasource':
            ifNotMod_Exit();

            modifyDatasource();
            break;

       case 'addMetric':
            ifNotMod_Exit();

            addMetric();
            break;            

       case 'addHelper':
            ifNotMod_Exit();

            addHelper();
            break;  

        case 'metricsList':
            ifNotMod_Exit();

            getList("metrics");
            break;            

        case 'modsList':
            ifNotMod_Exit();

            getList("mods");
            break;
   
        case 'datasourcesList':
            ifNotMod_Exit();

            getList("datasources");          
            break;

        case 'datasourcesListData':
            ifNotMod_Exit();

            getDatasourcesWithData();
            break;

        case 'removeMod':
            ifNotMod_Exit();
            
            removeMod();
            break;

        case 'removeDatasource':
            ifNotMod_Exit();
            
            removeDatasource();
            break;

        case 'removeHelper':
            ifNotMod_Exit();
            
            removeHelper();
            break;

        case 'removeMetric':
            ifNotMod_Exit();
            
            removeMetric();
            break;            

        case 'addMod':
            ifNotMod_Exit();

            addMod();
            break;

        default:
            // error

            // exits
            jsonError("ERR_INVALID_REQUEST_2", "Invalid request");

    }



    /*
        Requests:
        (without login)
        - Main page
        - Login (with Github)
        - Metrics & Projects & Helper data retrieving for main page

        (with login / login checked always first before access)
        - Add/remove/modify data sources 
        - Add/remove/modify metrics
        - Add/remove/modify users/mods
        - Add/remove/modify helpers
        - Add/remove/modify projects
    */



}

function approveProject()
{
    if (!isset($_POST["projId"]))
    {
        // Exits
        jsonError("ERR_NO_DATA", "No data");
    }

    if (empty($_POST["projId"]) || !is_string($_POST["projId"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(1)");
    }

    $projId = parseProjectId($_POST["projId"]);
    if (is_null($projId))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $list = getListRaw("projects");

    if (is_array($list) && count($list) > 0)
    {
        foreach ($list as $arr)
        {   
            if ($arr["projectId"] == $projId)
            {


                $DbFile = $arr["projectId"] . ".json";

                $arr["approved"] = true;
                $arr["approveDate"] = date("U");
                $arr["approveUser"] = user::$username;

                list($ret, $error) = db::writeDb(DB_PROJECTS, $DbFile, $arr);
                if (!$ret)
                {
                    //echo $error;
                    // TODO: Debug??
                    jsonError("ERR_DB_WRITE_ERROR", "Cannot write to DB");                  
                }
                // exits
                jsonSuccess(["projId"=>$arr["projectId"]]);
            }
        }
    }

    // exits
    jsonError("ERR_NOT_FOUND", "Project not found");

}

function editProjectOrder()
{
    if (!isset($_POST["projId"]) || !isset($_POST["order"]))
    {
        // Exits
        jsonError("ERR_NO_DATA", "No data");
    }

    if (empty($_POST["projId"]) || !is_string($_POST["projId"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(1)");
    }

    $projId = parseProjectId($_POST["projId"]);
    if (is_null($projId))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $order = 5;
    $_order = (int) $_POST["order"];
    if ($_order >= 1 && $_order <= 9)
    {
        $order = $_order;
    }

    $list = getListRaw("projects");

    if (is_array($list) && count($list) > 0)
    {
        foreach ($list as $arr)
        {   
            if ($arr["projectId"] == $projId)
            {


                $DbFile = $arr["projectId"] . ".json";

                $arr["order"] = $order;

                list($ret, $error) = db::writeDb(DB_PROJECTS, $DbFile, $arr);
                if (!$ret)
                {
                    //echo $error;
                    // TODO: Debug??
                    jsonError("ERR_DB_WRITE_ERROR", "Cannot write to DB");                  
                }
                // exits
                jsonSuccess(["projId"=>$arr["projectId"]]);
            }
        }
    }

    // exits
    jsonError("ERR_NOT_FOUND", "Project not found");

}


function removeProject()
{
    if (!isset($_POST["projId"]))
    {
        // Exits
        jsonError("ERR_NO_DATA", "No data");
    }

    if (empty($_POST["projId"]) || !is_string($_POST["projId"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(1)");
    }

    $projId = parseProjectId($_POST["projId"]);
    if (is_null($projId))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $list = getListRaw("projects");


    $thisData = null;
    if (is_array($list) && count($list) > 0)
    {
        foreach ($list as $arr)
        {   
            if ($arr["projectId"] == $projId)
            {

                $thisData = $arr;
                if (!user::$mod && !isUserInUsers(user::$username, $thisData["users"]))
                {
                    // Exits
                    jsonError("ERR_NO_ACCESS", "No access");
                }

                $DbFile = $arr["projectId"] . ".json";

                list($ret, $err) = db::removeDbFile(DB_PROJECTS, $DbFile);
                if (!$ret)
                {
                    jsonError("ERR_CANT_REMOVE", "Could not remove");
                    // TODO: Need debug?
                }
                // exits
                jsonSuccess(["projId"=>$arr["projectId"]]);
            }
        }
    }

    // exits
    jsonError("ERR_NOT_FOUND", "Project not found");

}

function removeMetric()
{
    // Checking if user is a mod (and logged in)
    if (!user::$mod)
    {
        // Exits
        jsonError("ERR_NO_ACCESS", "No access");
    }

    if (!isset($_POST["creationDate"]))
    {
        // Exits
        jsonError("ERR_NO_DATA", "No data");
    }

    if (empty($_POST["creationDate"]) || !is_string($_POST["creationDate"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(1)");
    }

    $udate = parseValue("backendUnixdate", $_POST["creationDate"]);
    if (is_null($udate))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $data = getListRaw("metrics");
    $success = false;
    
    foreach ($data as $arr)
    {
        $_udate = (int) $arr["creationDate"];
        if ($_udate == $udate)
        {
            $fid = $arr["_id"];
            list($ret, $err) = db::removeDbFile(DB_METRICS, $fid . ".json");
            if (!$ret)
            {
                jsonError("ERR_CANT_REMOVE", "Could not remove");
                // TODO: Need debug?
            }
            // exits
            jsonSuccess(["creationDate"=>$udate]);

        }
        
    }

    jsonError("ERR_NOT_FOUND", "Datasource not found");
}

function removeHelper()
{
    // Checking if user is a mod (and logged in)
    if (!user::$mod)
    {
        // Exits
        jsonError("ERR_NO_ACCESS", "No access");
    }

    if (!isset($_POST["creationDate"]))
    {
        // Exits
        jsonError("ERR_NO_DATA", "No data");
    }

    if (empty($_POST["creationDate"]) || !is_string($_POST["creationDate"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(1)");
    }

    $udate = parseValue("backendUnixdate", $_POST["creationDate"]);
    if (is_null($udate))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $data = getListRaw("helpers");
    $success = false;
    
    foreach ($data as $arr)
    {
        $_udate = (int) $arr["creationDate"];
        if ($_udate == $udate)
        {
            $fid = $arr["_id"];
            list($ret, $err) = db::removeDbFile(DB_HELPERS, $fid . ".json");
            if (!$ret)
            {
                jsonError("ERR_CANT_REMOVE", "Could not remove");
                // TODO: Need debug?
            }
            // exits
            jsonSuccess(["creationDate"=>$udate]);

        }
        
    }

    jsonError("ERR_NOT_FOUND", "Datasource not found");
}


function removeDatasource()
{
    // Checking if user is a mod (and logged in)
    if (!user::$mod)
    {
        // Exits
        jsonError("ERR_NO_ACCESS", "No access");
    }

    if (!isset($_POST["dsid"]))
    {
        // Exits
        jsonError("ERR_NO_DATA", "No data");
    }

    if (empty($_POST["dsid"]) || !is_string($_POST["dsid"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(1)");
    }

    $dsid = parseValue("dsid", $_POST["dsid"]);
    if (is_null($dsid))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $data = getListRaw("datasources");
    $success = false;

    $ldsid = strtolower($dsid);
    foreach ($data as $arr)
    {
        $_dsid = $arr["dsid"];
        $_ldsid = strtolower($_dsid);
        $did = $arr["did"];
        if ($_ldsid == $ldsid)
        {
            list($ret, $err) = db::removeDbFile(DB_DATASOURCES, $did . ".json");
            if (!$ret)
            {
                jsonError("ERR_CANT_REMOVE", "Could not remove");
                // TODO: Need debug?
            }
            // exits
            jsonSuccess(["dsid"=>$dsid]);

        }
        
    }

    jsonError("ERR_NOT_FOUND", "Datasource not found");
}


function removeMod()
{
    // Checking if user is a mod (and logged in)
    if (!user::$mod)
    {
        // Exits
        jsonError("ERR_NO_ACCESS", "No access");
    }

    if (!isset($_POST["mod"]))
    {
        // Exits
        jsonError("ERR_NO_DATA", "No data");
    }

    if (empty($_POST["mod"]) || !is_string($_POST["mod"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(1)");
    }

    $username = parseGithubUsername($_POST["mod"]);

    if (strlen($username) !== strlen(trim($_POST["mod"])))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $modsData = getListRaw("mods");
    $success = false;

    foreach ($modsData as $modArr)
    {
        $_username = strtolower($modArr["username"]);
        if ($_username == $username)
        {
            list($ret, $err) = db::removeDbFile(DB_MODS, $_username . ".json");
            if (!$ret)
            {
                jsonError("ERR_CANT_REMOVE", "Could not remove");
                // TODO: Need debug?
            }
            // exits
            jsonSuccess(["mod"=>$_username]);

        }
        
    }

    jsonError("ERR_NOT_FOUND", "User not found");
}

function addMod()
{
    if (!isset($_POST["username"]) || !isset($_POST["email"]))
    {
        // Exits
        jsonError("ERR_NO_DATA", "No data");
    }

    if (empty($_POST["username"]) || !is_string($_POST["username"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(1)");
    }

    if (empty($_POST["email"]) || !is_string($_POST["email"]))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $username = parseGithubUsername($_POST["username"]);

    if (strlen($username) !== strlen(trim($_POST["username"])))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(3)");
    }

    $email = trim(strtolower($_POST["email"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(4)");
    }   

    $DbFile = $username . ".json";
    $modData = [
        "username" => $username,
        "email" => $email,
    ];
    list($ret, $error) = db::writeDb(DB_MODS, $DbFile, $modData);
    if (!$ret)
    {
        //echo $error;
        // TODO: Debug??
        jsonError("ERR_DB_WRITE_ERROR", "Cannot write to DB");
    }

    jsonSuccess($modData);

}

function modifyProject()
{
    if (!isset($_POST["projectId"]))
    {
        // Exits
        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>"projectId"]);
    }

    $__val = $_POST["projectId"];
    $val = null;
    $_val = null;

    $_val = trim((String) $__val);
    $len = strlen($_val);
    if ($len == 0)
    {
        // Exits
        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>"projectId"]);
    }

    $projId = parseProjectId($_val);
    if (is_null($projId))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    $list = getListRaw("projects");

    $found = false;
    $thisData = null;
    if (is_array($list) && count($list) > 0)
    {
        foreach ($list as $arr)
        {   
            if ($arr["projectId"] == $projId)
            {
                $found = true;
                $thisData = $arr;
                if (!user::$mod && !isUserInUsers(user::$username, $thisData["users"]))
                {
                    // Exits
                    jsonError("ERR_NO_ACCESS", "No access");
                }
            }
        }
    }

    if (!$found)
    {
        // exits
        jsonError("ERR_NOT_FOUND", "Could not find project.");
    }

    addProject($projId, $thisData);

}

function addProject($projId=null, $thisData=null)
{
    $edit = false;
    if (!is_null($projId))
    {
        $edit = true;
    }

    $fields = [
        [
            "key" => "name",
            "type" => "name",
            "desc" => "Project Name",
            "empty" => false
        ],
        [
            "key" => "logoimg",
            "type" => "logoImage",
            "desc" => "Logo Image",
            "empty" => true,
            "emptyalt" => "logo",
            "savekey" => "logo"
        ],
        [
            "key" => "logo",
            "type" => "logoUrl",
            "desc" => "Logo Image URL",
            "empty" => true,
            "emptyalt" => "logoimg"
        ],
        [
            "key" => "desc" ,
            "type" => "longtext",
            "desc" => "Project Description",
            "empty" => false
        ],
        [
            "key" => "website",
            "type" => "url",
            "desc" => "Website",
            "empty" => true
        ],
        [
            "key" => "linktree",
            "type" => "url",
            "desc" => "Link Tree",
            "empty" => true
        ],
        [
            "key" => "twitter",
            "type" => "url",
            "desc" => "X/Twitter",
            "empty" => true
        ],
        [
            "key" => "discord",
            "type" => "url",
            "desc" => "Discord",
            "empty" => true
        ],
        [
            "key" => "tg",
            "type" => "url",
            "desc" => "Telegram",
            "empty" => true
        ],
        [
            "key" => "wechat",
            "type" => "url",
            "desc" => "WeChat",
            "empty" => true
        ],
        [
            "key" => "github",
            "type" => "url",
            "desc" => "GitHub",
            "empty" => true
        ],
        [
            "key" => "categories",
            "type" => "categories",
            "desc" => "Categories",
            "empty" => false
        ], 
    ];

    if ($edit)
    {
        $fields[] = 
        [
            "key" => "logoupdate",
            "type" => "singlebox",
            "desc" => "Logo Update",
            "empty" => true,
        ];
    }

    $values = [];
    $emptyAlts = [];
    $wasEmptyAlt = [];
    $checkedImageUpdate = false;


    foreach ($fields as $field)
    {
        $key = $field["key"];
        $type = $field["type"];
        $empty = $field["empty"];

        $__val = $_POST[$key];
        $val = null;
        $_val = null;

        switch ($type)
        {
            case 'url':
            case 'logoUrl':
            case 'name':
            case 'longtext':
            case 'githubUser':
            case 'categories':
                $_val = trim((String) $__val);
                $len = strlen($_val);

                if (isset($field["emptyAlt"]))
                {
                    $emptyAlts[$key] = $field;
                    $wasEmptyAlt[$key] = ($len == 0);
                }

                if ($len == 0)
                {
                    if (!$empty)
                    {
                        // Exits
                        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>$key]);
                    }

                    if (!($type != "logoUrl" && $edit))
                    {
                        $values[$key] = $val;
                    }
                    continue 2;   
                }

                break;

            case 'logoImage':
                if (isset($field["emptyAlt"]))
                {
                    $emptyAlts[$key] = $field;
                    $wasEmptyAlt[$key] = !isset($_FILES[$key]);
                }
                if (!$edit && !isset($_FILES[$key]))
                {
                    $values[$key] = $val;
                    continue 2;
                }
                break;
        }

        switch ($type)
        {
            case 'url':
            case 'githubUser':
                $val = parseValue($type, $_val);
                if (is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
                $values[$key] = $val;
                break;

            case 'logoUrl':
                $val = parseValue($type, $_val);
                if (is_null($val))
                {
                    $emptyAlts[$key] = $field;
                    $wasEmptyAlt[$key] = true;
                    if (!isset($values[$key]) || empty($values[$key]))
                    {
                        if ($edit)
                        {
                            $values[$key] = $thisData[$key];
                            _debug('parseValue:extra1:key:' . $key . ":val:" . $val);
                        } else 
                        {
                            $values[$key] = null;
                            _debug('parseValue:extra2:key:' . $key . ":val:null");
                        }
                    }
                    
                } else 
                {
                    if (!isset($values[$key]) || empty($values[$key]))
                    {
                        $values[$key] = $val;
                         _debug('parseValue:extra3:key:' . $key . ":val:" . $val);
                    }
                }
                break;

            case 'logoImage':                
                $val = parseValue($type, $_val, $field);
                if (!$edit && is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);

                    /*
                        $emptyAlts[$key] = $field;
                        $wasEmptyAlt[$key] = true;
                    */
                }
                if ($edit && is_null($val))
                {
                    break;
                }
                
                $tkey = $key;

                if (isset($field["savekey"]))
                {
                    $tkey = $field["savekey"];
                }

                if (!isset($values[$tkey]) || empty($values[$tkey]))
                {
                    $values[$tkey] = $val;
                }
                
                _debug('parseValue:extra:key:' . $tkey . ":val:" . $val);

                /* 
                    else 
                    {
                        $values[$key] = $val;
                    } 
                */
                break;

            case 'singlebox':
                $checkedImageUpdate = isset($_POST[$key]);                
                break;
                                   
            case 'name':
                $val = parseValue($type, $_val);
                $values[$key] = $val;
                break;

            case 'longtext':
                $val = parseValue($type, $_val);
                $values[$key] = $val;
                break;
            
            case 'categories':
                $val = parseValue($type, $_val);
                if (is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
                $values[$key] = $val;
                break;
        }

    }

    // Project Logo / Empty Alternative Fields (One must be filled)
    // + Edit mode upgrade
    if (($edit && $checkedImageUpdate) || !$edit)
    {
        if (count($emptyAlts) > 0)
        {
            foreach ($emptyAlts as $key=>$_field)
            {
                $_key = $_field["emptyalt"];
                $wasEmpty = $wasEmptyAlt[$key];
                $wasEmpty2 = false;
                if (isset($wasEmptyAlt[$_key]))
                {
                    $wasEmpty2 = $wasEmptyAlt[$_key];
                }
                if ($wasEmpty && $wasEmpty2)
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
            }
        }
    }

    if (!$edit)
    {
        $projId = createProjectId();
        $values["creationDate"] = date("U");
        $values["creationUser"] = user::$username;
        $values["users"] = [user::$username];
    } else 
    {
        $values["editDate"] = date("U");
        $values["editUser"] = user::$username;
        $values["creationDate"] = $thisData["creationDate"];
        $values["creationUser"] = $thisData["creationUser"];
        $values["users"] = $thisData["users"];
        if (!in_array(user::$username, $values["users"]))
        {
            $values["users"][] = user::$username;
        }
    }
    $values["projectId"] = $projId;

    // Automatically approve mod added project
    if (user::$mod)
    {
        $values["approved"] = true;
        $values["approveDate"] = date("U");
        $values["approveUser"] = user::$username;
    }

    $DbFile = $projId . ".json";

    list($ret, $error) = db::writeDb(DB_PROJECTS, $DbFile, $values);
    if (!$ret)
    {
        //echo $error;
        // TODO: Debug??
        jsonError("ERR_DB_WRITE_ERROR", "Cannot write to DB");
    }

    // send email to moderators
    $projName = $values["name"];
    if (!user::$mod)
    {
        mailMods("Project waiting for approval: $projName", "New project <b>".$projName."</b> add request by github user: ".user::$username . " is waiting for your approval on Conflux Ecosystem site.<br />Please check the project legitimacy and add project if you think it's a legitimate project.");
    }

    jsonSuccess($values);
}

function modifyHelper()
{
    if (!isset($_POST["creationDate"]))
    {
        // Exits
        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>"creationDate"]);
    }

    $__val = $_POST["creationDate"];
    $val = null;
    $_val = null;

    $_val = trim((String) $__val);
    $len = strlen($_val);
    if ($len == 0)
    {
        // Exits
        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>"creationDate"]);
    }

    $cdate = parseValue("backendUnixdate", $_val);
    if (is_null($cdate))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    // check if same $dsid is used already?
    $list = getListRaw("helpers");

    $found = false;
    $thisData = null;
    if (is_array($list) && count($list) > 0)
    {
        foreach ($list as $arr)
        {   
            if ((String) $arr["creationDate"] == (String) $cdate)
            {
                $found = true;
                $thisData = $arr;
            }
        }
    }

    if (!$found)
    {
        // exits
        jsonError("ERR_NOT_FOUND", "Could not find helper.");
    }

    addHelper($cdate, $thisData);

}

function addHelper($cdate=null, $thisData=null)
{
    $edit = false;
    if (!is_null($cdate))
    {
        $edit = true;
    }

    $fields = [
        [
            "key" => "headline",
            "type" => "name",
            "desc" => "Headline",
            "empty" => false
        ],
        [
            "key" => "desc" ,
            "type" => "longtext",
            "desc" => "Description",
            "empty" => false
        ],
        [
            "key" => "link",
            "type" => "url",
            "desc" => "Link",
            "empty" => true
        ],
        [
            "key" => "onclick",
            "type" => "name",
            "desc" => "OnClick",
            "empty" => true
        ]    
    ];

    $values = [];

    foreach ($fields as $field)
    {
        $key = $field["key"];
        $type = $field["type"];
        $empty = $field["empty"];

        $__val = $_POST[$key];
        $val = null;
        $_val = null;

        switch ($type)
        {
            case 'url':
            case 'logoUrl':
            case 'name':
            case 'longtext':
            case 'githubUser':
            case 'categories':
                $_val = trim((String) $__val);
                $len = strlen($_val);
                if ($len == 0)
                {
                    if (!$empty)
                    {
                        // Exits
                        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>$key]);
                    }
                    $values[$key] = $val;
                    continue 2;   
                }

                break;

        }

        switch ($type)
        {
            case 'url':
            case 'logoUrl':
            case 'githubUser':
                $val = parseValue($type, $_val);
                if (is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
                $values[$key] = $val;
                break;
                                   
            case 'name':
                $val = parseValue($type, $_val);
                $values[$key] = $val;
                break;

            case 'longtext':
                $val = parseValue($type, $_val);
                $values[$key] = $val;
                break;
            
            case 'categories':
                $val = parseValue($type, $_val);
                if (is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
                $values[$key] = $val;
                break;
        }

    }

    if (empty($values["link"]) && empty($values["onclick"]))
    {
        // Exits
        jsonError("ERR_MISSING", "Missing field (link or onclick)", ["error_field"=>"link"]);
    }

    if (!$edit)
    {
        $cdate = date("U");
        $values["creationDate"] = $cdate;
        $values["creationUser"] = user::$username;
        $values["_id"] = $_fid = $cdate . "." . getRandomString(4);
    } else 
    {
        $values["editDate"] = date("U");
        $values["editUser"] = user::$username;
        $values["creationDate"] = $thisData["creationDate"];
        $values["creationUser"] = $thisData["creationUser"];
        $_fid = $values["_id"] = $thisData["_id"];
    }
    
    $DbFile = $_fid .".json";

    list($ret, $error) = db::writeDb(DB_HELPERS, $DbFile, $values);
    if (!$ret)
    {
        //echo $error;
        // TODO: Debug??
        jsonError("ERR_DB_WRITE_ERROR", "Cannot write to DB");
    }

    jsonSuccess($values);
}



function parseValue($type, $value, $extra=[])
{
    $_val = null;
    _debug('parseValue:type:' . $type . "|value:" . $value);

    switch ($type)
    {
        case 'string':
        case 'name':            
        case 'longtext':       
        case 'metric':     
            $_val = trim((String) $value);
            break;

        case 'dsid':
            $_tval = trim((String) $value);
            $_val = parseDatasourceId($_tval);
            if ($_val != $_tval)
            {
                return null;
            }
            break;

        case 'httpauth':
            $_tval = trim((String) $value);
            $_val = parseHttpAuth($_tval);
            if ($_val != $_tval)
            {
                return null;
            }
            break;

        case 'enum':
            $field = $extra;
            $extra = [];
            $_tval = trim((String) $value);
            $_val = $field["defaultOption"];
            $_ltval = strtolower($_tval);

            foreach ($field["options"] as $opt)
            {
                $_lopt = strtolower($opt);
                if ($_ltval == strtolower($_lopt))
                {
                    $_val = $opt;
                }
            }
            break;

        case 'json':
            $_val = trim((String) $value);
            $json = json_decode($_val, true);
            if (json_last_error() !== JSON_ERROR_NONE)
            {
                return null;             
            }
            break;
        
        case 'txt2arr':
            $_tval = trim((String) $value);
            //$__val = preg_replace("/[^A-Za-z0-9_\.\n]/", "", $_tval);
            $_arr = explode("\n", $_tval);
            $_val = [];
            foreach ($_arr as $_tmp)
            {
                $_val[] = trim($_tmp);
                // TODO: check if name is valid
            }
            
            break;
        
        case 'logoImage':

            $field = $extra;
            $key = $field["key"];
            
            $tempFileName = gmdate("U") . getRandomString(8);

            if (!isset($_FILES[$key]["tmp_name"]))
            {
                return null;
            }

            $tempFile = $_FILES[$key]["tmp_name"];

            list($ret, $info) = isValidImage($tempFile);

            if (!$ret)
            {
                _debug('parseValue:ERROR:logoImage:invalid-image');
                _debug(json_encode($info, JSON_PRETTY_PRINT));
                // TODO: Error?
                return null;
            }

            $pubDir = PUBLIC_FILES_DIR;
            $tempFileName2 = $tempFileName . ".webp";
            $tempFile2 = $pubDir . $tempFileName2;

            $format = $info[2];
            $success = saveConvertImage($tempFile, $format, $tempFile2);
            if ($success === false)
            {
                _debug('parseValue:ERROR:logoImage:could-not-save');

                // TODO: Error?
                return null;
            }
            $_val = $tempFileName2;

            /*
                $target_dir = "uploads/";
                $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
                // Check if image file is a actual image or fake image
                if(isset($_POST["submit"])) 
                {
                    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
                    if($check !== false) 
                    {
                        echo "File is an image - " . $check["mime"] . ".";
                        $uploadOk = 1;
                    } else 
                    {
                        echo "File is not an image.";
                        $uploadOk = 0;
                    }
                }
            */


            break;

        case 'logoUrl':

            if (empty(trim((String) $value)))
            {
                return null;
            }

            if (filter_var((String) $value, FILTER_VALIDATE_URL) === false)
            {
                _debug('parseValue:ERROR:logoUrl:invalid_url:' . $value);
                // TODO: Error?
                return null;    
            }

            $__val = (String) $value;

            $tempDir = db::_getDbDir(DB_TEMP);
            $tempFileName = gmdate("U") . getRandomString(8);
            $tempFile = $tempDir . $tempFileName;
            $rawData = trim((String) fetchImageFromUrl($__val));
            if (strlen($rawData)==0)
            {
                _debug('parseValue:ERROR:logoUrl:no-logo-in-url');
                // TODO: Error?
                return null;
            }
            if (!file_put_contents($tempFile, $rawData))
            {
                _debug('parseValue:ERROR:logoUrl:cant-write-temp-image-file');
            }
            list($ret, $info) = isValidImage($tempFile);
            if (!$ret)
            {
                _debug('parseValue:ERROR:logoUrl:invalid-image');
                _debug(json_encode($info, JSON_PRETTY_PRINT));
                // TODO: Error?
                return null;
            }

            $pubDir = PUBLIC_FILES_DIR;
            $tempFileName2 = $tempFileName . ".webp";
            $tempFile2 = $pubDir . $tempFileName2;

            $format = $info[2];
            $success = saveConvertImage($tempFile, $format, $tempFile2);
            if ($success === false)
            {
                _debug('parseValue:ERROR:logoUrl:could-not-save');

                // TODO: Error?
                return null;
            }
            $_val = $tempFileName2;

            break;
    
        case 'url':
            if (filter_var((String) $value, FILTER_VALIDATE_URL) !== false)
            {
                $_val = (String) $value;
            }
            break;

        case 'githubUser':
            if (isValidGithubUsername($value))
            {
                $_val = parseGithubUsername($value);
            }
            break;

        case 'categories':
            $cats = [];
            $arr = explode(",", $value);
            foreach ($arr as $val)
            {
                $ret = parseCategoryName($val);
                if (!is_null($ret))
                {
                    $cats[] = $ret;
                }
            }
            if (count($cats) == 0)
            {
                // TODO: error?
                return null;
            }

            $_val = $cats;

            break;

        case 'backendUnixdate':
            $_val = trim((String) $value);
            $__val = (int) $_val;
            if ($_val !== (String) $__val)
            {
                return null;
            }
            $starttime = mktime(2,0,0,1,1,2025);
            $endtime = mktime(2,0,0,1,1,2050);
            if (!($__val > $starttime && $__val < $endtime))
            {
                return null;
            }
            return $__val;
            
      break;            
                
    }

    return $_val;
}

function filterDatasources($data)
{
    $newdata = [];
    if (!is_array($data) || count($data) == 0)
    {   
        return $newdata;
    }
    
    foreach ($data as $arr)
    {
        $newdata[] = ["name"=>$arr["name"], "dsid"=>$arr["dsid"]];
    }
    return $newdata;
}

function filterProjects($data)
{
    $newdata = [];
    if (!is_array($data) || count($data) == 0)
    {   
        return $newdata;
    }
    
    //_debug('filterProjects:mod:'.json_encode(user::$mod));
    
    foreach ($data as $arr)
    {
        if (user::$mod)
        {
            $newdata[] = $arr;   
        } else if (isset($arr["approved"]) && $arr["approved"])
        {
            $newdata[] = $arr;
        }
    }
    return $newdata;
}

function mailMods($_subject, $_message)
{
    $subject = "[CFX-ECO] " . $_subject;
    $message = $_message . "<br><hr>This email was automatically sent by Conflux Ecosystem Site. If you feel it was sent in wrong address, please contact the admin.";

    // get current mods with email addresses
    $modsData = getListRaw("mods");
    foreach ($modsData as $modArr)
    {
        $username = $modArr["username"];
        $email =  $modArr["email"];
        $sentOk = sendEmail($email, $subject, $message);
        if (!$sentOk)
        {
            _debug("mailMods:ERROR:Could not send email to mod:$username");
        } 
    }
}

function getProjects()
{
    user::checkLogin();

    $data = getListRaw("projects");

    //_debug('getProjects:data:'.json_encode($data));
    if (is_null($data))
    {
        jsonError("ERR_INTERNAL", "Internal error");
    }

    $data2 = filterProjects($data);

    jsonSuccess($data2);

}

function getMetrics()
{

    $data = getListRaw("metrics");

    if (is_null($data))
    {
        jsonError("ERR_INTERNAL", "Internal error (gm1)");
    }

    $data1 = getListRaw("datasources");
    $data1 = filterDatasources($data1);

    if (is_null($data1))
    {
        jsonError("ERR_INTERNAL", "Internal error (gm2)");
    }

    $data2 = getListRaw("datas");

    if (is_null($data2))
    {
        jsonError("ERR_INTERNAL", "Internal error (gm3)");
    }

    // TODO: Parse datas (error entries separation!)
    
    // Make final array containing all data for the frontend
    // exits
    jsonSuccess([
        "metrics"=>$data, 
        "datasources"=>$data1, 
        "datas"=>$data2
    ]);

}

function modifyMetric()
{
    if (!isset($_POST["creationDate"]))
    {
        // Exits
        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>"creationDate"]);
    }

    $__val = $_POST["creationDate"];
    $val = null;
    $_val = null;

    $_val = trim((String) $__val);
    $len = strlen($_val);
    if ($len == 0)
    {
        // Exits
        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>"creationDate"]);
    }

    $cdate = parseValue("backendUnixdate", $_val);
    if (is_null($cdate))
    {
        // Exits
        jsonError("ERR_INVALID_DATA", "Invalid data(2)");
    }

    // check if same $dsid is used already?
    $list = getListRaw("metrics");

    $found = false;
    $thisData = null;
    if (is_array($list) && count($list) > 0)
    {
        foreach ($list as $arr)
        {   
            if ((String) $arr["creationDate"] == (String) $cdate)
            {
                $found = true;
                $thisData = $arr;
            }
        }
    }

    if (!$found)
    {
        // exits
        jsonError("ERR_NOT_FOUND", "Could not find metric.");
    }

    addMetric($cdate, $thisData);


}

function addMetric($cdate=null, $thisData=null)
{
       
    $edit = false;
    if (!is_null($cdate))
    {
        $edit = true;
    }

    $fields = [
        [
            "key" => "heading",
            "type" => "name",
            "desc" => "Heading",
            "empty" => false
        ],
        [
            "key" => "metric",
            "type" => "metric",
            "desc" => "Metric",
            "empty" => false
        ],
     ];

    $values = [];

    foreach ($fields as $field)
    {
        $key = $field["key"];
        $type = $field["type"];
        $empty = $field["empty"];

        $__val = $_POST[$key];
        $val = null;
        $_val = null;

        switch ($type)
        {
            case 'url':
            case 'name':
            case 'longtext':
            case 'json':
            case 'dsid':
            case 'httpauth':
            case 'txt2arr':               
            case 'metric':
                $_val = trim((String) $__val);
                $len = strlen($_val);
                if ($len == 0)
                {
                    if (!$empty)
                    {
                        // Exits
                        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>$key]);
                    }
                    $values[$key] = $val;
                    continue 2;   
                }

                break;

        }

        switch ($type)
        {
            case 'enum':
                $val = parseValue($type, $__val, $field);
                if (is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
                $values[$key] = $val;
                
                break;

            case 'url':
            case 'dsid':
            case 'json':                
            case 'httpauth':   
                $val = parseValue($type, $_val);
                if (is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
                $values[$key] = $val;
        
                break;                                    

            case 'name':    
            case 'longtext':                
            case 'txt2arr':
            case 'metric':            
                $val = parseValue($type, $_val);
                $values[$key] = $val;
                break;
            
        }


    }

    if (!$edit)
    {
        $cdate = date("U");
        $values["creationDate"] = $cdate;
        $values["creationUser"] = user::$username;
        $values["_id"] = $_fid = $cdate . "." . getRandomString(4);
    } else 
    {
        $values["editDate"] = date("U");
        $values["editUser"] = user::$username;
        $values["creationDate"] = $thisData["creationDate"];
        $values["creationUser"] = $thisData["creationUser"];
        $_fid = $values["_id"] = $thisData["_id"];
    }
        
    $DbFile = $_fid .".json";

    list($ret, $error) = db::writeDb(DB_METRICS, $DbFile, $values);
    if (!$ret)
    {
        //echo $error;
        // TODO: Debug??
        jsonError("ERR_DB_WRITE_ERROR", "Cannot write to DB");
    }

    jsonSuccess($values);

}

function modifyDatasource()
{
    if (!isset($_POST["_dsid"]))
    {
        // Exits
        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>"_dsid"]);
    }

    $__val = $_POST["_dsid"];
    $val = null;
    $_val = null;

    $_val = trim((String) $__val);
    $len = strlen($_val);
    if ($len == 0)
    {
        // Exits
        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>"_dsid"]);
    }
    $_dsid = $_val;

    // check if same $dsid is used already?
    $list = getListRaw("datasources");

    $found = false;
    $thisData = null;
    if (is_array($list) && count($list) > 0)
    {
        foreach ($list as $ds)
        {   
            if (strtolower($ds["dsid"]) == strtolower($_dsid))
            {
                $found = true;
                $thisData = $ds;
            }
        }
    }

    if (!$found)
    {
        // exits
        jsonError("ERR_NOT_FOUND", "Could not find datasource.");
    }

    addDatasource($_dsid, $thisData);

}

function addDatasource($editDsid = null, $dsData = null)
{
    /*
        { 
            req: "addDatasource", 
            name: "Test Datasource", 
            dsid: "data01", 
            url: "https://google.com", 
            type: "POST", 
            returnAs: "JSON", 
            httpAuth: "", 
            headers: "x-testing: true\nstill-testing: 1", 
            mustHave: "success", 
            mustNotHave: "error\nerr" 
        } 
    */

    $edit = false;
    if (!is_null($editDsid))
    {
        $edit = true;
    }
    $dsid = null;
    
    $fields = [
        [
            "key" => "name",
            "type" => "name",
            "desc" => "Data Source Name",
            "empty" => false
        ],
        [
            "key" => "dsid",
            "type" => "dsid",
            "desc" => "ID",
            "empty" => false
        ],
        [
            "key" => "url",
            "type" => "url",
            "desc" => "API URL",
            "empty" => false
        ],
        [
            "key" => "type",
            "type" => "enum",
            "desc" => "Request Type",
            "options" => [
                "GET",
                "POST",
                "JSON"
            ],
            "defaultOption" => "JSON",
            "empty" => false
        ],
        [
            "key" => "cron",
            "type" => "enum",
            "desc" => "API data fetch times",
            "options" => [
                "once a day",
                "once every 2 days",
                "once every 3 days",
                "once a week",
            ],
            "defaultOption" => "once a day",
            "empty" => false
        ],        
        [
            "key" => "returnAs",
            "type" => "enum",
            "desc" => 'API data return type',
            "options" => [
                "JSON",
                "float",
                "string"
            ],
            "defaultOption" => "JSON",
            "empty" => false
        ],
        [
            "key" => "httpAuth",
            "type" => "httpauth",
            "desc" => 'HTTP Auth',
            "empty" => true
        ],
        [
            "key" => "headers",
            "type" => "txt2arr",
            "desc" => 'Request headers',
            "empty" => true
        ],
        [
            "key" => "mustHave",
            "type" => "txt2arr",
            "desc" => 'Reply must have keys',
            "empty" => true
        ],
        [
            "key" => "mustNotHave",
            "type" => "txt2arr",
            "desc" => 'Reply must not have keys',
            "empty" => true
        ],
        [
            "key" => "json",
            "type" => "json",
            "desc" => 'PostData JSON',
            "empty" => true
        ],
    ];

    $values = [];

    foreach ($fields as $field)
    {
        $key = $field["key"];
        $type = $field["type"];
        $empty = $field["empty"];

        $__val = $_POST[$key];
        $val = null;
        $_val = null;

        switch ($type)
        {
            case 'url':
            case 'name':
            case 'longtext':
            case 'json':
            case 'dsid':
            case 'httpauth':
            case 'txt2arr':               
                $_val = trim((String) $__val);
                $len = strlen($_val);
                if ($len == 0)
                {
                    if (!$empty)
                    {
                        // Exits
                        jsonError("ERR_EMPTY", "Empty field", ["error_field"=>$key]);
                    }
                    $values[$key] = $val;
                    continue 2;   
                }

                break;

        }

        switch ($type)
        {
            case 'enum':
                $val = parseValue($type, $__val, $field);
                if (is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
                $values[$key] = $val;
                
                break;

            case 'url':
            case 'dsid':
            case 'json':                
            case 'httpauth':   
                $val = parseValue($type, $_val);
                if (is_null($val))
                {
                    // Exits
                    jsonError("ERR_INVALID_FIELD", "Invalid field", ["error_field"=>$key]);
                }
                $values[$key] = $val;
                if ($type == "dsid")
                {
                    $dsid = $val;                    
                }
        
                break;                                    

            case 'name':    
            case 'longtext':                
            case 'txt2arr':                
                $val = parseValue($type, $_val);
                $values[$key] = $val;
                break;
            
        }


    }

    if (!$edit || strtolower($dsid) != strtolower($editDsid))
    {   
        // check if same $dsid is used already?

        $list = getListRaw("datasources");
    
        $found = false;
        if (is_array($list) && count($list) > 0)
        {
            foreach ($list as $ds)
            {   
                if (strtolower($ds["dsid"]) == strtolower($dsid))
                {
                    if (!$edit)
                    {
                        $found = true;
                    } else 
                    {
                        if (strtolower($ds["dsid"]) != strtolower($editDsid))
                        {
                            $found = true;
                        }
                    }
                    
                }
            }
        }

        if ($found)
        {
            // exits
            jsonError("ERR_DS_FOUND", "Could not save. Datasource ID already in use.");
        }

    }
    if (!$edit)
    {
        $did = createDatasourceId();
    } else 
    {
        $did = $dsData["did"];
    }
    
    $values["did"] = $did;
    $values["dsid"] = $dsid;
    if (!$edit)
    {
        $values["creationDate"] = date("U");
        $values["creationUser"] = user::$username;
    } else 
    {
        $values["creationDate"] = $dsData["creationDate"];
        $values["creationUser"] = $dsData["creationUser"];
        $values["editDate"] = date("U");
        $values["editUser"] = user::$username;
    }

    $DbFile = $did . ".json";

    list($ret, $error) = db::writeDb(DB_DATASOURCES, $DbFile, $values);
    if (!$ret)
    {
        //echo $error;
        // TODO: Debug??
        jsonError("ERR_DB_WRITE_ERROR", "Cannot write to DB");
    }

    // Check datasource, if not ok, invalidate / remove(?)
    $fret = checkDataSourceFile($DbFile);
    if (!$fret)
    {
        jsonError("ERR_DATASOURCE_INVALID", "Could not save. Datasource didnt work as expected.");
    }

    jsonSuccess($values);

}

function checkDataSourceFile($dbfile)
{
    // TODO: Sprout a fetcher instance here and get test (and real) data

    return true;
}


function parseCategoryName($value)
{
    $_val = trim((String) $value);
    if (strlen($_val) == 0)
    {
        return null;
    }
    $__val = preg_replace("/[^A-Za-z0-9\ -]/", '', $_val);
    
    if ($__val !== $_val)
    {
        return null;
    }   
    $len = strlen($__val);
    if ($len < 3 || $len > 24)
    {
        return null;
    }
    return $__val;
}

function getDatasourcesWithData()
{
    $data1 = getListRaw("datasources");

    if (is_null($data1))
    {
        jsonError("ERR_INTERNAL", "Internal error (dswd1)");
    }

    $data2 = getListRaw("datas");

    if (is_null($data2))
    {
        jsonError("ERR_INTERNAL", "Internal error (dswd2)");
    }

    // TODO: Parse datas (error entries separation)
    

    // Make final array containing both datas for the frontend
    // exits
    jsonSuccess(["datasources"=>$data1, "datas"=>$data2]);
}

function getList($list)
{
    switch ($list)
    {
        case 'mods':
        case 'projects':
        case 'datasources':
        case 'helpers':
        case 'metrics':
            // Get list of mods from db
            $data = getListRaw($list);

            if (is_null($data))
            {
                jsonError("ERR_INTERNAL", "Internal error");
            }

            // exits
            jsonSuccess($data);
    
            break;                
    
    }

    jsonError("ERR_LIST", "Invalid list");
}

function getListRaw($list)
{
    switch ($list)
    {
        case 'mods':
            // Get list of mods from db
            $data = db::readDbDir(DB_MODS);

            return $data;
    
            break;

        case 'projects':
            // Get list of projects from db
            $data = db::readDbDir(DB_PROJECTS);

            return $data;
    
            break;     
        
        case 'datasources':
            // Get list of datasources from db
            $data = db::readDbDir(DB_DATASOURCES);

            return $data;
    
            break;     

       case 'datas':
            // Get list of datasources from db
            $data = db::readDbDir(DB_DATAS);

            return $data;
    
            break;

        case 'metrics':
            // Get list of metrics from db
            $data = db::readDbDir(DB_METRICS);

            return $data;

            break;

        case 'helpers':
            // Get list of helpers from db
            $data = db::readDbDir(DB_HELPERS);

            return $data;

            break;
  
    }

    return null;

}

function isValidImage($inputFile)
{
    $info = getImageInfo($inputFile);
    _debug("isValidImage:getImageInfo:info:" . json_encode($info, JSON_PRETTY_PRINT));
    if (is_null($info))
    {
        return [false, null];
    }

    // Check image dimensions
    if ($info["width"] != $info["height"])
    {
        return [false, $info];
    }

    return [true, $info];
}

function getImageInfo($inputFile)
{
    try
    {
        $image = new Imagick();
        
        $image->readImage($inputFile);
        

        $d = $image->getImageGeometry();
        /* {
            "width": 521,
            "height": 521
           } 
        */


        $width = $d["width"];
        $height = $d["height"];


        $format = strtolower((String) $image->getImageFormat());

        /* 
            "JPEG" --> "jpeg"
        */
        
        return [$width, $height, $format];

    } catch (ImagickException $e)
    {
      // error could not handle image
      _debug("getImageInfo:error:exception:" . json_encode($e, JSON_PRETTY_PRINT));
      return null;
    }
    return null;
}

function saveConvertImage($inputFile, $imageType, $outputFile)
{
    try
    {
        $image = new Imagick();

        $image->setBackgroundColor(new ImagickPixel('transparent'));

        if ($imageType == "svg")
        {
            $image->setResolution(1000,1000);
        }

        $image->readImage($inputFile);

        //$image->resampleImage(500, 500, Imagick::FILTER_LANCZOS, 1);
        $image->scaleImage(500, 500, true);

        $image->setImageFormat('webp');

        $image->writeImage($outputFile);

        return true;
    } catch (ImagickException $e)
    {
      // error could not handle image
      return false;
    }
}

function checkLogin()
{

    $data = user::checkLogin();
    // exits
    jsonSuccess($data);
}


// exits
function jsonError($errorCode, $error, $array=[])
{
    $arr = [
        "err"=>$errorCode,
        "error"=>$error,
        "data"=>$array
    ];

    jsonResponse($arr);
}

// exits
function jsonSuccess($array)
{
    $arr = [
        "success"=>true,
        "data"=>$array
    ];
   
    jsonResponse($arr);
}

// exits
function jsonResponse($array)
{
    // send headers
    header('Content-Type: application/json; charset=utf-8');
    // send json

    if ( DEBUG_ENABLED !== null && DEBUG_ENABLED && DEBUG_JSON !== null && DEBUG_JSON)
    {
        global $debugJson;
        
        $array["_debug"] = $debugJson;
    }

    echo json_encode($array);

    die();
}

