var express = require('express'); 
var eventoController = require('../controllers/eventoController');

var router = express.Router();

router.get('/evento/:id', eventoController.getEvento);
router.get('/eventi', eventoController.getEventi);
router.get('/eventimatricola/:matricola', eventoController.getEventiMatricola);
router.post('/saveevento', eventoController.saveEvento);
router.get('/setasreaded/:id/:matricola', eventoController.setReadedEvento);

module.exports = router;

