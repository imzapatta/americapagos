var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const crypto = require('crypto');

var app = express();
var conexion = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"americapagos_db"
});

var urlEncodeParser = bodyParser.urlencoded({extended:false});

function encriptar(password){
	let shasum = crypto.createHash('sha256')
	shasum.update(password)
	return shasum.digest('hex')
}

function Auth(req, res, next){
	if(req.session.email)
		return next();
	else{
		res.statusCode = 302;
		res.setHeader("Location", "/login");
		res.end();
	}
}

app.use(express.static("public"));
app.use(session({secret:'proyecto',resave:true,saveUninitialized:true}));

app.get("/",function(req, res){
	res.send("public/index.html");
});

app.get("/login",function(req, res){
	res.sendFile('paginas/login/', {root: __dirname })
});

app.get("/signup",function(req, res){
	res.sendFile('paginas/signup/', {root: __dirname })
});

app.get("/logout", function (req,res){
	req.session.destroy();
	res.sendFile('paginas/login/', {root: __dirname })
})
app.post("/registro-usuarios", urlEncodeParser, function(req, res){
	conexion.query(
		"INSERT INTO tbl_usuarios (nombre,email,username,password, foto) VALUES (?,?,?,?,?)",
		[	
			req.body.name,
			req.body.email,
			req.body.user,
			encriptar(req.body.password),
			"/img/profile/goku.jpg"
		],
		function(err, resultado){
			if (err) throw err;
			res.send(JSON.stringify(resultado));
		}
	);
});

app.post("/logearse", urlEncodeParser,function(req, res){
	// console.log("Se buscará la informacion");
	conexion.query(
		"SELECT id, nombre, username, foto, count(28) existe FROM tbl_usuarios WHERE email= ? AND password= ?",
		[	
			req.body.email,
			encriptar(req.body.password)
		],
		function(err, resultado, campos){
			if (err) throw err;
			if(resultado[0].existe == 1){
				req.session.email = req.body.email;
				req.session.password = encriptar(req.body.password);
				req.session.iduser = resultado[0].id;
			}else{
				req.session.destroy();
			}
			res.send(resultado);
		}
	);
});

app.get("/home", Auth,function(req, res){
	res.sendFile('paginas/home/', {root: __dirname })
});

app.get("/historial", Auth,function(req, res){
	res.sendFile('paginas/historial/', {root: __dirname })
});

app.get("/perfil", Auth,function(req, res){
	res.sendFile('paginas/perfil/', {root: __dirname })
});

app.get("/config", Auth,function(req, res){
	res.sendFile('paginas/config/', {root: __dirname })
});

app.listen(2828);
