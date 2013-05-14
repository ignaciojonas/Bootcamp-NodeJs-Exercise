var http       = require('http');
var express    = require('express');
var app        = express();
var getDb      = require('mongo-getdb');
var ObjectID   = require('mongodb').ObjectID;

getDb.init({url: 'mongodb://ijonas:Passw0rd!@ds061747.mongolab.com:61747/ijonasdb'});

app.configure(function (){
  this.set("view engine", "jade");
  this.set("views", __dirname + "/views");
  this.use(express.static(__dirname + '/public'));
  this.use(express.bodyParser());
});

app.get('/', function (req, res) {  
  getDb(function (db) { 
      db.collection('documents').find().toArray(function(err, docs){
        console.log(docs);
        res.render('home', {docs : docs});
      });
    });
  });


app.get('/search', function (req, res) {  
      var url = require('url');
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      console.log(query);
      getDb(function (db) {

        if(!query.q)
        {
          db.collection('documents').find().toArray(function(err, docs){
            console.log(docs);
            res.render('home', {docs : docs});
          });   
        }
        else
        {
          db.collection('documents').find({ _id: new ObjectID(query.q) }).toArray(function(err, docs){
          console.log(docs);
          res.render('home', {docs : docs});});
        }      
    });
  });



//create a new document and redirect to the edit page.  
app.get('/new', function (req, res) {
  getDb(function (db) {
    db.collection('documents').insert({
      content: 'NEW DOCUMENT'
    }, function (err, inserted) {
      if (err) return res.send(500, err);
      var doc = inserted[0];
      res.redirect('/doc/' + doc._id.toString());
    });
  });
});

//render the document
app.get('/doc/:id', function (req, res) {
   getDb(function (db) {
    db.collection('documents').findOne({
      _id: new ObjectID(req.params.id)
    }, function (err, doc) {
      if (err) return res.send(500, err);
      if (!doc) return res.send(404);
      res.render('doc', doc);
    });
  });
});

//save the document content
app.put('/doc/:id', function (req, res) {
  getDb(function (db) {
    db.collection('documents').update({
      _id: new ObjectID(req.params.id)
    }, {
      $set: {
        content: req.body.content
      }
    }, function (err, count) {
      
      if (err) return res.send(500);
      if (count === 0) return res.send(404);
      res.send(200);

    });
  });
});

http.createServer(app)
    .listen(8080, function () {
      console.log('listening on http://localhost:8080');
    });