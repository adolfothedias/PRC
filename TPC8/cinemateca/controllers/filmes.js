var Filmes = module.exports
const axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query=" 

function normalize(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
};

function jsonConcat(o1, o2) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
   }

Filmes.getLista = async function(req){
    var query = `select ?f ?titulo ?duracao ?data ?lingua ?pais ?realizador ?rnome where {
        ?f a c:Filme .
        ?f c:título ?titulo .
        ?f c:duração ?duracao .
        ?f c:dataLançamento ?data .
        ?f c:temLíngua ?l .
        bind(strafter(str(?l),"cinema#") as ?lingua) .
        filter(?lingua = 'English') .
        ?f c:temPaísOrigem ?p . 
        bind(replace(strafter(str(?p),"cinema#"),"_"," ") as ?pais) .
        ?f c:temRealizador ?realizador .
        ?realizador c:nome ?rnome .
    } ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Filmes.getFilm = async function(id){
    var query = `select ?titulo ?duracao ?data ?lingua ?pais ?realizador ?rnome where {
        c:${id} a c:Filme .
        c:${id} c:título ?titulo .
        c:${id} c:duração ?duracao .
        c:${id} c:dataLançamento ?data .
        c:${id} c:temLíngua ?l .
        bind(strafter(str(?l),"cinema#") as ?lingua) .
        filter(?lingua = 'English') .
        c:${id} c:temPaísOrigem ?p . 
        bind(replace(strafter(str(?p),"cinema#"),"_"," ") as ?pais) .
        c:${id} c:temRealizador ?realizador .
        ?realizador c:nome ?rnome .
    } `
    var queryprodutor = `select ?nome ?sexo where{
        ?p c:produziu c:${id}.
        ?p c:nome ?nome.
        OPTIONAL{
            ?p c:sexo ?sexo
        }      
    } `

    var queryator = `select ?nome ?sexo where{
        ?a c:atuou c:${id}.
        ?a c:nome ?nome.
        OPTIONAL{
            ?a c:sexo ?sexo
        }
    }`

    var querygenero = ` select ?genero where{
        c:${id} c:temGénero ?g.
        ?g c:nome ?genero
    }`

    var querypersonagem = ` select ?pnome where{
        c:${id} c:éPersonagemDe ?p.
        ?p c:nome ?pnome
    }`


    var encoded = encodeURIComponent(prefixes + query)
    var encodedprodutor = encodeURIComponent(prefixes + queryprodutor)
    var encodedator = encodeURIComponent(prefixes + queryator)
    var encodedgenero = encodeURIComponent(prefixes + querygenero)
    var encodedpersonagem = encodeURIComponent(prefixes + querypersonagem)

    try{
           
        var output = {};
        var response = await axios.get(getLink + encoded)
        var responseprodutor = await axios.get(getLink + encodedprodutor)
        var responseator = await axios.get(getLink + encodedator)
        var responsegenero = await axios.get(getLink + encodedgenero)
        var responsepersonagem = await axios.get(getLink + encodedpersonagem)
        var filme = {filme:normalize(response.data)}
        var produtor = {produtor:normalize(responseprodutor.data)}
        var ator = {ator:normalize(responseator.data)}
        var genero = {genero:normalize(responsegenero.data)}
        var personagem = {personagem:normalize(responsepersonagem.data)}
        
        output = jsonConcat(output,filme)
        output = jsonConcat(output,produtor)
        output = jsonConcat(output,ator)
        output = jsonConcat(output,genero)
        output = jsonConcat(output,personagem)

        return output
    }
    catch(e){
        throw(e)
    } 
}

