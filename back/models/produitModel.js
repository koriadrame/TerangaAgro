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

const getProduitById = (id, callback) => {
  const sql = "SELECT * FROM produits WHERE id = ?";

  db.query(sql, [id], callback);
};

const updateProduit = (id, produit, callback) => {
  const sql = `
    UPDATE produits
    SET nom = ?, description = ?, prix = ?, quantite = ?, photo = ?
    WHERE id = ?
  `;

  const values = [
    produit.nom,
    produit.description,
    produit.prix,
    produit.quantite,
    produit.photo,
    id,
  ];

  db.query(sql, values, callback);
};

const deleteProduit = (id, callback) => {
  const sql = "DELETE FROM produits WHERE id = ?";

  db.query(sql, [id], callback);
};

module.exports = {
  createProduit,
  getProduits,
  getProduitById,
  updateProduit,
  deleteProduit,
};