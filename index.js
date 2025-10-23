const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
app.use(cors())

async function conectarAoMongoDB () {
  await mongoose.connect('mongodb+srv://andreiamachion_db_user:mongo1234@cluster0.d7majmq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
}

//atender a uma requisição get oi: http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})

//atender a uma requisição get filmes: http://localhost:3000/filmes
app.get('/filmes', (req, res) => {
    res.send(filmes)
})

//atender a uma requisição post filmes: http://localhost:3000/filmes
app.post('/filmes', (req, res) => {
    //montar o objeto json a partir do body da requisição
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = {titulo: titulo, sinopse: sinopse}
    //insere o filme novo na base, NA MEMÓÓÓRIA
    filmes.push(filme)
    //devolver a lista atualizada para recarregar a página
    res.send(filmes)
})

let filmes = [
  {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse:
      "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.",
  },
  {
    titulo: "Um Sonho de Liberdade",
    sinopse:
      "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela",
  },
];

app.listen(3000, () => {
  try {
    conectarAoMongoDB()
    console.log('server up & running & conexão OK');
  }
  catch (e) {
    console.log ('erro: ' + e)
  }
})