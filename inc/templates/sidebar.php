 <aside class="contenedor-proyectos">
<div class="panel crear-proyecto">
    <a href="#" class="boton">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
</div>

<div class="panel lista-proyectos">
    <h2>Proyectos</h2>
    <ul id="proyectos">
        <?php 
             $proyectos = obtenerProyectos();
            if($proyectos){
                foreach($proyectos as $proyecto){ ?>
                    <li>
                        
                         <a href="index.php?id_proyecto=<?php echo $proyecto['id']; ?>" 
                            id="proyecto:<?php echo $proyecto['id']; ?>">
                            <?php echo $proyecto['nombre']; ?>
                        </a>
                        <div class="accionesProyecto">
                            <i class="fas fa-pencil-alt"></i>
                            <i class="fas fa-minus"></i>
                        </div>
                    </li>
        <?php  }
            }
        ?>
    </ul>
</div>
</aside>