const express = require("express");

const router = express.Router();

const {
  ajouterProduit,
  getProduits,
} = require("../controllers/produitController");

router.post("/", ajouterProduit);
router.get("/", getProduits);

module.exports = router;