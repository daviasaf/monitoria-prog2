const express = require("express")
const app = express()
const porta = 8080

app.set("view engine", "ejs")
app.set("views", "./views")

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/resultado", (req, res) => {
    let operacao = req.query.operacao
    let num1 = Number(req.query.num1)
    let num2 = Number(req.query.num2)
    let resultado;

    if (operacao === "+") {
        resultado = num1 + num2
    }
    else if (operacao === "-") {
        resultado = num1 - num2
    }
    else if (operacao === "/") {
        resultado = num1 / num2
    }
    else if (operacao === "*") {
        resultado = num1 * num2
    }
    else {
        resultado = "Resultado inváido"
    }
    res.render("resultado", {resultado})
})

app.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
})