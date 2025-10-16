const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndPoint = '/filmes'

async function obtemFilmes() {
    //console.log('teste');
    const URLcompleta = `${protocolo}${baseURL}${filmesEndPoint}`

    const filmes = (await axios.get(URLcompleta)).data
    console.log(filmes);
    
}