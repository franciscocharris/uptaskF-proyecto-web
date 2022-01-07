<?php

$conn = new mysqli('mysql-franciscocharrisweb.alwaysdata.net', '254147', '1francisco2345', 'franciscocharrisweb_uptask');
// $conn = new mysqli('localhost', 'root', '', 'uptask');
if($conn->connect_error){
	echo $conn->connect_error;
}

$conn->set_charset('utf8');
// echo $conn->ping();
// var_dump($conn);