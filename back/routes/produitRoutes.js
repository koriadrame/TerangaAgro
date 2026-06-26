const express = require("express");

const router = express.Router();

const {
  ajouterProduit,
  getProduits,
  getProduitById,
  updateProduit,
  deleteProduit,
} = require("../controllers/produitController");

router.post("/", ajouterProduit);
router.get("/", getProduits);
router.get("/:id", getProduitById);
router.put("/:id", updateProduit);
router.delete("/:id", deleteProduit);

module.exports = router;