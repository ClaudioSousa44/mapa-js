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

module.exports = {
    preenchendoHeader
}