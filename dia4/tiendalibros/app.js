var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var db = null;



var app = express();
app.use(bodyParser.urlencoded({encoded:true, extended:true}));
app.use(bodyParser.json());


app.get('/', consultarIndex);
app.get('/libro/:id', consultarLibroId);
app.get('/autores/consultar', consultarAutores);

app.get('/autores/listar', consultarLibrosPorAutor);
app.get('/libros/consultar', consultarLibros);


app.post('/autores/registrar', registrarAutor);
app.post('/libros/registrar', registrarLibro);


function consultarLibros(req, res){
	var libros = db.collection('libros');
	var opciones = {
		sort:[['_id','desc']]
	};
	libros.find({}, opciones, function(err, data){
		if (err) { console.error(err); return; }
		res.send({mensaje:'Libros', codigo:1, data:data});
	});
}

function consultarAutores(req, res){
	var libros = db.collection('autores');
	libros.find().toArray(function(err, data){
		if (err) { console.error(err); return; }
		console.log(data);
		res.send({mensaje:'Autores', codigo:1, data:data});
	});
}

function registrarLibro(req, res){
	var libros = db.collection('libros');
	var nuevoLibro = {
		nombre: 'Por quién doblan las campanas',//req.body.nombre,
		autor: '5a85b69df36d2873fccf4663'
	};

	libros.insert(nuevoLibro, function(err, resultado){
		if (err) { console.error(err); return };
		res.send({mensaje:'Libro registrado', codigo:1 });
	});
};


function registrarAutor(req, res){
	var autores = db.collection('autor');
	var nuevoAutor = {
		nombre: req.body.nombre
	};

	autores.insert(nuevoAutor, function(err, resultado){
		if (err) { console.error(err); return };
		res.send({mensaje:'Autor registrado', codigo:1});
	});
};





function consultarIndex(req, res){
	var libros = db.collection('libros');
	var opciones = {
		limit:10,
		sort:[['_id','desc']]
	};
	libros.find({}, opciones, function(err, data){
		if (err) { console.error(err); return; }
		res.send({mensaje:'Best Seller', codigo:200, data:data});
	});
}

function consultarLibroId(req, res){
	var id = req.param('id');
	var post = db.collection('post');
	post.findOne({_id:new ObjectId(id)}, function(err, data){
		if (err) { console.error(err); return; }		
		res.render('libro', {libro:data});
	});
}


function consultarLibrosPorAutor(req, res){
	var autores = db.collection('autor');
	autores.find({}, function(err, data){
		if (err) { console.error(err); return; }
		data.toArray(function(err, listaAutores){
			if (err) { console.error(err); return; }
			res.render('lista_autores', {autores:listaAutores})
		});
	});
}


MongoClient.connect('mongodb://jsvanegas:123@ds225028.mlab.com:25028/tiendalibros', function(err, client){
	if (err) { return console.log(err); }
	db = client.db('tiendalibros');
	app.listen(5000);
	console.log('Servidor corriendo en puerto 5000');	
});

