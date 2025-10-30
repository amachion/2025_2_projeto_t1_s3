const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

const stringConexaoBD = process.env.CONEXAO_BD

//função de conexão com o banco
async function conectarAoMongoDB () {
  await mongoose.connect(stringConexaoBD)
}

const Filme = mongoose.model ("Filme", mongoose.Schema({
  titulo: {type: String}, 
  sinopse: {type: String}
}))

//endpoint para atender um get filmes: http://localhost:3000/filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

//cadastrar um novo filme: post filmes: http://localhost:3000/filmes
app.post('/filmes', async (req, res) => {
    //capturar as informações do usuário
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //construir um objeto filme da classe Filme
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    //salvar o filme no banco
    await filme.save()
    //buscar no banco a base atualizada
    const filmes = await Filme.find()
    res.json(filmes)
})

app.listen(3000, () => {
    try {
      conectarAoMongoDB()
      console.log('server up & running & conexão ok')
    }
    catch (e) {
      console.log("erro:" + e)
    }
})