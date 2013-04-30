var http = require('http');
var express = require('express');
//var routes = require('./routes');
var app = express();

app.configure(function (){
  this.set("view engine", "jade");
  this.set("views", __dirname + "/views");
});


app.get('/doc/:id', function (req, res) {
	//res.jsonp({ doc: req.params.id });
	//var doc = { content : '12312312' };
	res.render('layout', { content : req.params.id });
})


//routes.getDocument(app);
//routes.notFound(app);


http.createServer(app).listen(8080, 
	function()
	{
	console.log('Listening on port 8080')
});