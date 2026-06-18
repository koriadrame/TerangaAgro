const db = require("../config/db");

const createProduit = (produit, callback) => {
  const sql = `
    INSERT INTO produits (nom, description, prix, quantite, photo)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    produit.nom,
    produit.description,
    produit.prix,
    produit.quantite,
    produit.photo,
  ];

  db.query(sql, values, callback);
};

const getProduits = (callback) => {
  const sql = "SELECT * FROM produits";
  db.query(sql, callback);
};

module.exports = {
  createProduit,
  getProduits,
};