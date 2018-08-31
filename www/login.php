<?php
header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
if (isset($_POST['ssid'])) {
	session_id($_POST['ssid']);
}
session_start();
if(isset($_SESSION['login'])) {
	echo session_id();
	die();
}
if ($_POST['login'] == 'Alex') {
	$_SESSION['login'] = $_POST['login'];
//	echo json_encode(array('login' => $_SESSION['login']);
//echo '{"login":"'.$_SESSION['login'].'"}'
echo session_id();
} else {
echo '0';
//	echo '{"login":""}';
}



