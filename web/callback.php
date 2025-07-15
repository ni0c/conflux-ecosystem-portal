<?php

define("UI_VER", "0.1.0");
define("WEB_DIR", "/var/data/eco/web/");
define("PROJ_NAME", "Conflux Ecosystem");

define("DEBUG_ENABLED", false);

include(WEB_DIR . "funcs.php");

doInit();

handleGitHubCallback();

//

function handleGitHubCallback()
{
   

    if(isset($_GET['error']) || !isset($_GET['code'])) 
    {
        // exits
        loginError("Some error occurred with github login.");
    }
    

   
    
    $authCode = $_GET['code'];

    $cid = dotenv::get('GITHUB_OAUTH_CID');
    $secret = dotenv::get('GITHUB_OAUTH_CSECRET');

    $relUrl = dotenv::get('RELATIVE_URL');

    if (empty($cid) || empty($secret))
    {
        // exits
        loginError("Setup error: Github credentials missing from site config. Contact admin.");
    }

    if (empty($relUrl))
    {
        // exits
        loginError("Setup error: Relative url missing from site config. Contact admin.");
    }

    if (empty($authCode))
    {
        // exits
        loginError("Please redo your github login.");
    }


    $data = [
        'client_id' => $cid,
        'client_secret' => $secret,
        'code' => $authCode,
    ];
    
    $apiUrl = "https://github.com/login/oauth/access_token";

    _debug("fetch: ". $apiUrl . " : " . json_encode($data, JSON_PRETTY_PRINT));

    $headersArray = [
        'Accept: application/json',
        'User-Agent: ' . APP_NAME,
    ];


    $replyJson = fetchURL($apiUrl, $data, 'POST', $headersArray);

    _debug(json_encode($replyJson, JSON_PRETTY_PRINT));

    if (!is_array($replyJson))
    {
        // exits
        loginError("Github login error.(1)");
    }

    // Got error from github
    if (isset($replyJson["error"])) 
    {
        // exits
        loginError($replyJson["error"]);
    }

    
    if(!(isset($replyJson["access_token"]) || empty($replyJson["access_token"])))
    {
        // exits
        loginError("Github login error.(2)");
    }

    // Github token only works for a short time

    _debug("Github Login OK!");
    _debug("Getting user:");

    $userData = getUserFromGithubResponse($replyJson["access_token"]);

    if (is_null($userData))
    {
        // exits
        loginError("Github login error.(3)");
    }


    // save user data, create cookie and set user cookie here

    list($userId, $username) = saveUser($userData);
    if (is_null($userId))
    {
        // exits
        loginError("Github login error. Internal error.(4)");
    }

    $success = createLoginCookie($userId, $username);
    if (!$success)
    {
        // exits
        loginError("Github login error. Internal error.(5)");
    }
    
    // Redirect to main page
    createSuccessCookie("GitHub login successful!");

    header('Location: ' . $relUrl);

}

// Exits
function loginError($error)
{
    createErrorCookie($error);

    $relUrl = dotenv::get('RELATIVE_URL');

    // Redirect to main page
    header('Location: ' . $relUrl);
    
    die();
}

function saveUser($data)
{
    if (!isset($data["id"]) || !isset($data["login"]))
    {
        return [null, null];
    }

    $userId = (int) $data["id"];

    if ($userId <= 0)
    {
        return [null, null];
    }

    // save user data (update if necessary)

    _debug("saveUser: data: ".json_encode($data, JSON_PRETTY_PRINT));

    $username = parseGithubUsername($data["login"]);

    if (is_null($username))
    {
        return [null, null];
    }

    $filename = $username . ".json";

    $userData = [
        "id"=>$userId,
        "user"=>$username,
        "data"=>$data,
        "modified"=>date("U"),
    ];

    list($ret, $error) = db::writeDb(DB_USERS, $filename, $userData);
    
    if (!$ret)
    {
        echo $error;
        return [null, null];
    }

    return [$userId, $username];

}

function createLoginCookie($_userId, $username)
{
    
    _debug("createLoginCookie: userId: $_userId");
    
    $userId = (int) $_userId;
    $unixTime = date("U");
    $cookieId = $userId . "_" . $unixTime;
    $cookieDbFilename = $cookieId . ".json";
    $valid = $unixTime + 18*3600; // Login cookie valid for 18h

    // save login cookie data to db
    $cookieData = [
        "user" => $userId,
        "username" => $username,
        "cookie" => $cookieId,
        "valid" => $valid,
        "login_time" => $unixTime,
    ];

    list($ret, $error) = db::writeDb(DB_COOKIES, $cookieDbFilename, $cookieData);
    if (!$ret)
    {
        echo $error;
        return false;
    }

    $domain = dotenv::get('WEBSITE_DOMAIN_NAME');
    $relUrl = dotenv::get('RELATIVE_URL');

    $cookieOptions = [
        "expires" => $valid,
        "path" => $relUrl,
    //  "domain" => $domain,
        "secure" => true,
        "httponly" => true,
        "samesite" => "Strict",
    ];

    setcookie(COOKIE_NAME, $cookieId, $cookieOptions);
    //setcookie('userSessionCookie', $cookieId, $valid, $relUrl, $domain, $secure, $httpOnly);

    $loginHistoryFilename = date("Y-m-d.H-i.s", $unixTime) . "_" . $userId . ".json";

    $loginData = [
        "user" => $userId,
        "username" => $username,
        "valid" => $valid,
        "login_time" => $unixTime,
    ];

    db::writeDb(DB_LOGIN_HISTORY, $loginHistoryFilename, $loginData);

    return true;
}

function createErrorCookie($error)
{
    _debug("createErrorCookie: error: $error");
    
    $relUrl = dotenv::get('RELATIVE_URL');
    $unixTime = date("U");
    $valid = $unixTime + 0.5*3600; // Error login cookie containing error message valid for 0.5h

    $txt = json_encode(["error"=>$error]);

    $cookieOptions = [
        "expires" => $valid,
    //    "path" => $relUrl,
    //  "domain" => $domain,
    //    "secure" => true,
    //    "httponly" => false,
    ];

    setcookie(ERROR_LOGIN_COOKIE, $txt, $cookieOptions);


}


function createSuccessCookie($msg)
{
    _debug("createSuccessCookie: msg: $msg");
    
    $relUrl = dotenv::get('RELATIVE_URL');
    $unixTime = date("U");
    $valid = $unixTime + 0.5*3600; // Error login cookie containing error message valid for 0.5h

    $txt = json_encode(["success"=>$msg]);

    $cookieOptions = [
        "expires" => $valid,
    //    "path" => $relUrl,
    //  "domain" => $domain,
    //    "secure" => true,
    //    "httponly" => false,
    ];

    setcookie(ERROR_LOGIN_COOKIE, $txt, $cookieOptions);


}


function getUserFromGithubResponse($_token=null)
{

    if (is_null($_token) && empty($_COOKIE['cr_github_access_token']))
    {
        return null;
    }

    $token = '';

    if (!is_null($_token))
    {
        $token = $_token;
    } else 
    {
        $token = $_COOKIE['cr_github_access_token'];
    }

   // Github token only works for a short time

    if (strlen(trim($token)) == 0)
    {
        return null;
    }

    $apiUrl = "https://api.github.com/user";

    $headersArray = [
        'Authorization: Bearer ' . $token,
        'Accept: application/json',
        'User-Agent: ' . APP_NAME,
    ];

    $replyJson = fetchURL($apiUrl, null, 'GET', $headersArray);

    _debug("getUserFromGithubResponse returned:\n" . json_encode($replyJson, JSON_PRETTY_PRINT));

    if (!isset($replyJson["login"]))
    {
        return null;
    }

    return $replyJson;
}



