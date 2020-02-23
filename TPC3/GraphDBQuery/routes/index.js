var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7200/repositories')
    .then(dados => res.render('index', {repositories: dados.data}))
    .catch(erro => console.log("Erro"))
});

router.post('/', function(req,res){
  var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX h: <http://www.semanticweb.org/carlos/ontologies/2020/` + req.body.repository +`#>
  `
  var genLink = "http://localhost:7200/repositories/" + req.body.repository + "?query="

  var query = req.body.query

  var encoded = encodeURIComponent(prefixes + query)

  axios.get(genLink + encoded)
    .then(dados => res.jsonp(dados.data))
    .catch(erro => res.jsonp({"head":{"vars":["erro"]},"results":{"bindings":[{"erro":{"value":"Repository or query invalid"}}]}}))
})

module.exports = router;
