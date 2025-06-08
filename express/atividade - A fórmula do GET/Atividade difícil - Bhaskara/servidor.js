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

    let a = Number(req.query.a)
    let b = Number(req.query.b)
    let c = Number(req.query.c)
    let delta = (b**2) - (4*a*c)
    let mensagem, x1, x2;
    if(delta<0){
        mensagem = "Não há raízes reais"
    }
    else if(delta===0){
        mensagem = "Existe apenas uma raiz real."
        x1 = (-b + Math.sqrt(delta))/(2*a)
        x2 = x1
    }
    else{
        mensagem = "existem duas raízes reais."
        x1 = (-b + Math.sqrt(delta))/(2*a)
        x2 = (-b - Math.sqrt(delta))/(2*a)
    }
    res.render('resultado', {
        a:a,
        b:b,
        c:c,
        mensagem:mensagem,
        x1:x1,
        x2:x2
    })
})
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})