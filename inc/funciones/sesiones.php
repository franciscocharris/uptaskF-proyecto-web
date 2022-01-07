<?php 
//primero revisar_usuario va a verificar que se alla iniciado seccion, y usuario_autenticado va a ver que detectó 
//revisar_usuario: si le dijo queno esta autenticado ps lo va a redireccionar al login 
function usuario_autenticado(){
	if(!revisar_usuario()){
		header('Location:login.php');
		exit();
	}
}

function revisar_usuario(){
	return isset($_SESSION['nombre']);
}

session_start();
usuario_autenticado();