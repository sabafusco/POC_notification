var express = require('express'); 
var utenteController = require('../controllers/utenteController');

var router = express.Router();

router.get('/users', utenteController.getUtenti);
router.get('/authuser', utenteController.getUtenteLoggato);
router.post('/saveuser', utenteController.saveUtente);
router.post('/delete/:id',checkUserRoleAdmin, utenteController.deleteUtente);
router.post('/update',checkUserRoleAdmin, utenteController.updateUtente);
router.get('/getuser/:id', utenteController.getUtenteById);

module.exports = router;


function checkUserRoleAdmin (req, res, next) {
       if( req.session.role &&  (req.session.role==="ADMIN" || req.session.role==="Amministratore") ){
            next();
       }else{
            res.status(500).send({ succes: false, message: 'Non hai i permessi necessari per effettuare questa operazione.' });
       }
   };
