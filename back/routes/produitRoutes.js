const express = require("express");

const router = express.Router();

const {
  ajouterProduit,
  getProduits,
  getProduitById,
} = require("../controllers/produitController");

router.post("/", ajouterProduit);
router.get("/", getProduits);
router.get("/:id", getProduitById);

module.exports = router;