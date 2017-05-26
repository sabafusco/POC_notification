    var crud = require('../crud/utenteCrud');

    //API

    module.exports.getUtenti = function(functionRes){
        crud.findAll(functionRes);
    };
    
    module.exports.getUtenteById = function(id,functionRes){
        crud.findById(id,functionRes);
    };
    
    module.exports.getUtenteByMatricolaAndPassword = function(matricola,password,functionRes){
        crud.findByMatricolaAndPassword(matricola, password, functionRes);
    };


    




