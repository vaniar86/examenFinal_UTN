var express = require('express');
var router = express.Router();
// const votanteController = require('../controllers/votanteController');
const votante = require('../controllers/ctrls_votante');
const Votante = require('../model/votante');
const candidato = require('../controllers/ctrls_candidato')
const Candidatos = require('../model/candidatos');
const api = require('../controllers/ctrls_api')

/* GET home page. */
router.get('/', (req, res) =>{res.render ('index', {title : "Elecciones"});});
router.get('/ingresar', votante.votante_ingreso);
router.post('/ingresar', votante.create_votante);
router.get('/elegirCandidato/:dni', candidato.lista_candidatos);
router.get('/api/:dni', api.checkVotante);
router.get('/apiVoto/:dni', api.checkVoto);
router.get('/votar/:id/:dni', api.votar);
router.get('/resultado', candidato.resultado_candidatos);


module.exports = router;
