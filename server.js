var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

var routesEventi=require('./app/routes/eventoRoute'); 
var routesUtenti=require('./app/routes/utenteRoute'); 
var routesAuth=require('./app/routes/authRoute'); 
var config = require('./config/app');

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

//// Crea il server Http e la webSocket 
var server = require("http").Server(app);
var webSocket = require('./app/websockets/socket').listen(server,sessionParser);  //FUNZ
server.listen(config.nodeport);


console.log("Url db mongo : "+config.urlMongo);
console.log("Server http in ascolto sulla porta : "+config.nodeport);
console.log("Server http avviato.");



////////////////////////////2//////////////////////////////////////
//var porta = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.use(express.static('public'));

//var server = require("http").Server(app);
//var io = require("socket.io")(server);
//
//var handleClient = function (socket) {
//    console.log("connection");
//    socket.emit('news', { hello: 'world' });
//    console.log("hello");
//};
//
//io.sockets.on("connection", handleClient);
//
//console.log("listen on 2: "+porta);
//server.listen(porta);
//////////////////////////////////////////////////////////////////


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