exports.getDoc = function (app) {
	app.get('/doc/:id', function (req, res) {
	res.jsonp({ doc: req.params.id });
})};

exports.getDocument = function (app) {
	app.get('/document/:id', function (req, res) {
	res.jsonp({ document: req.params.id });
})};

exports.notFound = function (app){
	app.get('/*', function (req, res) {

	res.writeHead(404);
	res.end();
})
	};


