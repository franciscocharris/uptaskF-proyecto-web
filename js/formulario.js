(function(){
	
	eventListeners();

	function eventListeners(){
		document.querySelector('#formulario').addEventListener('submit', validarRegistro);
	}

	function validarRegistro(e){
		e.preventDefault();

		var usuario = document.querySelector('#usuario').value,
			password = document.querySelector('#password').value,
			tipo = document.querySelector('#tipo').value;

		if(usuario === '' || password === ''){
			//los campos estan vacios
			Swal.fire({
			  icon: 'error',
			  title: 'Error.',
			  text: 'Ambos campos son obligatorios!'
			})
		}else{
			//ambos campos son correctos,mandar a ejecutar ajax

			//datos que se enviar al servidor
			var datos = new FormData();
			datos.append('usuario', usuario);
			datos.append('password', password);
			datos.append('accion', tipo);

			//crear el llamado a ajax

			var xhr = new XMLHttpRequest();

			//abrir la conexion
			xhr.open('POST', 'inc/modelos/modelo-admin.php', true);

			//xhr.onload retorno de datos

			xhr.onload = function(){
				if(this.status === 200){
					var respuesta = JSON.parse( xhr.responseText );

					console.log(respuesta);
					//si la respuesta es correcta
					if(respuesta.respuesta === 'correcto'){
						//si es un nuevo usuario
						if(respuesta.tipo === 'crear'){
							Swal.fire({
								title: 'Usuario Creado',
								text: 'El usuario se creó correctamente',
								icon: 'success'
							});
						}else if(respuesta.tipo === 'login'){
							Swal.fire({
								title: 'Login Correcto',
								text: 'presiona OK para continuar',
								icon: 'success'
							})//promise una promesa en javascript
							//resultado es una palabra aleatoria hay se pudo poner cualquiera
							//.then devuelve true en caso de ser correcto
							.then(resultado => {
								if(resultado.value){
									window.location.href = 'index.php';
								}
							})
						}
					}else{
						//hubo un error
						Swal.fire({
						  icon: 'error',
						  title: 'Error.',
						  text: 'hubo un error'
						})
					}
				}
			}
			//enviar la peticion

			xhr.send(datos);

		}
	}
})();