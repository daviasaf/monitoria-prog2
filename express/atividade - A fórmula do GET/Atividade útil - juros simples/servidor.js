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
    let capital = Number(req.query.capital)
    let taxa = Number(req.query.taxa)
    let tempo = Number(req.query.tempo)
    let juros = capital*taxa*tempo
    res.render('resultado', { 
        capital: capital,
        taxa: taxa,
        tempo: tempo,
        juros: juros
    });
})
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})