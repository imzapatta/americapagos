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

function date(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	
	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	var hh = today.getHours();
	var min = today.getMinutes();
	var ss = today.getSeconds();
	var today = dd+'-'+mm+'-'+yyyy+" "+hh+':'+min+':'+ss;
	return today;
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

app.get("/get-session",function(req, res){
	res.send(JSON.stringify(req.session));
});
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

app.post("/registro-movimiento", urlEncodeParser, function(req, res){
	conexion.query(
		"INSERT INTO tbl_movimientos(tipo_movimiento, usuario_emisor, usuario_receptor, monto, referencia, fecha, mensaje) "+
		"VALUES (?,?,?,?,?,?,?)",
		[	
			req.body.tipo,
			req.session.iduser,
			req.body.usuarioReceptor,
			req.body.monto,
			encriptar(req.body.iduser+req.body.usuarioReceptor+date()),
			date(),
			req.body.mensaje
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

app.get("/info-usuario", Auth,function(req, res){
	// console.log("Se buscará la informacion");
	conexion.query(
		"SELECT id, nombre, username, foto, monto, count(28) existe FROM tbl_usuarios WHERE id= ?",
		[	
			req.session.iduser
		],
		function(err, resultado, campos){
			if (err) throw err;
			console.log(resultado)
			if(resultado[0].existe == 1){
				console.log(resultado)
				res.send(JSON.stringify(resultado));
			}
		}
	);
});
app.get("/ultimos-movimientos", Auth,function(req, res){

	conexion.query(
		"SELECT A.id, tipo_movimiento, usuario_emisor, usuario_receptor, A.monto, fecha, mensaje, b.nombre nombre_emisor, b.username username_emisor, b.foto foto_emisor, c.nombre nombre_receptor, c.username username_receptor, count(28) existe "+
		"FROM tbl_movimientos A "+
		"INNER JOIN tbl_usuarios b ON A.usuario_emisor = b.id "+
		"INNER JOIN tbl_usuarios c ON A.usuario_receptor = c.id "+
		"WHERE (usuario_emisor=? or usuario_receptor=?) "+
		"ORDER BY A.id DESC LIMIT 4",
		[	
			req.session.iduser,
			req.session.iduser
		],
		function(err, resultado, campos){
			if (err) throw err;
			console.log(resultado)
			if(resultado[0].existe == 1){
				console.log(resultado)
				res.send(JSON.stringify(resultado));
			}
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
