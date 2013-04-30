var http = require('http');
var express = require('express');

var app = express();

app.get('/hello', function (req, res) {
	// res.writeHead(200);
	// res.write('Hola Mundo');
	// res.end();
	res.send("Hello World");
})

app.get('/bye', function (req, res) {
	// res.writeHead(200);
	// res.write('Hola Mundo');
	// res.end();
	res.send("Bye World");
})

app.get('/*', function (req, res) {

	res.writeHead(404);
})

http.createServer(app).listen(8080, 
	function()
	{
	console.log('Listening on port 8080')
});