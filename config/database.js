
module.exports = (function (env) {
  var mongodb = {};
  switch (env) {
    
    case 'local':
      database = require('../env/localsvil');
      mongodb.urlMongo = database.mongodb.url;
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
 
  return mongodb;
})(process.env.NODE_ENV="local");

//NB :: Settare la variabile d'ambiente NODE_ENV per il recupero dell'env


