var crud = require('../crud/eventoCrud');
var socket = require('../websockets/socket');
var apiEventi = require('../api/eventoApi');


module.exports = {
 
  //UTILIZZA CALLBACK
  getEventi: function(req, res, next) {
    crud.findAll(function(eventi){
        //console.log("Eventi-->"+eventi);
        res.send(eventi);
    });
  },
  
  //UTILIZZA CALLBACK
  getEvento: function(req, res, next) {
    var id = req.params.id;
    crud.findById(id, function(event){
        //console.log("Evetno-->"+event);
        res.send(event);
    });
  },
  
  //UTILIZZA CALLBACK
  getEventiMatricola: function(req, res, next) {
    var matricola = req.params.matricola;
    crud.findByMatricola(matricola, function(eventi){
        //console.log("Evetno-->"+eventi);
        res.send(eventi);
    });
  },
  
  //UTILIZZA CALLBACK
  setReadedEvento: function(req, res, next) {
    var matricola = req.params.matricola;
    var idEvento = req.params.id;
    crud.findById(idEvento, function(evento){

        var interessati = evento.matricoleInteressate;
                
                if(interessati)
                    for(var index in interessati)
                        if(interessati[index] && interessati[index].matricola && interessati[index].matricola===matricola )
                            interessati[index].visualizzato=true;
                
                evento.matricoleInteressate = interessati;
                
                crud.update(evento, function(eventUpdated){
                    
                    apiEventi.getEventiNonVisualizzati(matricola,function (eventi){
                        if(eventi){
                            socket.notificaUtente(matricola, eventi);
                        } 
                    });
                    
                    res.send(eventUpdated);
                });
    });
  },
  
  //NON UTILIZZA CALLBACK  --> ERRATO
  saveEvento: function(req, res, next) {
      
    var matrIns=req.body.matricolainserimento;
    var matrint=req.body.matricoleinteressate;    
    var titolo=req.body.titolo;    
    var descr=req.body.descrizione;    
    
    crud.createEvento(titolo, descr, matrIns,matrint,function(event){
        
        if(event.matricoleInteressate){
            var matricole=event.matricoleInteressate;
            matricole.forEach(function(matr){
                crud.findByMatricolaNotVisualized(matr.matricola, function(eventi){
                    socket.notificaUtente(matr.matricola, eventi);
                });
            });
        }
        
        res.send(event);    
    });
  }  
};
