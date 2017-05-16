var crud = require('../crud/utenteCrud');

//API

module.exports.getUtenti = function(functionRes){
        crud.findAll(function(utenti){
            functionRes(utenti);
        });
    };


    




