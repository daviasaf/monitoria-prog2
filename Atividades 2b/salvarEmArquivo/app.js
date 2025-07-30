const express = require("express");
const app = express();
const fs = require("fs");
const porta = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/recebido", (req, res) => {
  res.redirect("/");
});

app.post("/recebido", (req, res) => {
  
  let { nome, email, senha, curso, idade } = req.body;

  const dadosDoFormulario = {
    nome: nome,
    email: email,
    senha: senha,
    curso: curso,
    idade: idade,
  };

  const dadosConvertidos = JSON.stringify(dadosDoFormulario) + "\n";
  fs.appendFile("bancoDados.txt", dadosConvertidos, (err) => {
    if (err) {
      console.error("Erro ao salvar os dados no arquivo:", err);
    }
    console.log("Dados salvos com sucesso!");
    res.render("recebido");
  });
});

app.listen(porta, () => {
  console.log(`Rodando na porta https://localhost:${porta}`);
});
