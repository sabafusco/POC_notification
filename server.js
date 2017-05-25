var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var routesEventi=require('./app/routes/eventoRoute'); 
var routesUtenti=require('./app/routes/utenteRoute'); 
var routesAuth=require('./app/routes/authRoute'); 
var config = require('./config/database');



var app = express();

mongoose.connect(config.urlMongo);

app.use(session({
  secret: 'chiave che firma la session id',
  resave: false,
  saveUninitialized: true
}));

// parsing del body per leggere i parametri
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer);

app.use("/event",checkAuth,routesEventi);
app.use("/user",checkAuth,routesUtenti);
app.use("/auth",routesAuth);

//app.listen(3000);
var server = app.listen(config.nodeport, function() {}); 

var webSocket = require('./app/websockets/socket').listen(server);

//var server = app.listen(3000, function() {}); 


//console.log("URL DATABASE-->"+database.urlMongo);
//var MongoClient = require('mongodb').MongoClient;
//var autoIncrement = require("mongodb-autoincrement");

//app.route('/addEmploy').get(function(req, res){
//    
//        MongoClient.connect(url, function(err, db) {
//            autoIncrement.getNextSequence(db, 'Employee', function (err, autoIndex) {
//                db.collection('Employee').insertOne({
//                    Employeeid: autoIndex ,
//                    EmployeeName: "NewEmployee"
//                });
//            });
//            res.send("OK");
//            db.close();
//        });
//    });
//
//app.route('/Employeeids').get(function(req, res){
//        
//        MongoClient.connect(url, function(err, db) {
//                db.collection('Employee', function (err, collection) {
//                    collection.find().toArray(function(err, items) {
//                       if(err) throw err;
//                       res.send(items);
//                   });
//                });
//                db.close();
//        });
//    });

function checkAuth(req, res, next) {
  if (!req.session.user_id) {
    console.log("OPERAZIONE NON CONSENTITA");
    res.redirect('/POC/angular/login.html');
  } else {
    console.log("OPERAZIONE CONSENTITA");
    next();
  }
}