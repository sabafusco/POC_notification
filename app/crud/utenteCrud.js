var Utente = require('../models/utente');
module.exports = {
    
    createUtente:function (nome, cognome, matricola, resultFunc){

        var utente = new Utente ({
            nome:nome,
            cognome:cognome,
            matricola:matricola
        });
        
        utente.save(function(err) {
            if (err) throw err;
            else resultFunc(utente);
        });
    },
 
    findAll:function(resultFunc){
        Utente.find({}, function (err, utenti) { 
            if (err) throw err;
            else resultFunc(utenti);
        } );
    }

};
