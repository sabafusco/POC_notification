var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var routesEventi=require('./app/routes/eventoRoute'); 
var routesUtenti=require('./app/routes/utenteRoute'); 
var database = require('./config/database');

var app = express();
var url = 'mongodb://localhost/EmployeeDB';
var str = "";

mongoose.connect(database.urlMongo);

// parsing del body per leggere i parametri
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer);

app.use("/event",routesEventi);
app.use("/user",routesUtenti);

//app.listen(3000);
var server = app.listen(3000, function() {}); 

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

