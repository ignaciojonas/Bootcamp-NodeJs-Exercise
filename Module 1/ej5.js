var http = require('http');
var express = require('express');
//var routes = require('./routes');
var app = express();

app.configure(function (){
  this.set("view engine", "jade");
  this.set("views", __dirname + "/views");
});


app.get('/doc/:id', function (req, res) {
	res.render('layout', { content : req.params.id });
})

http.createServer(app).listen(8080, 
	function()
	{
	console.log('Listening on port 8080')
});