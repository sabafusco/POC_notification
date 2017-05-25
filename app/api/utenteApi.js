var crud = require('../crud/utenteCrud');

//API

module.exports.getUtenti = function(functionRes){
        crud.findAll(function(utenti){
            functionRes(utenti);
        });
    };
    
module.exports.getUtenteByMatricolaAndPassword = function(matricola,password,functionRes){
        crud.findByMatricolaAndPassword(matricola, password, function(utenti){
            functionRes(utenti);
        });
    };


    




