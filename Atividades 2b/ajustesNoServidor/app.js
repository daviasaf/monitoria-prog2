const express = require("express")
const app = express()
const porta = 4000
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")
const rotaResultado = app.route("/resultado")
// Página principal
app.get("/", (req, res) => {
    res.render("index")
})
// Redirecionar para página principal se mexer no query
rotaResultado.get((req, res) => {
    res.redirect("/")
})
//Página de resultado
rotaResultado.post((req, res) => {
    let num1 = Number(req.body.num1)
    let num2 = Number(req.body.num2)
    let opera = req.body.operacao
    let total
    switch (opera) {
        case "+":
            total = num1 + num2
            break;
        case "-":
            total = num1 - num2
            break;
        case "*":
            total = num1 * num2
            break;
        case "/":
            total = num1 / num2
            break;
        default:
            res.render("erro", { msg: "Operação inválida" });
            break;
    }
    res.render("resultado", { total })
})
app.get("/erro", (req, res) => {
    res.render("erro")
})
app.listen(porta, () => {
    console.log(`Rodando na porta http://localhost:${porta}`)
})

