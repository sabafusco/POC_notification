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
  getUtenteLoggato: function(req, res, next) {
        if(req.session.user_id){
            apiUtenti.getUtenteById(req.session.user_id , function(err,utente){
                if(err){
                    res.status(500).send({ succes: false, message: err.message });
                }else{
                    res.send(utente);
                }
            });
        }else{
            res.status(403).send('Operazione non concessa');
        }
  },
 
  saveUtente: function(req, res, next) {
        var nome=req.body.inputnome;
        var cognome=req.body.inputcognome;    
        var matricola=req.body.inputmatricola;    
        var password=req.body.inputpassword;    
        var ruolo=req.body.inputruolo;    

        crud.createUtente(nome, cognome, matricola,password,ruolo,function(err ,utente){

            if(err){
                 if (err.name === 'MongoError' && err.code === 11000) 
                    return res.status(500).send({ succes: false, message: 'Utente presente su db' });
                 else
                    return res.status(500).send();
            }else{
               res.send(utente);   
            }
        });
  }, 
  
   deleteUtente: function(req, res, next) {
        var id = req.params.id;
        
        apiUtenti.eliminaUtenteById(id , function(err){
            if(err){
                res.status(500).send({ succes: false, message: err.message });
            }else{
                res.send({ succes: true, message: 'Eliminazione utente avvenuta con successo.' });
            }
        });
   },
   
   updateUtente:function(req, res, next) {
        var id=req.body.inputid;
        var nome=req.body.inputnome;
        var cognome=req.body.inputcognome;    
        var matricola=req.body.inputmatricola;    
        var password=req.body.inputpassword;    
        var ruolo=req.body.inputruolo;
        
        apiUtenti.updateUtente(id, nome, cognome, matricola, password, ruolo , function(err){
            if(err){
                res.status(500).send({ succes: false, message: err.message });
            }else{
                res.send({ succes: true, message: 'Aggiornamento utente avvenuto con successo.' });
            }
        });
       
   },
   
   getUtenteById:function(req, res, next) {
        var id = req.params.id;
        apiUtenti.getUtenteById(id , function(err,utente){
            if(err){
                res.status(500).send({ succes: false, message: err.message });
            }else{
                res.send(utente);
            }
        });
   }
   
   
  
};
