const express = require("express")
const app = express();
const porta = 3000

app.set("view engine","ejs") 

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/saudacao",(req,res)=>{
    let nome = req.query.nome
    let numero = Number(req.query.num)
    let dobro = numero*2
    res.render("saudacao",{nome,numero,dobro})
})

app.listen(porta,()=>{
    console.log(`Aplicação rodando na porta http://localhost:${porta}`)
})