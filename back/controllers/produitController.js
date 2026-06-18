const produitModel = require("../models/produitModel");

const ajouterProduit = (req, res) => {
  produitModel.createProduit(req.body, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Erreur lors de l'ajout du produit",
      });
    }

    res.status(201).json({
      message: "Produit ajouté avec succès",
      id: result.insertId,
    });
  });
};



const getProduits = (req, res) => {
  produitModel.getProduits((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Erreur lors de la récupération"
      });
    }
    res.status(200).json(result);
  });
};

module.exports = {
  ajouterProduit,
  getProduits,
};