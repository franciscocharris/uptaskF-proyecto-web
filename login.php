<?php 
session_start();
include 'inc/funciones/funciones.php';
include 'inc/templates/header.php';

//la validacion del si uno esta logueado o no, consta de que cuamdo uno esta logueado se crea un arreglo que contiene
//datos del quien loqueó, y para cerrar sesion solo hay que verificar que cerrrar sesion sea true para reescribir el arreglo y no ponerle nada, al instante se cierra la ession

if(isset($_GET['cerrar_sesion'])){
    $_SESSION = array();
}
 ?>

    <div class="contenedor-formulario">
        <h1>UpTask</h1>
        <form id="formulario" class="caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="login">
                <input type="submit" class="boton" value="Iniciar Sesión">
            </div>

            <div class="campo">
                <a href="crear-cuenta.php">Crea una cuenta nueva</a>
            </div>
        </form>
    </div>

<?php include 'inc/templates/footer.php'; ?>


