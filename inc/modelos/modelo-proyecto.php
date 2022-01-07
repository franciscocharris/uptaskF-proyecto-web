<?php 


$accion = filter_var($_POST['accion'], FILTER_SANITIZE_STRING);


if($accion === 'crear'){

	$proyecto = $_POST['proyecto'];
	try {
		//importamos la conexion
		include '../funciones/conexion.php';

		 $stmt = $conn->prepare("INSERT INTO proyectos (nombre) VALUES ( ? ) ");
		 $stmt->bind_param("s", $proyecto);
		 $stmt->execute();
		 if($stmt->affected_rows){
		 	$respuesta = array(
		 		'respuesta' => 'correcto',
		 		'id_proyecto' => $stmt->insert_id,
		 		'tipo' => $accion,
		 		'nombre_proyecto' => $proyecto
		 	);
		 }
		$stmt->close();
		$conn->close();
		
	} catch (Exception $e) {
		$respuesta = array(
			'error' => $e->getMessage()
		);
	}
	echo json_encode($respuesta);
}
if($accion === 'eliminar'){
	//importamos la conexion
	include '../funciones/conexion.php';

	$id = filter_var($_POST['id'], FILTER_VALIDATE_INT);	
	$objetivo = filter_var($_POST['objetivo'], FILTER_SANITIZE_STRING);

	if($objetivo === 'tarea'){
		try {
			$stmt = $conn->prepare(" DELETE  FROM tareas WHERE id_proyecto = ? ");
			$stmt->bind_param("i", $id);
			$stmt->execute();
			$respuesta = array(
				'respuesta' => 'correcto',
				'id' => $id
			);
			$stmt->close();
			$conn->close();
		} catch (Exception $e) {
			$respuesta = array(
				'error' => $e->getMessage()
			);
		}
		echo json_encode($respuesta);
	}

	if($objetivo === 'proyecto'){
		try {
			$stmt = $conn->prepare(" DELETE  FROM proyectos WHERE id = ? ");
			$stmt->bind_param("i", $id);
			$stmt->execute();
			$respuesta = array(
				'respuesta' => 'correcto',
				'id' => $id
			);
			$stmt->close();
			$conn->close();
		} catch (Exception $e) {
			$respuesta = array(
				'error' => $e->getMessage()
			);
		}

		echo json_encode($respuesta);
	}


	
}
if($accion === 'editar'){
	include '../funciones/conexion.php';
	$id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
	$proyecto = filter_var($_POST['texto'], FILTER_SANITIZE_STRING);
	try {
		$stmt = $conn->prepare(" UPDATE proyectos SET nombre = ? WHERE id = ? ");
		$stmt->bind_param("si", $proyecto, $id);
		$stmt->execute();
		$respuesta = array(
			'respuesta' => 'correcto',
			'id' => $id
		);
		$stmt->close();
		$conn->close();
	} catch (Exception $e) {
		$respuesta = array(
			'respuesta' => 'error'. $e->getMessage()
		);
	}

	echo json_encode($respuesta);
}