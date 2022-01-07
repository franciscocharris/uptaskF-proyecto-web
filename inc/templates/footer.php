<footer>
    <div class="site-footer">
        <p>Desarrollado por Francisco M. Charris C. &copy; <?=date('Y')?></p>
    </div>
</footer>
<script src="js/sweetalert2.all.min.js"></script>
<?php 
	$actual = obtenerPaginaActual();

	if($actual === 'crear-cuenta' || $actual === 'login'){
		echo '<script src="js/formulario.js"></script>';
	}else{
		echo '<script src="js/script.js"></script>';
	}
 ?>

<!-- <script type="text/javascript">
    var adfly_id = 23557163;
    var adfly_advert = 'int';
//El 'frequency_cap' es el número de veces que el usuario será redirigido a la publicidad AdF.ly en 24 horas.
    var frequency_cap = 10;
//El 'frequency_delay' es el número de minutos entre anuncios mostrados al el usuario
    var frequency_delay = 2;
//El 'init_delay' es el número de segundos entre la publicidad que se muestra y la carga de su sitio web. Se recomienda mantener esto a unos pocos segundos para que el usuario pueda ver su sitio web primero y luego su publicidad. 
    var init_delay = 120;
    var popunder = true;
    var adfly_protocol = 'https';
</script>
<script src="https://cdn.adf.ly/js/entry.js"></script> -->
</body>
</html>