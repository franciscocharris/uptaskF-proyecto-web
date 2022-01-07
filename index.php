<?php 
include 'inc/funciones/sesiones.php';
include 'inc/funciones/funciones.php';
include 'inc/templates/header.php'; 
include 'inc/templates/barra.php';

//una advertencia :en  una redireccion con php no debe de haber html ni nada primero que la funcion o el llamado que 
//la esta haciendo


//obtener el id de la url
if(isset($_GET['id_proyecto']) && filter_var($_GET['id_proyecto'], FILTER_SANITIZE_NUMBER_INT)){
    $id_proyecto = filter_var($_GET['id_proyecto'], FILTER_SANITIZE_NUMBER_INT);
}else{
    $id_proyecto = 0;
}
?>


<div class="contenedor">
   <div class="barra_menu" >
   	<span></span>
   	<span></span>
   	<span></span>
   </div>
   <?php include 'inc/templates/sidebar.php'; ?>

    <main class="contenido-principal">
       <?php if($id_proyecto > 0){ ?> 
             <?php
                $proyecto = obtenerNombreProyecto($id_proyecto);
                 if($proyecto){ ?>
                     <h1> Proyecto Actual:
                        <?php foreach($proyecto as $nombre):  ?>
                            <span><?php echo $nombre['nombre']; ?></span>
                        <?php endforeach; ?>
                    </h1>

                    
                    <form action="#" class="agregar-tarea">
                        <div class="campo">
                            <label for="tarea">Tarea:</label>
                            <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
                        </div>
                        <div class="campo enviar">
                            <input type="hidden" value="<?php echo $id_proyecto; ?>" id="id_proyecto">
                            <input type="submit" class="boton nueva-tarea" value="Agregar">
                        </div>
                    </form>
                <?php }else{
                    //si no hay proyectos seleccionados

                    echo "<p>Selecciona un Proyecto a la izquierda</p>";
                } ?>
         
                <div class="avance">
                    <h2>Avance del proyecto:</h2>
                    <div id="barra-avance" class="barra-avance">
                        <div id="porcentaje" class="porcentaje"></div>
                    </div>
                </div>

                <h2>Listado de tareas:</h2>

                <div class="listado-pendientes">
                    <ul>
                        <?php 
                        //obtine las tareas del proyecto actual

                        $tareas = obtenerTareasProyecto($id_proyecto);

                        if($tareas->num_rows > 0){
                            //si hay trareas
                            foreach($tareas as $tarea){ ?>
                                <li id="tarea:<?php echo $tarea['id']; ?>" class="tarea">
                                    <p><?php echo $tarea['nombre'];?></p>
                                    <div class="acciones">
                                        <i class="far fa-check-circle <?php echo ($tarea['estado'] === '1' ? 'completo' : ''); ?>"></i>
                                        <i class="fas fa-trash"></i>
                                    </div>
                                </li>  
                    <?php   }
                        }else{
                            //no hay tareas
                            echo  "<p class='lista-vacia'>no hay tareas para este proyecto</p>";
                        }
                        ?>
                    </ul>
                </div>
        

       <?php }else{
            echo "<h1>Bienvenido!!<small>escoje un proyecto de la izquierda</small></h1>";

            echo "<div class='listado-pendientes'>";
                echo "<p>Proyecto no seleccionado</p>";
            echo "</div>";
       } ?>

    </main>

</div><!--.contenedor-->


<?php include 'inc/templates/footer.php'; ?>