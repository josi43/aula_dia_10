const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/env.json");
const filmesRota = require("./routes/filmesRoutes.js");

const app = express();

app.use(express.json());

app.use("/filmes", filmesRota);

mongoose
  .connect(config.url)
  .then(
    app.listen(config.porta, () => {
      console.log("API rodando na porta: ", config.porta);
    })
  )
  .catch((error) => {
    console.log("Deu ruim", error.message);
  });
