var express = require('express');
var router = express.Router();
var axios = require('axios')


var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX : <http://prc.di.uminho.pt/2020/amd#>
`
var repositorio = 'http://localhost:7200/repositories/ArquivoMusicas?query='

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = `
  select ?s ?tit (count(?p) as ?count) where {
      ?s rdf:type :Obra .
      ?s :título ?tit .
      ?s :temPartitura ?p . 
  } group by ?s ?tit
  order by desc(?count)
  `;
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(repositorio + encoded)
    .then(dados => {
      var mydata = dados.data.results.bindings.map(obra => {return {id: obra.s.value.split('#')[1], titulo: obra.tit.value, count: obra.count.value} })
      res.render('index', { obras: mydata });
    })
    .catch(erro => {
      res.render('error', {error : erro})   
    })
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id
  var queryinfo = ` 
  select ?tit ?tip where {
    :${id} rdf:type :Obra .
    :${id} :título ?tit .
    :${id} :tipo ?tip . 
  }
  `
  var queryparts = `
  select ?part ?inst ?voz ?clave ?path where {
    :${id} rdf:type :Obra .
    :${id} :temPartitura ?part.
    ?part :éTocadaPor ?inst.
    optional{ 
      ?part :voz ?voz.
    }
    optional{
      ?part :clave ?clave.
    }
    ?part :path ?path.
  } group by ?part ?inst ?voz ?clave ?path
  ` 

  var encod1 =repositorio + encodeURIComponent(prefixes + queryinfo)
  var encod2 =repositorio + encodeURIComponent(prefixes + queryparts)
  
  const req1 = axios.get(encod1)
  const req2 = axios.get(encod2)
  axios.all([req1,req2])
    .then(axios.spread((...responses) =>{
      var dados = responses[0]
      var dados2 = responses[1]
      var obrainfo = dados.data.results.bindings.map(obra => {return {tipo: obra.tip.value, titulo: obra.tit.value} })
      var partsinfo = dados2.data.results.bindings.map(part => {
        var v = ( typeof part.voz === 'undefined' ) ? '' : part.voz.value ;
        var c = ( typeof part.clave === 'undefined' ) ? '' : part.clave.value ;
        return {id: part.part.value, inst: part.inst.value,voz :v, clave:c,path:part.path.value } })
      res.render('single', { id : id, info : obrainfo[0] ,parts : partsinfo});  
    }))
    .catch(erro => res.status(500).jsonp(erro))
  
})


module.exports = router;
