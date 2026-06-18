require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./config/db");
const produitRoutes = require("./routes/produitRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/produits", produitRoutes);

app.get("/", (req, res) => {
  res.send("Backend TerangaAgro fonctionne !");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});