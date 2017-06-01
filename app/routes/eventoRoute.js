var express = require('express'); 
var eventoController = require('../controllers/eventoController');

var router = express.Router();

router.get('/evento/:id', eventoController.getEvento);
router.get('/eventi', eventoController.getEventi);
router.get('/eventimatricola/:matricola', eventoController.getEventiMatricola);
router.post('/saveevento', eventoController.saveEvento);
router.get('/setasreaded/:id/:matricola', eventoController.setReadedEvento);
router.post('/delete/:id',checkUserRoleAdmin, eventoController.deleteEvento);
router.post('/update',checkUserRoleAdmin, eventoController.updateEvento);

module.exports = router;


 function checkUserRoleAdmin (req, res, next) {
       if( req.session.role &&  (req.session.role==="ADMIN" || req.session.role==="Amministratore") ){
            next();
       }else{
            res.status(500).send({ succes: false, message: 'Non hai i permessi necessari per effettuare questa operazione.' });
       }
   };
