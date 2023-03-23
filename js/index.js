'use strict'

// const func = require('./dadosPaises.js')

const mapa = document.querySelector('svg')

const getEstados = (event) => {
    const estado = event.target.id.replace('BR-', '')
    preencherDados(estado)
}

const preencherDados = async (sigla) => {
    const preencher1 = await preenchendoHeader(sigla)
    document.getElementById('name').innerText = preencher1.nome
    document.getElementById('sigla').innerText = preencher1.siglaEstado
    document.getElementById('regiao').innerText = preencher1.regiao
    document.getElementById('capital').innerText = preencher1.capital

    const preencher2 = await preencherMain(sigla)

    const cidades = preencher2.cidade.map( (cidade) => {
        const li = document.createElement('li')
        li.textContent = cidade
        return li
    } )

    document.getElementById('cidades').replaceChildren(...cidades)


    // preencher2.cidade.forEach( (cidade) => {  
    //     const cidades = document.createElement('li')
    //     cidades.textContent = cidade
    //     const list = document.getElementById('cidades');
    //     console.log (cidades)
    //     list.replaceChildren(cidades)
    // });
    
}

const preenchendoHeader = async (sigla) => {
    const url = `http://localhost:8080/estado/${sigla}`
    const response = await fetch(url)
    const dados = await response.json()
    return{
        siglaEstado : dados.uf,
        nome : dados.descricao,
        capital : dados.capital,
        regiao : dados.regiao 
    }
}

const preencherMain = async (sigla) => {
    const url = `http://localhost:8080/cidadeestado/${sigla}`
    const response = await fetch(url)
    const dados = await response.json()
    return{
        cidade: dados.cidades
    }
}


mapa.addEventListener('click', getEstados)

