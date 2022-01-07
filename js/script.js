(function(){
	var contenedor_proyectos = document.querySelector('.contenedor-proyectos');
	var barra_menu = document.querySelector('.barra_menu');
	var contador = 0;
	barra_menu.addEventListener('click', function(){
		
		if(contador % 2 == 0){
			contenedor_proyectos.style.cssText = 'margin-left: 0;';
			
		}else{
			contenedor_proyectos.style.cssText = 'margin-left: -19.5rem;';
		}
		contador++;
	});
	//fin del diseño respondivo con js
	eventListeners();

	//lsita de proyectos
	var listaProyectos = document.querySelector('ul#proyectos');
	function eventListeners(){
		//document ready

		document.addEventListener('DOMContentLoaded', function(){
			actualizarProgreso();
		});

		document.querySelector('ul#proyectos').addEventListener('click', accionesProyectos);
		//boton para crear 
		document.querySelector('.crear-proyecto a').addEventListener('click', nuevoProyecto);

		//boton para una nueva tarea
		document.querySelector('.nueva-tarea').addEventListener('click', agregarTarea);

		//botones para las acciones en tareas

		document.querySelector('.listado-pendientes').addEventListener('click', accionesTareas);
	}

	

	function nuevoProyecto(e){
		e.preventDefault();

		var listaProyectos = document.querySelector('ul#proyectos'); 
		
		//crear un input para el nombre del nuevo proyecto
		var nuevoProyecto = document.createElement('Li');
		nuevoProyecto.innerHTML = '<input type="text" class="nuevoP_movil" placeholder="nombre del proyecto" id="nuevo-proyecto">';
		listaProyectos.appendChild(nuevoProyecto);

		//selccionar el id con el nuevoProyecto

		var inputNuevoProyecto = document.querySelector('#nuevo-proyecto');

		//al presionar enter crear el proyecto
		//keypress es para saber que tecla se presionó which o keyCode para saber su codigo que lo identifica
		// inputNuevoProyecto.classList.add('nuevoP_movil');
		inputNuevoProyecto.addEventListener('keypress', function(e){
			var tecla = e.which || e.keyCode;

			if(tecla === 13 && inputNuevoProyecto.value !== ''){
				//le pasas el valor de los que se escribio
				guardarProyectoDB(inputNuevoProyecto.value);	
				listaProyectos.removeChild(nuevoProyecto);		
			}
		});
	}

	function guardarProyectoDB(nombreProyecto){
			
		var listaProyectos = document.querySelector('ul#proyectos');
		//crear llamado ajax
		var xhr = new XMLHttpRequest();

		//enviar los datos por FormData
		var datos = new FormData();
		datos.append('proyecto', nombreProyecto);
		datos.append('accion', 'crear');

		//abrir la conexion
		xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

		//en la carga

		xhr.onload = function(){
			if(this.status === 200){
				//obtener datos de la respuesta
				var respuesta = JSON.parse(xhr.responseText),
					proyecto = respuesta.nombre_proyecto,
					id_proyecto = respuesta.id_proyecto,
					tipo = respuesta.tipo
					resultado = respuesta.respuesta;

					if(resultado ===  'correcto'){
						//fue exitoso
						if(tipo === 'crear'){
							//se creo un nuevo proyecto
							//inyectar en el html
							var nuevoProyecto = document.createElement('Li');
							nuevoProyecto.innerHTML = `
							<a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}">
								${proyecto}
							</a>
							`;

							//deespues agregar a html
							listaProyectos.appendChild(nuevoProyecto);
							//crear el alerta
							Swal.fire({
								title: 'Proyecto Creado',
								text: 'El proyecto: ' + proyecto + ' se creó correctamente',
								icon: 'success'
							})
							//redireccionar a la url con el id del proyecto para poder agregarles la tarea
							.then(resultado => {
								window.location.href = "index.php?id_proyecto=" + id_proyecto;
							})
						}else{
							//se actualizó o se eliminó
						}
					}else{
						//hubo un error
						Swal.fire({
						  icon: 'error',
						  title: 'Error.',
						  text: 'hubo un error, no se pudo crear el proyecto'
						});
					}
			}
		}
		//enviar los datos

		xhr.send(datos);
	}

//agregar tarea al proyecto actual

function agregarTarea(e){
	e.preventDefault();

	var nombreTarea = document.querySelector('.nombre-tarea').value;
	//validar que el campo tenga algo

	if(nombreTarea === ''){
		Swal.fire({
			  icon: 'error',
			  title: 'Error.',
			  text: 'Rellene el campo!'
			});
	}else{
		//la tarea tiene algo, insertar en pph
		const xhr = new XMLHttpRequest();

		//crear FormData

		var datos = new FormData();
		datos.append('tarea', nombreTarea);
		datos.append('accion', 'crear');
		datos.append('id_proyecto', document.querySelector('#id_proyecto').value);

		//abrir la conexion
		xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);
		//ejecutarlo y respuesta
		xhr.onload = function(){
			if(this.status === 200){
				var respuesta = JSON.parse(xhr.responseText);
				// console.log(respuesta);
				//asignar valores
				var resultado = respuesta.respuesta,
					tarea = respuesta.tarea,
					id_insertado = respuesta.id_insertado,
					tipo = respuesta.tipo;
				if(resultado === 'correcto'){
					//se agrego correctamente
					if(tipo === 'crear'){
						//lanzar la alerta
						Swal.fire({
								title: 'Tarea Creada',
								text: 'La tarea ' + ` "${tarea}" ` + 'se creo correctamente',
								icon: 'success'
							});

						//selecionar el parrafo con la linea vacia
						var parrafoListaVacia = document.querySelectorAll('.lista-vacia');
						if(parrafoListaVacia.length > 0){
							document.querySelector('.lista-vacia').remove();
						} 
						//constuir el template

						var nuevaTarea = document.createElement('Li');

						//agregar el id

						nuevaTarea.id = 'tarea: ' + id_insertado;
						//agregar la clase tarea
						nuevaTarea.classList.add('tarea');
						//insertar el html
						nuevaTarea.innerHTML = `
						<p>${tarea}</p>
						<div class="acciones">
							<i class="far fa-check-circle"></i>
							<i class="fas fa-trash"></i>
						</div>
						`;

						//agregarlo al DOM
						var listado = document.querySelector('.listado-pendientes ul');
						listado.appendChild(nuevaTarea);

						//limpiar el formulario
						document.querySelector('.agregar-tarea').reset();

						//analizar el progreso del proyecto 
						actualizarProgreso();
					}
				}else{
					//error
					Swal.fire({
					  icon: 'error',
					  title: 'Error.',
					  text: 'hubo un error'
					});
				}
			}
		}

		//enviar la consulta
		xhr.send(datos);
	}
}

//cambia el estado de las tareas o las elimina
function accionesTareas(e){
	e.preventDefault();

	if(e.target.classList.contains('fa-check-circle')){
		if(e.target.classList.contains('completo')){
			e.target.classList.remove('completo');
			cambiarEstadoTarea(e.target, 0);
		}else{
			e.target.classList.add('completo');
			cambiarEstadoTarea(e.target, 1);
		}
	}

	if(e.target.classList.contains('fa-trash')){
		Swal.fire({
		  title: 'Estas Seguro?',
		  text: "esta accion no se puede deshacer!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, borrar!',
		  cancelButtonText: 'cancelar'
		}).then((result) => {
		  if (result.value) {
		  	var tareaEliminar = e.target.parentElement.parentElement;
		  	//borrar del bd
		  	 eliminarTareaBD(tareaEliminar);
		  	//borra del HTML
		  	tareaEliminar.remove();
		    Swal.fire(
		      'eliminado',
		      'la tarea a sido eliminada.',
		      'success'
		    )
		  }
		});
	}
}

//competa o descompleto una tarea
function cambiarEstadoTarea(tarea, estado){
	var idTarea = tarea.parentElement.parentElement.id.split(':');
	
	//crear llamado a ajax
	var xhr = new XMLHttpRequest();

	//informacion
	var datos = new FormData();
	datos.append('id', idTarea[1]);
	datos.append('accion', 'actualizar');
	datos.append('estado', estado);

	console.log(estado);
	//abrir la conexion

	xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

	//onload

	xhr.onload = function(){
		if(this.status === 200){
			var respuesta = JSON.parse(xhr.responseText);
			//actualizar el progreso llamando la funcion
			actualizarProgreso();
			console.log(respuesta);
		}
	}

	xhr.send(datos);
}

//eliminar de la base de datos
function eliminarTareaBD(tarea){
	var idTarea = tarea.id.split(':');

	var xhr = new XMLHttpRequest();

	var datos = new FormData();
		datos.append('id', idTarea[1]);
		datos.append('accion', 'eliminar');

	xhr.open('POST', 'inc/modelos/modelo-tareas.php', true);

	xhr.onload = function(){
		if(this.status === 200){
			var respuesta = JSON.parse(xhr.responseText);
			console.log(respuesta);

			//coprobar que halla tareas
			var listaTareasRestantes = document.querySelectorAll('li.tarea');
			if(listaTareasRestantes.length === 0){
				document.querySelector('.listado-pendientes ul').innerHTML = "<p class='lista-vacia'>no hay tareas para este proyecto</p>";
			}
			//actualizar el progreso
			actualizarProgreso();
		}
	}
	xhr.send(datos);
}

function actualizarProgreso(){
	//obtener todas las tareas del proyecto actual
	const tareas = document.querySelectorAll('li.tarea');
	//obtener las tareas completadas con la clase que los identifica como completos
	const tareasCompletas = document.querySelectorAll('i.completo');

	//determinar el avanze 
	const avance = Math.round((tareasCompletas.length / tareas.length)*100);

	//asignar el avance en la barra
	const porcentaje = document.querySelector('#porcentaje');
	porcentaje.style.width = avance+'%';

	//mostrar una alerta al comletar el 100%
	if(avance === 100){
		Swal.fire({
			title: 'Proyecto Terminado',
			text: 'ya no tienes tareas pendientes',
			icon: 'success'
		});
	}

}

function accionesProyectos(e){
		
	var Proyecto_id = e.target.parentElement.parentElement.childNodes[1].id.split(':')[1]
	var accion = e.target;
	var proyecto = e.target.parentElement.parentElement;

	

	if(accion.classList.contains('fa-minus')){
		Swal.fire({
		  title: 'Estas Seguro?',
		  text: "esta accion no se puede deshacer!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, borrar!',
		  cancelButtonText: 'cancelar'
		}).then((result) => {
			if(result.value){
				eliminarProyectoDB(Proyecto_id);
				proyecto.remove();
				Swal.fire(
			      'eliminado',
			      'El proyecto a sido eliminado.',
			      'success'
			    )
			    .then((resultado) => {
			    	window.location.href = 'index.php';
			    });
				
			}else{
				console.log('no');
			}
		});
		
	}

	if(accion.classList.contains('fa-pencil-alt')){
		//editar proyecto
		//input para excribir
		 var textoProyecto = proyecto.childNodes[1].innerText;

		var inputEditar = document.createElement('input');
		inputEditar.setAttribute('type', 'text');
		inputEditar.setAttribute('value', textoProyecto);
		inputEditar.setAttribute('id', 'proyectoEditado');
		
		// console.log(proyecto.childNodes[1]);
		proyecto.replaceChild(inputEditar, proyecto.childNodes[1]);

		var proyectoEditado = document.querySelector('#proyectoEditado');
		proyectoEditado.addEventListener('keypress', function(e){
			var tecla = e.which || e.keyCode;

			if(tecla === 13 && proyectoEditado.value != '' ){
				editarProyectoDB(Proyecto_id, proyectoEditado.value);
				proyecto.setAttribute('editado', 'editado');
				proyectoEditado.remove();
			}
		});
		
	}
}

function eliminarProyectoDB(id){
	
	var xhr = new XMLHttpRequest();
	var datos = new FormData();
	datos.append('accion', 'eliminar');
	datos.append('id', id);
	datos.append('objetivo', 'tarea');

	xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

	xhr.onload = function(){
		if(this.status === 200){
			var resultado = JSON.parse(xhr.responseText);

			console.log(resultado);
			if(resultado.respuesta === 'correcto'){
				console.log('se borraron las tareas');
				var xhr2 = new XMLHttpRequest();
				var datos2 = new FormData();
				datos2.append('accion', 'eliminar');
				datos2.append('id', id);
				datos2.append('objetivo', 'proyecto');

				xhr2.open('POST', 'inc/modelos/modelo-proyecto.php', true);

				xhr2.onload = function(){
					if(this.status === 200){
						var resultado2 = JSON.parse(xhr2.responseText);

						console.log(resultado2);
					}
				}

				xhr2.send(datos2);
			}
		}
	}

	xhr.send(datos);
}

function editarProyectoDB(id, texto){

	var xhr = new XMLHttpRequest();
	var datos = new FormData();
	datos.append('accion', 'editar');
	datos.append('id', id);
	datos.append('texto', texto);

	xhr.open('POST', 'inc/modelos/modelo-proyecto.php', true);

	xhr.onload = function(){
		if(this.status === 200){
			var resultado = JSON.parse(xhr.responseText);


			console.log(resultado);
			if(resultado.respuesta === 'correcto'){
				var lisEditado = document.querySelectorAll('#proyectos li');

				lisEditado.forEach(liEditado =>{
					console.log(liEditado);

					if(liEditado.getAttribute("editado")){
						console.log('bingo');
						liEditado.removeAttribute("editado");
						// ya se encontró el li que tiene el atributo editado ahora se quita y se coloca 
						// el nuevo nombre del proyecto
						liEditado.innerHTML = `
							<a href="index.php?id_proyecto=${id}" id="proyecto:${id}">
								${texto}
							</a>
							<div class="accionesProyecto">
	                            <i class="fas fa-pencil-alt"></i>
	                            <i class="fas fa-minus"></i>
	                        </div>
						`;

						Swal.fire(
					      'Actualizado',
					      'El proyecto a sido actualizado.',
					      'success'
					    );
					}
				});
			}
		}
	}

	xhr.send(datos);
}


}());