var express = require('express'); 
var utenteController = require('../controllers/utenteController');

var router = express.Router();

router.get('/users', utenteController.getUtenti);
router.post('/saveuser', utenteController.saveUtente);

module.exports = router;

