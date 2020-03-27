var Personagens = module.exports
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


Personagens.getLista = async function(req){
    var query = `select ?id ?nome where{
        ?id c:éPersonagemDe [].
        ?id c:nome ?nome.
    } group by ?id ?nome` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return normalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Personagens.getPersonagem = async function(id){
    var query = `select ?nome where{
        c:${id} c:éPersonagemDe [].
        c:${id} c:nome ?nome.
    } group by ?nome`
    var queryfilm = `select ?fname where{
        c:${id} c:éPersonagemDe ?film.
        ?film c:name ?fname
    }`

    var encoded = encodeURIComponent(prefixes + query)
    var encodedfilm = encodeURIComponent(prefixes + queryfilm)

    try{
           
        var response = await axios.get(getLink + encoded)
        var responsefilm = await axios.get(getLink + encodedfilm)

        var personagem = {personagem:normalize(response.data)}
        var film = {film:normalize(responsefilm.data)}

        var output = {}

        output = jsonConcat(output,personagem)
        output = jsonConcat(output,film)


        return output
    }
    catch(e){
        throw(e)
    } 
}

