var http = require('http');
var express = require('express');
var routes = require('./routes');
var app = express();

routes.getDoc(app);
routes.getDocument(app);
routes.notFound(app);


http.createServer(app).listen(8080, 
	function()
	{
	console.log('Listening on port 8080')
});