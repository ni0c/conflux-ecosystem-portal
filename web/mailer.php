<?php

include_once('funcs.php');
doInit();

include ('[PATH-TO-PHPMAILER-HERE]');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// TODO: make composer version of this

class mailer
{

	public static $logmail = [];

	public static function logMail($msg, $debug=null)
	{
		self::$logmail[] = $msg;
	}

	public static function getLog()
	{
		return implode("\n", self::$logmail);
	}
	
	public static function sendMail($to, $subject, $message)
	{

        $email = dotenv::get("MAIL_SENDER_EMAIL");
        $name = dotenv::get("MAIL_SENDER_NAME");
        $gmailUser = dotenv::get("GMAIL_USER");
        $gmailAuth = dotenv::get("GMAIL_AUTH");

        if (empty($email) || empty($name) || empty($gmailUser) || empty($gmailAuth))
        {
            self::logMail("Missing credentials in ENV file. Message could not be sent.");
			return false;
        }
        // Setup for GMAIL only

		$mail = new PHPMailer();
		$mail->isSMTP();
		$mail->SMTPDebug = 0;
		$mail->Debugoutput = "logMail";
		$mail->Host = 'smtp.gmail.com';
		$mail->Timeout = 5;
		$mail->SMTPSecure= 'tls';
		$mail->Port = 587;
		$mail->SMTPAuth = true;
		$mail->Username = $gmailUser;
		$mail->Password = $gmailAuth;
		$mail->setFrom($email, $name);
		$mail->addAddress($to);
		$mail->isHTML(true);
		$mail->CharSet = 'UTF-8';
		$mail->Encoding = 'base64';
		$mail->Subject = $subject;
		$mail->Body = $message;

		if ($mail->send())
		{
			return true;
		} else 
		{
			self::logMail("Message could not be sent. Mailer Error: " . $mail->ErrorInfo);
			return false;
		}
	}

}


