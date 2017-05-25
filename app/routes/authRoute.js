var express = require('express'); 
var apiUtenti = require('../api/utenteApi');
require('express-session');

var router = express.Router();

router.post('/login', function (req, res) {
    var post = req.body;
    
    //IF da eliminare
    if(post.matricola==='admin' && post.password==='admin' ){
        req.session.user_id = "IDUTENTEADMIN";
        res.redirect('/POC/angular/informazioni.html?matricola=admin');
    }else{   
        apiUtenti.getUtenteByMatricolaAndPassword(post.matricola,post.password, function(utente){
            if(utente){
                console.log("Utente loggato--->"+utente._id);
                req.session.user_id = utente._id;
                res.redirect('/POC/angular/informazioni.html?matricola='+post.matricola);
            }else{
                res.redirect('/POC/angular/login.html');
            }
        });
    }
    
});

router.get('/logout', function (req, res) {
  delete req.session.user_id;
  res.redirect('/POC/angular/login.html');
});  

module.exports = router;
