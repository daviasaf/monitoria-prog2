//Servidor
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('conta')
})
app.get('/resultado', (req, res) => {
    let n1 = Number(req.query.num1)
    let n2 = Number(req.query.num2)
    let total = n1+n2
    res.render('resultado', {total})
})
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})