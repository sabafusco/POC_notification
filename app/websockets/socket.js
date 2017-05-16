var webSocketServer = require('websocket').server;
var apiEventi = require('../api/eventoApi');



/////////////   WEBSOCKET SERVER
var connessioni = new Object();   //Lista di utenti connessi alla websocket
var utentiInVisualizzazione = new Object();  //Lista di utenti che sono sulla pagina di visualizzazione eventi

module.exports.listen = function(server){
 
    var wsServer = new webSocketServer({
        httpServer: server
    });

    // Questa funzione di callback è richiamata ogni volta che qualche utente prova a connettersi 
    // al websocket server
    wsServer.on('request', function(request) {
        console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

        //Questa chiamata accetta connessioni solo dallo stesso sito
        //var connection = request.accept(null, request.origin); 
        var connection = request.accept(null, false);

        var userName = false;

        console.log((new Date()) + ' Connection accepted.');

        //Funzione richiamata quando l'utente invia il messaggio con la propria matricola 
        connection.on('message', function(message) {
            if (message.type === 'utf8') { // accetta solo testo
                
                var msgObj = JSON.parse(message.utf8Data);

                if (userName === false && msgObj.type==="USERNAME") { // l'utente non è ancora presente tra le connessioni quindi registra l'utente

                    userName = msgObj.value;

                    connessioni[userName]=connection; //registra l'utente
                    
                    var msg = "Utente registrato con matricola-->"+userName;
                    
                    //Invia un messaggio a conferma dell'avvenuta registrazione
                    apiEventi.createResponseMessage("REGISTRAZIONE",msg,null,null,function(message){
                        connection.sendUTF(JSON.stringify(message));
                    });
                    
                    //Invia un messaggio con il numero di notifiche non lette
                    apiEventi.getEventiNonVisualizzati(userName,function (eventiNonVisualizzati){

                        if(eventiNonVisualizzati){
                            apiEventi.createResponseMessage("COUNT_NON_VISUALIZZATI",null,null,eventiNonVisualizzati,function(message){
                                connection.sendUTF(JSON.stringify(message));
                            });
                        } 
                    });
                    
                }else if (msgObj.type==="VISUALIZZA_LISTA_EVENTI"){
                        utentiInVisualizzazione[userName] = true;
                        //Invia un messaggio con gli eventi non visualizzati
                        apiEventi.getEventiNonVisualizzati(userName,function (eventiNonVisualizzati){

                            if(eventiNonVisualizzati){
                                apiEventi.createResponseMessage("EVENTI_NON_VISUALIZZATI",null,null,eventiNonVisualizzati,function(message){
                                    connection.sendUTF(JSON.stringify(message));
                                });
                            } 
                        });
                        
                        //Invia un messaggio con gli eventi  visualizzati
                        apiEventi.getEventiVisualizzati(userName,function (eventiVisualizzati){

                            if(eventiVisualizzati){
                                apiEventi.createResponseMessage("EVENTI_VISUALIZZATI",null,eventiVisualizzati,null,function(message){
                                    connection.sendUTF(JSON.stringify(message));
                                });
                            } 
                        }); 
                }
            }
        });


        connection.on('close', function(connection) {
            if (userName !== false ) {
                
                //Se l'utente stava visualizzando gli eventi bisogna aggiornare la lista di eventi non visualizzati
                var inVisualizzazione=utentiInVisualizzazione[userName];
                console.log("inVisualizzazione-->"+inVisualizzazione);
                
                if(inVisualizzazione===true){
                    apiEventi.getEventiNonVisualizzati(userName,function (eventiNonVisualizzati){
                        if(eventiNonVisualizzati){
                            eventiNonVisualizzati.forEach(function(evento) {
                                apiEventi.setEventoComeVisualizzato(evento._id,userName,function(evento){
                                    console.log("Evento "+evento._id+" settato come letto!!!   per matricola --> "+userName);
                                });
                            });
                        } 
                    });
                }
                
                console.log((new Date()) + " Utente con indirizzo " + connection.remoteAddress + " disconnesso.");
                delete connessioni[userName]; // rimuovi utente dalla lista di connessioni
                delete utentiInVisualizzazione[userName]; // rimuovi l'utente scollegato dalla lista degli utenti in visualizzazione
            }
        });


    });
    
    return wsServer;
};



module.exports.notificaUtente = function(matricola,eventiNonVisualizzati){
    var connessione = connessioni[matricola];
    if(connessione){
        //aggiorna il count sull'icona
        apiEventi.createResponseMessage("COUNT_NON_VISUALIZZATI",null,null,eventiNonVisualizzati,function(message){
                        connessione.sendUTF(JSON.stringify(message));
        });
        
        //Se l'utente sta visualizzando gli eventi bisogna aggiornare la lista di eventi non visualizzati
        var inVisualizzazione=utentiInVisualizzazione[matricola];
        if(inVisualizzazione){
            //Invia un messaggio con gli eventi non visualizzati
                if(eventiNonVisualizzati){
                    apiEventi.createResponseMessage("EVENTI_NON_VISUALIZZATI",null,null,eventiNonVisualizzati,function(message){
                        connessione.sendUTF(JSON.stringify(message));
                    });
                } 
        }
    }
};