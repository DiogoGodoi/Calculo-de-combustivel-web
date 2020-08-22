const express = require("express");

const app = express();

const bodyparser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/principal", (req, res) => {
  const msg = "Diogo";

  res.render("principal", { msg });
});

app.get("/consumo", (req, res) => {
  res.render("consumo");
});

app.post("/consumo", (req, res) => {
  let { num1, num2 } = req.body;
  let op = req.body.op;
  let resultado = 0;

  switch (op) {
    case "calc":
      resultado = Number(num1) / Number(num2);
      msg = "Quilometros por litro";
      break;
    case "limp":
      num1 = null;
      num2 = null;
      msg = "Km/Litro";
      resultado;
  }
  res.render("consumo", { num1, num2, resultado, msg });
});

app.get("/combustivel", (req, res) => {
  res.render("combustivel");
});

app.post("/combustivel", (req, res) => {
  let { num1, num2 } = req.body;
  let op = req.body.op;
  let resultado = Number(num1) / Number(num2);

  if (op === "calc" && resultado <= 0.69) {
    msg = "Álcool é mais vantajoso";
  } else if (op === "calc" && resultado >= 0.7) {
    msg = "Gasolina é mais vantajosa";
  } else if (op === "limp") {
    num1 = null;
    num2 = null;
    msg = "O que é mais vantajoso ?";
  }

  res.render("combustivel", { num1, num2, resultado, msg });
});

app.post("/percurso", (req, res) => {
  let { num1, num2, num3, op } = req.body;
  let calcular = op;
  let resultado = 0.0;

  switch (calcular) {
    case "calcular":
      resultado = (Number(num1) / Number(num3)) * Number(num2);
      break;
    case "limp":
      num1 = null;
      num2 = null;
      num3 = null;
      resultado;
      break;
    default:
      break;
  }
  res.render("percurso", { num1, num2, num3, resultado });
});

app.get("/percurso", (req, res) => {
  res.render("percurso");
});

app.listen(3000);
