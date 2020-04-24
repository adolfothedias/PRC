var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')
var Atores = require('../controllers/atores')

router.get('/filmes', function(req, res) {
  Filmes.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

router.get('/filmes/:id/atores', function(req, res) {
  Filmes.getAtoresDoFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos atores do filme ${req.params.id}: ${e}`))
});

router.get('/filmes/:id/generos', function(req, res) {
  Filmes.getGenerosDoFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos géneros do filme ${req.params.id}: ${e}`))
});

router.get('/filmes/:id/personagens', function(req, res) {
  Filmes.getPersonagensDoFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos personagens do filme ${req.params.id}: ${e}`))
});

router.get('/filmes/:id', function(req, res) {
  Filmes.getFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do filme ${req.params.id}: ${e}`))
});

router.get('/atores', function(req, res) {
  Atores.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de atores : ${e}`))
});

router.get('/atores/:id', function(req, res) {
  Atores.getAtor(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem do ator ${req.params.id}: ${e}`))
});

router.get('/atores/:id/personagens', function(req, res) {
  Atores.getPersonagensDoAtor(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem das personagens do ator${req.params.id}: ${e}`))
});

router.get('/atores/:id/filmes', function(req, res) {
  Atores.getFilmesDoAtor(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem dos filmes do ator ${req.params.id}: ${e}`))
});

module.exports = router;