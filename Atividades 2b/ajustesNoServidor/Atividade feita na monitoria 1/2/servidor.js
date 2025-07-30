const express = require("express")
const app = express()
const porta = 8080
const rotaResultado = app.route("/resultado")

app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", "./views")

app.get("/", (req, res) => {
    res.render("index")
})

rotaResultado.get((req,res)=>{
    res.redirect("/")
})

rotaResultado.post((req, res) => {
    let operacao = req.body.operacao
    let num1 = Number(req.body.num1)
    let num2 = Number(req.body.num2)
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
    else{
        res.render("/erro")
    }
    res.render("resultado", {resultado})
})

app.listen(porta, () => {
    console.log(`http://localhost:${porta}`)
})