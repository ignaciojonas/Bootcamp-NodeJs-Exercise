var http = require('http');
var express = require('express');

var app = express();

app.get('/doc/:id', function (req, res) {
	res.jsonp({ document: req.params.id });
})


app.get('/*', function (req, res) {

	res.writeHead(404);
	res.end();
})

http.createServer(app).listen(8080, 
	function()
	{
	console.log('Listening on port 8080')
});