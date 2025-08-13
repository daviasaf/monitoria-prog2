const express = require("express");
const app = express();
const fs = require("fs"); // Importação do módulo de callbacks
const porta = 7070;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/registros", (req, res) => {
  let userForDelete = req.query.userForDelete;
  fs.unlink(`database/${userForDelete}.txt`, (err) => {
    if (err) {
      console.error("Erro ao apagar arquivo:", err);
    }
    fs.readdir("database", (err, arquivos) => {
      if (err) {
        console.error("Erro ao ler a pasta:", err);
        return res.status(500).send("Erro interno do servidor.");
      }
      let arquivosFiltrado = arquivos.filter((arquivo) => {
        return arquivo !== userForDelete + ".txt";
      });
      res.render("registros", { arquivosFiltrado, userForDelete });
    });
  });
});
app.get("/registrandoDados", (req, res) => {
  res.redirect("/");
});

app.get("/deletarUsuarios", (req, res) => {
  res.render("deletarUsuarios");
});

app.post("/registrandoDados", (req, res) => {
  let { name, username, password, email, course } = req.body;
  const dadosConvertidos = JSON.stringify([
    name,
    username,
    password,
    email,
    course,
  ]);
  escreverArquivo(dadosConvertidos, name);
  res.redirect("/");
});

function escreverArquivo(dados, nome) {
  const caminhoCompleto = `database/${nome}.txt`;
  fs.writeFile(caminhoCompleto, dados, "utf8", (err) => {
    if (err) {
      console.error("Erro ao criar arquivo:", err);
      return;
    }
    console.log("Arquivo criado corretamente");
  });
}

app.listen(porta, () => {
  console.log(`Rodando na porta http://localhost:${porta}`);
});
