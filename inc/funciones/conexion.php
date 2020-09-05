<?php

$conn = new mysqli('localhost', 'root', '', 'uptask');

if($conn->connect_error){
	echo $conn->connect_error;
}

$conn->set_charset('utf8');
// echo $conn->ping();
// var_dump($conn);