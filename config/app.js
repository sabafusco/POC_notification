
module.exports = (function (env) {
  var config = {};
  switch (env) {
    
    case 'local':
      //database = require('../env/localsvil');
      //mongodb.urlMongo = database.mongodb.url;
      var node_port = process.env.NODE_PORT || "3000";

      var db_host = process.env.DB_HOST || "localhost";
      var db_port = process.env.DB_PORT || "27017";
      var db_schema = process.env.DB_SCHEMA || "eventi";
      
      config.urlMongo = 'mongodb://'+db_host+':'+db_port+'/'+db_schema;
      config.nodeport = node_port;
      
      break;
   
//    case 'development':
//      config = require('../env/development');
//      break;
//   
//    case 'testing':
//      config = require('../env/testing');
//      break;
//   
//    case 'staging':
//      config = require('../env/staging');
//      break;
      
    default:
      console.error('NODE_ENV environment variable not set');
      process.exit(1);
  }
 
  return config;
})(process.env.NODE_ENV || "local");

//NB :: Settare la variabile d'ambiente NODE_ENV per il recupero dell'env


