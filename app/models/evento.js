//// define model
//var evento = {
//  matricolaInserimento: '',
//  dataInserimento: '',
//  matricoleInteressate: []
//};
//
//// export collection module
//module.exports = evento;

// load mongoose since we need it to define a model
//var mongoose = require('mongoose');
//
//module.exports = mongoose.model('Evento', {
//    matricolaInserimento : String,
//    dataInserimento : String,
//    matricoleInteressate: [String]
//});


//mongoose is an object modeling package for Node that essentially works like an ORM
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var eventoSchema = new Schema({
  idEvento:Number,
  titolo:String,
  descrizione:String,
  matricolaInserimento : String,
  dataInserimento : String,
  matricoleInteressate: [{matricola:String, visualizzato:Boolean}]
});

// the schema is useless so far
// we need to create a model using it
var Evento = mongoose.model('Evento', eventoSchema);

// make this available to our users in our Node applications
module.exports = Evento;


