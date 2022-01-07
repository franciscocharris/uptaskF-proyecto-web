<?php 

// die(json_encode($_POST));
$accion = $_POST['accion'];
$password = $_POST['password'];
$usuario = $_POST['usuario'];

if($accion === 'crear'){
	//codigo para crear los administradores

	//hashear el password
	$opciones = array(
		'cost' => 12
	);

	$hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

	//importar la conexion
	include '../funciones/conexion.php';

	try {
		//realizar la consulta a la base de datos
		$stmt = $conn->prepare(" INSERT INTO usuarios ( usuario, password) VALUES ( ?, ?)");
		$stmt->bind_param("ss", $usuario, $hash_password);
		$stmt->execute();
		//en caso de que halla error mira como se va a poner el arreglo respuesta
		// $respuesta = array(
		// 	'pass' => $stmt->error_list,
		// 	'error' => $stmt->error
		// );
		//ese mayor que cero es para que pueda pasar al else ya que ambos es por si hay un error
		if($stmt->affected_rows > 0){
			$respuesta = array(
				'respuesta' => 'correcto',
				'id_insertado' => $stmt->insert_id,
				'tipo' => $accion
			);
		}else{
			$respuesta = array(
				'respuesta' => 'error'
			);
		}
		$stmt->close();
		$conn->close();
	} catch (Exception $e) {
		//en caso de error, tomar la exepcion
		$respuesta = array(
			'respuesta' => $e->getMessage()
		);
	}

	echo json_encode($respuesta);
}

if($accion === 'login'){
	//escribir codigo que loguee a los administradores
	include '../funciones/conexion.php';
	try {
		//selccionar el administrador de la base de datos
		$stmt = $conn->prepare(" SELECT usuario, id, password FROM usuarios WHERE usuario = ? ");
		$stmt->bind_param("s", $usuario);
		$stmt->execute();
		//loguear el usuario
		//bind_result obtine los resultados y los asigna a variables(tiene que declarar)
		$stmt->bind_result($nombre_usuario, $id_usuario, $pass_usuario);
		$stmt->fetch();
		//if existe esa variable, osea que si hay coincidencia
		if($nombre_usuario){
			//ya el usuario existe , ahora hay que ver si tiene la contraseña correcta y si coinside el primer password es el que el usuario dijita y el segundo paraetro es la contraseña guardada en la base de datos
			if(password_verify($password, $pass_usuario)){
				//login correcto
				//iniciar la sesion una vez todo concuerde 
				session_start();
				$_SESSION['nombre'] = $usuario;
				$_SESSION['id'] = $id_usuario;
				$_SESSION['login'] = true;
				$respuesta = array(
					'respuesta' => 'correcto',
				   	'nombre' => $nombre_usuario,
				   	'tipo' => $accion
				);
			}else{
				//loguin incorrecto, enviar error
				$respuesta = array(
					'respuesta' => 'password Incorrecto'
				);
			}
			
		}else{
			$respuesta = array(
				'error' => 'Usuario no existe'
			);
		}
		$stmt->close();
		$conn->close();
	} catch (Exception $e) {
		$respuesta = array(
			'respuesta' => $e->getMessage()
		);
	}

	echo json_encode($respuesta);
}