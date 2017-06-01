var crud = require('../crud/eventoCrud');
var Evento = require('../models/evento');

//API

module.exports.getEventiNonVisualizzati = function(matricola, functionRes){
        if(matricola){
            crud.findByMatricolaNotVisualized(matricola, function(eventi){
                functionRes(eventi);
            });
        }
    };

module.exports.getEventiVisualizzati = function(matricola, functionRes){
        if(matricola){
            crud.findByMatricolaVisualized(matricola, function(eventi){
                functionRes(eventi);
            });
        }
    };
    
module.exports.setEventoComeVisualizzato = function(idEvento, matricola, functionRes){
        if(matricola && idEvento){
                crud.findById(idEvento, function(evento){
                    var interessati = evento.matricoleInteressate;

                            if(interessati)
                                for(var index in interessati)
                                    if(interessati[index] && interessati[index].matricola && interessati[index].matricola===matricola )
                                        interessati[index].visualizzato=true;

                            evento.matricoleInteressate = interessati;

                            crud.update(evento, function(eventUpdated){
                                    functionRes(eventUpdated);
                            });
                });
        }
    };
    
    module.exports.eliminaEventoById = function(id, functionRes){

        crud.deleteById(id, function(err, result){
            if(err){
                    err.message="Errore inatteso durante la cancellazione dell'evento.";
                    functionRes(err);
            }else{
                functionRes(null,result);
            }
        });
            
    };
    
    module.exports.updateEvento = function(id, titolo, descr, matrInter,  functionRes){
        
        var arrMatricole = [];
        
        if(matrInter){
            var matricole = matrInter.toString().split(',');
            for(var index in matricole){
                arrMatricole.push({matricola:matricole[index], visualizzato:false});
            };
        }
        
        var evento = new Evento ({
                _id:id,
                titolo:titolo,
                descrizione:descr,
                matricoleInteressate: arrMatricole
            });
            
        console.log("API --> Titolo:"+titolo);
        console.log("API --> Descrizione:"+descr);
        console.log("API --> matrInt:"+matrInter);
        
        crud.updateEvent( evento, function(err, result){
            if(err){
                    console.error("ERROR:"+err);
                    err.message="Errore inatteso durante la modifica dell'evento.";
                    functionRes(err,null);
            }else{
                functionRes(null,result);
            }
        });
            
    };
    
    
    

module.exports.createResponseMessage = function(type,msg,eventiVisualizzati,eventiNonVisualizzati,funcResp){
        var ids = [];
        var count = 0;
        
        for(var index in eventiVisualizzati)
            ids.push(eventiVisualizzati[index]._id);
        for(var index in eventiNonVisualizzati)
            ids.push(eventiNonVisualizzati[index]._id);
        
        if(eventiVisualizzati && eventiNonVisualizzati)
            count=eventiVisualizzati.length + eventiNonVisualizzati.length;
        else if(eventiVisualizzati)
            count=eventiVisualizzati.length;
        else if(eventiNonVisualizzati)
            count=eventiNonVisualizzati.length;
        
        var message={
            type:type,
            count:count,
            eventiVisualizzati:eventiVisualizzati,
            eventiNonVisualizzati:eventiNonVisualizzati,
            msg:msg
        };
        
        if(funcResp)
            funcResp(message);
        else
            return message;
};


