    var crud = require('../crud/utenteCrud');

    //API

    module.exports.getUtenti = function(functionRes){
        crud.findAll(functionRes);
    };
    
    module.exports.getUtenteById = function(id,functionRes){
        crud.findById(id, function(err, result){
            if(err){
                    err.message="Errore inatteso durante la ricerca dell'utente.";
                    functionRes(err);
            }else{
                functionRes(null,result);
            }
        });
    };
    
    module.exports.getUtenteByMatricolaAndPassword = function(matricola,password,functionRes){
        crud.findByMatricolaAndPassword(matricola, password, functionRes);
    };
    
    module.exports.eliminaUtenteById = function(id, functionRes){

        crud.deleteById(id, function(err, result){
            if(err){
                    err.message="Errore inatteso durante la cancellazione dell'utente.";
                    functionRes(err);
            }else{
                functionRes(null,result);
            }
        });
            
    };
    
    module.exports.updateUtente = function(id, nome, cognome, matricola , password, ruolo, functionRes){

        crud.update(id, nome, cognome, matricola, password, ruolo, function(err, result){
            if(err){
                    console.error("ERROR:"+err);
                    err.message="Errore inatteso durante la modifica dell'utente.";
                    functionRes(err,null);
            }else{
                functionRes(null,result);
            }
        });
            
    };
    

    




