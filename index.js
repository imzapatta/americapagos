var express = require("express");
var bodyParser = require("body-parser");


var app = express();

var urlEncodeParser = bodyParser.urlencoded({extended:false});

app.use(express.static("public"));

app.get("/",function(peticion, respuesta){
	respuesta.send("public/index.html");
});

app.get("/login",function(req, res){
	res.sendFile('paginas/login/', {root: __dirname })
});

app.get("/signup",function(req, res){
	res.sendFile('paginas/signup/', {root: __dirname })
});

app.get("/home",function(req, res){
	res.sendFile('paginas/home/', {root: __dirname })
});

app.get("/historial",function(req, res){
	res.sendFile('paginas/historial/', {root: __dirname })
});

app.get("/perfil",function(req, res){
	res.sendFile('paginas/perfil/', {root: __dirname })
});

app.get("/config",function(req, res){
	res.sendFile('paginas/config/', {root: __dirname })
});

app.post("/api/signup",function(req, res){
	res.send("/")
});

app.post("/api/signin",function(req, res){
	res.send("/")
});
app.listen(2828);
