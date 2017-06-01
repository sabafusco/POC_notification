var Utente = require('../models/utente');
module.exports = {
    
    createUtente:function (nome, cognome, matricola, password, ruolo , resultFunc){
 
            var utente = new Utente ({
                nome:nome,
                cognome:cognome,
                matricola:matricola,
                password:password,
                ruolo:ruolo
            });
            
            utente.save(function(err) {
                if (err) resultFunc(err,null);
                else resultFunc(null,utente);
            });
    },
 
    findAll:function(resultFunc){
        Utente.find({}, function (err, utenti) { 
            if (err) throw err;
            else resultFunc(utenti);
        } );
    },
    
    
    findByMatricolaAndPassword:function(matricola,password,resultFunc){

         Utente.findOne({ "matricola": matricola, "password": password }, function (err, eventi) { 
            if (err) throw err;
            else resultFunc(eventi);
        } );
    },
    
    findById :function(id,resultFunc){
        Utente.findById(id, function (err, eventi) { 
            if (err) resultFunc(err,null);
            else resultFunc(null,eventi);
        } );
    },
    
    deleteById: function(id,resultFunc){
        Utente.remove({_id:id}, function (err, eventi) {
            if (err) resultFunc(err,null);
            else resultFunc(null,eventi);
        } );
    },
    
    update: function(id, nome, cognome, matricola, password, ruolo , resultFunc){
        var utente = new Utente ({
                _id:id,
                nome:nome,
                cognome:cognome,
                matricola:matricola,
                password:password,
                ruolo:ruolo
            });
        
        Utente.findByIdAndUpdate(id , utente ,{upsert: true}, function(err,result) {
                if (err) resultFunc(err,null);
                else resultFunc(null,utente);
            });
    }

};
