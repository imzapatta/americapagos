$('#btn-signup').click(function(){
	
	if(!$("#txt-email").val()){
		$("#txt-email").addClass("invalid");
	}else if(!$("#txt-name").val()){
		$("#txt-name").addClass("invalid");
	}else if(!$("#txt-username").val()){
		$("#txt-username").addClass("invalid");
	}else if(!$("#txt-pass").val()){
		$("#txt-pass").addClass("invalid");
	}else{

		console.log("Enviando petición de registro");
		var parametros = 	
		"email="+$("#txt-email").val()+"&name="+$("#txt-name").val()+"&user="+$("#txt-username").val()+"&password="+$("#txt-pass").val();
		
		// alert("Informacion a enviar a la peticion AJAX: " + parametros);
		$.ajax({
			url:"/registro-usuarios",
			data: parametros,
			method:'POST',
			dataType:"json",
			success:function(respuesta){
				if(respuesta.affectedRows == 1){
					window.location.replace("/home");
				}
			},
			error:function(e){
				alert("Error: " + JSON.stringify(e));
			}
		});
	}
})

$('#btn-signin').click(function(){
	
	
	if(!$("#txt-email").val()){
		$("#txt-email").addClass("invalid");
	}else if(!$("#txt-password").val()){
		$("#txt-password").addClass("invalid");
	}else{
		
		console.log("Enviando petición de ingreso");
		var parametros =
		"email="+$("#txt-email").val()+"&"+
		"password="+$("#txt-password").val();
		
		//alert("Informacion a enviar a la peticion AJAX: " + parametros);
		$.ajax({
			url:"/logearse",
			data:parametros,
			method:'POST',
			dataType:"json",
			success:function(respuesta){
				if(respuesta[0].existe == 1){
					window.location.replace("/home");
				}else{
					Materialize.toast('Correo o Contraseña Incorrecta', 4000)
					$("#txt-email").val('');
					$("#txt-email").removeClass("valid")
					$("#txt-password").val('');
					$("#txt-password").removeClass("valid");
					$("#pass").removeClass("active");
					$("#ema").removeClass("active");
				}
			},
			error:function(e){
				alert("Error: " + JSON.stringify(e));
			}
		});
	}
})

$('#btn-pagar').click(function(){
	
	if(!$("#username").val()){
		$("#username").addClass("invalid");
	}else if(!$("#monto").val()){
		$("#monto").addClass("invalid");
	}else if(!$("#mensaje").val()){
		$("#mensaje").addClass("invalid");
	}else{

		console.log("Enviando petición de registro de movimientos");
		var parametros = 	
		"usuarioReceptor="+$("#username").val()+"&monto="+$("#monto").val()+"&mensaje="+$("#mensaje").val()+"&tipo="+$('select[name=opcion]').val();
		
		// alert("Informacion a enviar a la peticion AJAX: " + parametros);
		$.ajax({
			url:"/registro-movimiento",
			data: parametros,
			method:'POST',
			dataType:"json",
			success:function(respuesta){
				if(respuesta.affectedRows == 1){
					Materialize.toast('¡Transacción Éxitosa!', 4000)
					actualizarInfo();
				}else{
					Materialize.toast('No se pudo realizar la Transacción', 4000)
				}
			},
			error:function(e){
				alert("Error: " + JSON.stringify(e));
			}
		});
	}
})
//Inicializar Modal
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('#modal1').modal();
	$('select').material_select();


	$.ajax({
		url:"/get-session",
		method:'GET',
		dataType:"json",
		success:function(respuesta){
			if(respuesta.iduser){
				actualizarInfo();
				ultimosMovimientos();
			}else{
				// Materialize.toast('No se pudo realizar la obtener la información de usuario', 4000)
			}
		},
		error:function(e){
			alert("Error: " + JSON.stringify(e));
		}
	});
  });

function actualizarInfo(){
	$.ajax({
		url:"/info-usuario",
		method:'GET',
		dataType:"json",
		success:function(respuesta){
			if(respuesta[0].existe == 1){
				$("#idusr").val(respuesta[0].id);
				$("#img-usr").html('');
				$("#img-usr").append(respuesta[0].foto)

				$("#nombre-usr").html('');
				$("#nombre-usr").append(respuesta[0].nombre)

				$("#username-usr").html('');
				$("#username-usr").append(respuesta[0].username)

				$("#monto-usr").html('');
				$("#monto-usr").append(respuesta[0].monto)
			}else{
				Materialize.toast('No se pudo realizar la actualización de la información', 4000)
			}
		},
		error:function(e){
			alert("Error: " + JSON.stringify(e));
		}
	});
}


function ultimosMovimientos(){
	$.ajax({
		url:"/ultimos-movimientos",
		method:'GET',
		dataType:"json",
		success:function(respuesta){
			if(respuesta[0].existe == 1){
				for (var i = 0; i < respuesta.length; i++) {
					var addClass;
					if(respuesta[0].usuario_emisor){
						addClass = "red-text";
					}else{
						addClass = "green-text";
					}
					
					$("ultimos-movimientos").append(
						'<div class="col s2 m2 l2">'+
						'<img src="'+respuesta[0].foto_emisor+'" alt="goku" class="circle responsive-img">'+
					'</div>'+
					'<div class="col s6  m5 l5">'+
						'<span class="nombre">'+
						respuesta[0].nombre_emisor+
						'</span>'+
						'<br>'+
						'<span class="usr">'+
							respuesta[0].username_emisor+        
						' </span>'+
					'</div>'+
					'<div class="col s4 m5 l5 right">'+
						'<span class="monto '+addClass+'">'+
						respuesta[0].monto+
						'</span>Lps'+
					'</div>');
				}
			}else{
				Materialize.toast('No se pudo realizar la actualización de la información', 4000)
			}
		},
		error:function(e){
			alert("Error: " + JSON.stringify(e));
		}
	});
}
