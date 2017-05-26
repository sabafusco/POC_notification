var Utente = require('../models/utente');
module.exports = {
    
    createUtente:function (nome, cognome, matricola, password, resultFunc){
 
            var utente = new Utente ({
                nome:nome,
                cognome:cognome,
                matricola:matricola,
                password:password
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
    },
    
    
    findByMatricolaAndPassword:function(matricola,password,resultFunc){

         Utente.findOne({ "matricola": matricola, "password": password }, function (err, eventi) { 
            if (err) throw err;
            else resultFunc(eventi);
        } );
    },
    
    findById :function(id,resultFunc){
        Utente.findById(id, function (err, eventi) { 
            if (err) throw err;
            else resultFunc(eventi);
        } );
    }

};
