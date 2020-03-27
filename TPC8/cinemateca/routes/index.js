var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')
var Atores = require('../controllers/atores')
var Personagens = require('../controllers/personagens')

/* GET home page. */
router.get('/filmes', function(req, res, next) {
  Filmes.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

router.get('/filmes/:id', function(req, res, next) {
  Filmes.getFilm(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na procura do filme ${req.params.id}: ${e}`))
});

router.get('/atores', function(req, res, next) {
  Atores.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de atores: ${e}`))
});

router.get('/atores/:id', function(req, res, next) {
  Atores.getAtor(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na procura do ator ${req.params.id}: ${e}`))
});


router.get('/personagens', function(req, res, next) {
  Personagens.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de personagens: ${e}`))
});

router.get('/personagens/:id', function(req, res, next) {
  Personagens.getPersonagem(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na procura da personagem ${req.params.id}: ${e}`))
});


module.exports = router;
