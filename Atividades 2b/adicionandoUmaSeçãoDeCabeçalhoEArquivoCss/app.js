const express = require("express")
const app = express()
const porta = 4000
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/resultado",(req,res)=>{
    res.redirect("/")
})

app.post("/resultado", (req, res) => {
    let num1 = Number(req.body.num1)
    let num2 = Number(req.body.num2)
    let opera = req.body.operacao
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

