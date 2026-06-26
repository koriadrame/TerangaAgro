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

const getProduitById = (req, res) => {
  const id = req.params.id;

  produitModel.getProduitById(id, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Erreur lors de la récupération du produit",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }

    res.status(200).json(result[0]);
  });
};

const updateProduit = (req, res) => {
  const id = req.params.id;

  produitModel.updateProduit(id, req.body, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Erreur lors de la modification",
      });
    }

    res.status(200).json({
      message: "Produit modifié avec succès",
    });
  });
};

const deleteProduit = (req, res) => {
  const id = req.params.id;

  produitModel.deleteProduit(id, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Erreur lors de la suppression",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }

    res.status(200).json({
      message: "Produit supprimé avec succès",
    });
  });
};

module.exports = {
  ajouterProduit,
  getProduits,
  getProduitById,
  updateProduit,
  deleteProduit,
};