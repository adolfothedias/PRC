var actor = []
var book = []
var composer = []
var country = []
var director = []
var film = []
var language = []

// ["actor", "name", "gender"] 
var a = require('./actor.json')
//  ["movie", "book"] 
var b = require('./book.json')
// ["film", "composer", "name", "gender"] 
var c = require('./composer.json')
// ["film", "director", "name", "gender"]
var d = require('./director.json')
// ["film", "name","country", "language", "genre"] 
var f = require('./films.json')

function createObjects(){
    actor = a.results.bindings.map(act => {
        let _id = act.actor.value
        let _name = act.name.value
        let _gender = act.gender.value
        return {id:_id,name:_name,gender:_gender}
    })
    book = b.results.bindings.map(bk =>{
        let _movie = bk.movie.value
        let _book = bk.book.value
        let _namebook = bk.namebook.value
        return{movie:_movie,book:_book,namebook:_namebook}
    })
    composer = c.results.bindings.map(cm =>{
        let _film = cm.film.value
        let _composer = cm.composer.value 
        let _name = cm.name.value
        let _gender = cm.gender.value
        return{film:_film , composer:_composer, name:_name , _gender: _gender}
    })
    director = d.results.bindings.map(dr =>{
        let _film = dr.film.value
        let _director = dr.director.value
        let _name = dr.name.value
        let _gender = dr.gender.value
        return{film:_film,director:_director,name:_name,gender:_gender}
    })
    film = f.results.bindings.map(fl =>{
        let _film = fl.film.value
        let _name = fl.name.value
        let _country = fl.hasOwnProperty('country') ?  fl.country.value : 'not specified'
        let _language = fl.hasOwnProperty('language') ?  fl.language.value : 'not specified'
        let _genre = fl.genre.value
        return{film:_film,name:_name,country:_country,language:_language,genre:_genre}
    })
}

function createCL (){
    film.map(fl =>{
        if(fl.country !='not specified' && fl.language !='not specified'){
            let newItem = {country:fl.country,language:fl.language}
            if(!country.find(o => o.country === fl.country && o.language === fl.language))
                country.push(newItem)
        }
    })
    country.map(cn =>{
        // var nome = cn.language.match(/(?<=http:\/\/dbpedia.org\/resource\/).*?(?=\s*_\(?language\)?)/gs);
        // if(nome != null && language.indexOf(nome[0]) === -1)
        //     language.push(nome[0])
        if(language.indexOf(cn.language) === -1)
             language.push(cn.language)
    })
}

// Povoamento não tem filmes para os autores
// function fillfilms (){
//     film.map(fl =>{
//         fl.actors = []
//         actor.map(ac =>{
//             if (fl.film == ac.film)
//                 fl.actors.push(ac.id)
//         })
//     })
//     console.log(film)
// }

function printActor (name,gender){
    return `###  http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}> rdf:type owl:NamedIndividual ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#Ator> ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${gender == 'male' ? 'AtorMasculino' : 'AtorFeminino'}> ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#Pessoa> ;
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#sexo> "${gender == 'male' ? 'M' : 'F'}" .`
}

function printCountry (name){
    return `###  http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}> rdf:type owl:NamedIndividual ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#País> .`
}

function printLanguage (name){
    return `###  http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}> rdf:type owl:NamedIndividual ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#Língua> .`
}

function printDirector (name,gender){
    return `###  http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}> rdf:type owl:NamedIndividual ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#Pessoa> ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#Realizador> ;
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#sexo> "${gender == 'male' ? 'M' : 'F'}" .`
}

function printComposer (name,gender){
    return `###  http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}> rdf:type owl:NamedIndividual ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#Pessoa> ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#Compositor> ;
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#sexo> "${gender == 'male' ? 'M' : 'F'}" .`
}

function printFilm (name,nfname){
    return `###  http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#${name}> rdf:type owl:NamedIndividual ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#FIlme> ,
    <http://www.semanticweb.org/carlos/ontologies/2020/2/aula7#titulo> "${nfname}" .`
}


function printAll(){
    actor.map(ac =>{
        console.log(printActor(ac.name.replace(" ","_"),ac.gender))
    })
    composer.map(cm =>{
        console.log(printComposer(cm.name.replace(" ","_"),cm.gender))
    })
    director.map(dr =>{
        console.log(printDirector(dr.name.replace(" ","_"),dr.gender))
    })
    country.map(cn =>{
        console.log(printCountry(cn.country.replace(" ","_")))
    })
    language.map(la =>{
        console.log(printLanguage(la.replace(" ","_")))
    })
    film.map(fl =>{
        console.log(printFilm(fl.name.replace(" ","_"),fl.name))
    })
}

createObjects()
createCL()
// fillfilms()
printAll()