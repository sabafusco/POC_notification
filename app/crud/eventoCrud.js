var Evento = require('../models/evento');
module.exports = {
    
    createEvento:function (titolo, descr, matrIns,matrInter, resultFunc){
        
        var matricole = matrInter.toString().split(',');
        var arrMatricole = [];
        
        for(var index in matricole){
            arrMatricole.push({matricola:matricole[index], visualizzato:false});
        };
        
        var event = new Evento ({
            titolo:titolo,
            descrizione:descr,
            idEvento:0,
            matricolaInserimento : matrIns,
            dataInserimento :  new Date(),
            matricoleInteressate: arrMatricole
        });
        
        event.save(function(err) {
            if (err) throw err;
            else resultFunc(event);
        });
    },
    
    
    findById:function(id, resultFunc){
        
        Evento.findById(id, function (err, event) { 
            if (err) throw err;
            else resultFunc(event);
        } );
        
    },
    
    findAll:function(resultFunc){
        Evento.find({}, function (err, eventi) { 
            if (err) throw err;
            else resultFunc(eventi);
        } );
    },
    
    
    findByMatricola:function(matricola,resultFunc){

        Evento.find({ "matricoleInteressate.matricola": matricola }, function (err, eventi) { 
            if (err) throw err;
            else resultFunc(eventi);
        } );
    },
    
    findByMatricolaNotVisualized:function(matricola,resultFunc){

        Evento.find({matricoleInteressate: {$elemMatch: {matricola:matricola, visualizzato:false}}}).sort({dataInserimento: -1}).exec( function (err, eventi) { 
            if (err) throw err;
            else resultFunc(eventi);
        } );
    },
    
    findByMatricolaVisualized:function(matricola,resultFunc){

        Evento.find({matricoleInteressate: {$elemMatch: {matricola:matricola, visualizzato:true}}} ).sort({dataInserimento: -1}).exec( function (err, eventi) { 
            if (err) throw err;
            else resultFunc(eventi);
        } );
    },
    
    update:function(evento,resultFunc){
        Evento.update({_id: evento._id}, evento, {upsert: true}, function(err,eventoUp){
            if (err) throw err;
            else resultFunc(evento);        
        });
    }
  
}
