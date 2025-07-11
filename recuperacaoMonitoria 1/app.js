const express = require("express")
const app = express()
const porta = 4000

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/resultado", (req, res) => {
    let num1 = Number(req.query.num1)
    let num2 = Number(req.query.num2)
    let opera = req.query.operacao
    let total
    if (opera == "+") {
        total = num1 + num2
    }
    else if (opera == "-") {
        total = num1 - num2
    }
    else if (opera == "*") {
        total = num1 * num2
    }
    else if (opera == "/") {
        total = num1 / num2
    }
    res.render("resultado",{total})
})

app.listen(porta,()=>{
    console.log(`Rodando na porta http://localhost:${porta}`)
})

