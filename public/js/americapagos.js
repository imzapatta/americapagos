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
		
		console.log("Enviando petición de registro");
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

//Inicializar Modal
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('#modal1').modal();
	$('select').material_select();
  });
          