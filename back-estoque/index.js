import express from 'express'
import database from './config/database.js'
import router from './routers/router.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'


const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// Este código testa de forma momentânea a conexão com o banco de dados, se a conexão for bem estabelecida, logo em seguida comente as linhas de código, por que "database.destroy()" encerra a conexão logo em seguida, então você nunca irá conseguir interagir com o database com este código não comentado.
// database.raw('SELECT 1').then(() => {
//     console.log('Conexão com banco de dados estabelecida!')
//     database.destroy()
// }).catch(() => {
//     console.log('Error ao se conectar com o banco de dados!')
//     database.destroy()
// })

app.use(cookieParser())
app.use(router)


app.listen(8000, () => {
    console.log('Aplicação iniciada com sucesso!')
})