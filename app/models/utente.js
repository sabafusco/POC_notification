
//mongoose is an object modeling package for Node that essentially works like an ORM
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var utenteSchema = new Schema({
  nome:String,
  cognome:String,
  ruolo:String,
  matricola:{ type: String, required: true, unique: true },
  password:{ type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
var Utente = mongoose.model('Utente', utenteSchema);

// make this available to our users in our Node applications
module.exports = Utente;


