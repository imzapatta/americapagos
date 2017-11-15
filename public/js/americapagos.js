$('#btn-signup').click(function(){
    
    console.log("Enviando petición de registro");
    var parametros = 	"email="+$("#txt-email").val()+"&"+
                        "name="+$("#txt-name").val()+"&"+
                        "user="+$("#txt-user").val()+"&"+
                        "password="+$("#txt-password").val();
	
	//alert("Informacion a enviar a la peticion AJAX: " + parametros);
	alert("Enviando información");
	$.ajax({
		url:"/api/signup",
		data:parametros,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
			alert("Se a recibido con exito");
		},
		error:function(e){
			alert("Error: " + JSON.stringify(e));
		}
	});
})

$('#btn-signin').click(function(){
    
    console.log("Enviando petición de registro");
    var parametros = 	"user="+$("#txt-user").val()+"&"+
                        "password="+$("#txt-password").val();
	
	//alert("Informacion a enviar a la peticion AJAX: " + parametros);
	alert("Enviando información");
	$.ajax({
		url:"/api/signin",
		data:parametros,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
			alert("Se a recibido con exito");
		},
		error:function(e){
			alert("Error: " + JSON.stringify(e));
		}
	});
})