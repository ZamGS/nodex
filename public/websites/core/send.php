<?php
if (isset($_POST['submit_form'])) {
	$asunto	 = post('asunto');
	$correo	 = post('correo');
	$mensaje = post('mensaje');
	$autor   = post('autor');

	$producto_id 	= post('producto_id');
	$opcional1 		= post('telefono');
	//Guardar mensaje en la base de datos
	$datos = array('mensaje_asunto' => $asunto,'mensaje_correo'=>$correo,'mensaje_autor'=>$autor,'mensaje_contenido'=>$mensaje,'mensaje_pagina_id'=>$pagina_id );
	if ($producto_id) {
		$datos = array('mensaje_asunto' => $asunto,'mensaje_correo'=>$correo,'mensaje_autor'=>$autor,'mensaje_contenido'=>$mensaje,'mensaje_pagina_id'=>$pagina_id,'mensaje_producto_id'=>$producto_id,'mensaje_opcional_1'=>$opcional1);
	}
	$mensaje=$db->insert('pagina_mensaje',$datos);	

	//	Hacemos esto para avisarle a node que algo pasó
	$mensaje = PANEL_CORREO.$pagina_id;

	//Enviar mensaje por correo
	//function correo($pagina_contacto,$correo,$nombre,$asunto,$mensaje){        
	// $msj = correo($pagina['correo'],$correo,$autor,$asunto,$mensaje);
	// if ($mensaje_id) {
	// 	$tpl->mensaje_enviado=1;
	// 	$tpl->mensaje='<strong>Mensaje enviado!</strong> En breve nos pondremos en contacto con usted<br>'.$msj;
	// }else{
	// 	$tpl->mensaje_enviado=0;
	// 	$tpl->mensaje='<strong>Error!</strong> Ocurrió algo inesperado al enviar el mensaje, te recomendamos enviar un correo a esta dirección <br>'.$pagina['correo'].''.$msj;
	// }
}

$respuesta =2;
if (isset($_POST['submit_seguidor'])) {
	$datos = array('seguidor_nombre' => post('seguidor_nombre'), 'seguidor_correo'=>post('seguidor_correo'),'seguidor_pagina_id'=>$pagina_id);
	$respuesta = $db->insert('pagina_seguidor',$datos);
	if (is_numeric($respuesta)) {
		$respuesta = "<script type=\"text/javascript\">
        var notify = humane.create({ timeout: 4000, baseCls: 'humane-bigbox' });
        notify.log('Gracias por registrarte');
        </script>";       
	}else{
		$respuesta = "<script type=\"text/javascript\">
        var notify = humane.create({ timeout: 4000, baseCls: 'humane-bigbox' });
        notify.log('Ocurrió un error, por favor intenta más tarde');
        </script>";        
	}
}

?>