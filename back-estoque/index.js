import express from 'express'

const app = express()

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.setDefaultEncoding('Olá, Mundo!')
})

app.listen(8000, () => {
    console.log('Aplicação iniciada com sucesso!')
})