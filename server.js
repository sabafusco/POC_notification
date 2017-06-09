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

var sessionParser =session({
                    secret: 'chiave che firma la session id',
                    key: 'sid',
                    resave: false,
                    saveUninitialized: true
                  });

app.use(sessionParser);

// parsing del body per leggere i parametri
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer);

app.use("/event",checkAuth,routesEventi,errorHandler);
app.use("/user",checkAuth,routesUtenti,errorHandler);
app.use("/auth",routesAuth);

//app.listen(3000);
//var server = app.listen(config.nodeport, function() {});  // FUNZ
//var webSocket = require('./app/websockets/socket').listen(server,sessionParser);  //FUNZ

///////////////////////////////////1/////////////////////////////////
//var server = require('http').createServer(app);
//var io = require('socket.io')({
//            transports  : [ 'websocket' ]
//         }).listen(server);
//
//io.sockets.on('connection', function (socket) {
//                socket.emit('news', { hello: 'world' });
//                socket.on('my other event', function (data) {
//                console.log(data);
//            });
//    });
//server.listen(config.nodeport, function() {}); 
///////////////////////////////////////////////////////////////////////
////////////////////////////2//////////////////////////////////////
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var porta = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server = require("http").Server(app);
var io = require("socket.io")(server);

var handleClient = function (socket) {
    console.log("connection");
    socket.emit('news', { hello: 'world' });
    console.log("hello");
};

io.sockets.on("connection", handleClient);

console.log("listen on: "+porta);
server.listen(porta,ipaddress);
//////////////////////////////////////////////////////////////////

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
    res.status(500).send({ success:false, message:"Non puoi effettuare questa operazione: Utente non autenticato.", error: 'OPERAZIONE NON CONSENTITA!' });
  } else {
    console.log("OPERAZIONE CONSENTITA");
    next();
  }
}

function errorHandler(err, req, res, next) {
  console.log("**ERROR HANDLER**");  
  console.error(err.message + ":" + err.stack);  
  res.status(500).send({ success: 'false', message:"Errore inatteso." });
}