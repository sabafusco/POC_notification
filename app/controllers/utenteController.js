var crud = require('../crud/utenteCrud');
var apiUtenti = require('../api/utenteApi');


module.exports = {
 
  //UTILIZZA CALLBACK
  getUtenti: function(req, res, next) {
    crud.findAll(function(utenti){
        res.send(utenti);
    });
    
  },
 
  saveUtente: function(req, res, next) {
    
    var nome=req.body.nome;
    var cognome=req.body.cognome;    
    var matricola=req.body.matricola;    
    
    crud.createUtente(nome, cognome, matricola,function(utente){
        res.send(utente);    
    });
  }  
};
