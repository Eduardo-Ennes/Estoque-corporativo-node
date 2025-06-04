import express from 'express'
import database from './config/database.js'

const app = express()

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Teste de conexão com o banco de dados
database.raw('SELECT 1').then(() => {
    console.log('Conexão com banco de dados estabelecida!')
    database.destroy()
}).catch(() => {
    console.log('Error ao se conectar com o banco de dados!')
    database.destroy()
})

app.get('/', (req, res) => {
    res.setDefaultEncoding('Olá, Mundo!')
})

app.listen(8000, () => {
    console.log('Aplicação iniciada com sucesso!')
})