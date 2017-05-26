var crud = require('../crud/utenteCrud');
var apiUtenti = require('../api/utenteApi');


module.exports = {
 
  //UTILIZZA CALLBACK
  getUtenti: function(req, res, next) {
    crud.findAll(function(utenti){
        res.send(utenti);
    });
  },
  
  //UTILIZZA CALLBACK
  getUtente: function(req, res, next) {
        if(req.session.user_id){
            crud.findById(req.session.user_id,function(utente){
                res.send(utente);
            });
        }else{
            res.status(403).send('Operazione non concessa');
        }
  },
 
  saveUtente: function(req, res, next) {
    
    var nome=req.body.nome;
    var cognome=req.body.cognome;    
    var matricola=req.body.matricola;    
    var password=req.body.password;    
    try{
        crud.createUtente(nome, cognome, matricola,password,function(utente){
            res.send(utente);    
        });
    }catch (exc){
        console.log("Errore salvataggio nuovo utente: "+exc);
        res.send(null); 
    }
  }  
};
