-- Schema pour la base de données TerangaAgro
-- Adapté à partir du diagramme fourni

DROP DATABASE IF EXISTS teranga_agro;
CREATE DATABASE teranga_agro;
USE teranga_agro;

-- Table: Utilisateur
CREATE TABLE IF NOT EXISTS Utilisateur (
    idUtilisateur INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    motDePasse VARCHAR(255) NOT NULL,
    adress TEXT
) ENGINE=InnoDB;

-- Table: Panier
CREATE TABLE IF NOT EXISTS Panier (
    idPanier INT PRIMARY KEY AUTO_INCREMENT,
    totalPanier DECIMAL(10, 2) DEFAULT 0.00
) ENGINE=InnoDB;

-- Table: Producteur
CREATE TABLE IF NOT EXISTS Producteur (
    idProducteur INT PRIMARY KEY AUTO_INCREMENT,
    cooperative VARCHAR(150),
    localisation VARCHAR(150),
    descriptionFerme TEXT,
    idUtilisateur INT NOT NULL,
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Consommateur
CREATE TABLE IF NOT EXISTS Consommateur (
    idConsommateur INT PRIMARY KEY AUTO_INCREMENT,
    historiqueAchats TEXT,
    panier TEXT, -- Note: redundant field from diagram
    idPanier INT,
    idUtilisateur INT NOT NULL,
    FOREIGN KEY (idPanier) REFERENCES Panier(idPanier) ON DELETE SET NULL,
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Livreur
CREATE TABLE IF NOT EXISTS Livreur (
    idLivreur INT PRIMARY KEY AUTO_INCREMENT,
    zoneLivraison VARCHAR(150),
    disponibilite BOOLEAN DEFAULT TRUE,
    idUtilisateur INT NOT NULL,
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Administrateur
CREATE TABLE IF NOT EXISTS Administrateur (
    idAdministrateur INT PRIMARY KEY AUTO_INCREMENT,
    permission VARCHAR(100),
    niveauAcces INT,
    idUtilisateur INT NOT NULL,
    FOREIGN KEY (idUtilisateur) REFERENCES Utilisateur(idUtilisateur) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Stock
CREATE TABLE IF NOT EXISTS Stock (
    idStock INT PRIMARY KEY AUTO_INCREMENT,
    quantiteDisponible INT DEFAULT 0,
    seuilAlerte INT DEFAULT 5
) ENGINE=InnoDB;

-- Table: Produit
CREATE TABLE IF NOT EXISTS Produit (
    idProduit INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(150) NOT NULL,
    description TEXT,
    categorie VARCHAR(100),
    prix DECIMAL(10, 2) NOT NULL,
    quantiteStock INT DEFAULT 0,
    image VARCHAR(255),
    statutValidation VARCHAR(50) DEFAULT 'En attente',
    idStock INT,
    idProducteur INT NOT NULL,
    FOREIGN KEY (idStock) REFERENCES Stock(idStock) ON DELETE SET NULL,
    FOREIGN KEY (idProducteur) REFERENCES Producteur(idProducteur) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Ajouter (Table associative Panier <-> Produit)
CREATE TABLE IF NOT EXISTS Ajouter (
    idPanier INT NOT NULL,
    idProduit INT NOT NULL,
    quantite INT NOT NULL DEFAULT 1,
    PRIMARY KEY (idPanier, idProduit),
    FOREIGN KEY (idPanier) REFERENCES Panier(idPanier) ON DELETE CASCADE,
    FOREIGN KEY (idProduit) REFERENCES Produit(idProduit) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Avis
CREATE TABLE IF NOT EXISTS Avis (
    idAvis INT PRIMARY KEY AUTO_INCREMENT,
    note INT CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    dateAvis DATETIME DEFAULT CURRENT_TIMESTAMP,
    idProduit INT NOT NULL,
    FOREIGN KEY (idProduit) REFERENCES Produit(idProduit) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Commande
CREATE TABLE IF NOT EXISTS Commande (
    idCommande INT PRIMARY KEY AUTO_INCREMENT,
    dateCommande DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(50) DEFAULT 'En cours',
    montantCommande DECIMAL(10, 2) NOT NULL,
    idConsommateur INT NOT NULL,
    FOREIGN KEY (idConsommateur) REFERENCES Consommateur(idConsommateur) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Contenir (Table associative Commande <-> Produit)
CREATE TABLE IF NOT EXISTS Contenir (
    idCommande INT NOT NULL,
    idProduit INT NOT NULL,
    quantite INT NOT NULL DEFAULT 1,
    prixUnitaire DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (idCommande, idProduit),
    FOREIGN KEY (idCommande) REFERENCES Commande(idCommande) ON DELETE CASCADE,
    FOREIGN KEY (idProduit) REFERENCES Produit(idProduit) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Paiement
CREATE TABLE IF NOT EXISTS Paiement (
    idPaiement INT PRIMARY KEY AUTO_INCREMENT,
    modePaiement VARCHAR(50),
    statutPaiement VARCHAR(50),
    datePaiement DATETIME DEFAULT CURRENT_TIMESTAMP,
    montant DECIMAL(10, 2) NOT NULL,
    idCommande INT NOT NULL,
    FOREIGN KEY (idCommande) REFERENCES Commande(idCommande) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: Livraison
CREATE TABLE IF NOT EXISTS Livraison (
    idLivraison INT PRIMARY KEY AUTO_INCREMENT,
    modeleLivraison VARCHAR(100),
    adressLivraison TEXT,
    dateLivraison DATETIME,
    statutLivraison VARCHAR(50),
    idLivreur INT,
    idCommande INT NOT NULL,
    FOREIGN KEY (idLivreur) REFERENCES Livreur(idLivreur) ON DELETE SET NULL,
    FOREIGN KEY (idCommande) REFERENCES Commande(idCommande) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table: FormationAgricole
CREATE TABLE IF NOT EXISTS FormationAgricole (
    idFormation INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(200) NOT NULL,
    description TEXT,
    typeContenu VARCHAR(50),
    niveau VARCHAR(50),
    lienContenu VARCHAR(255),
    idAdministrateur INT NOT NULL,
    FOREIGN KEY (idAdministrateur) REFERENCES Administrateur(idAdministrateur) ON DELETE CASCADE
) ENGINE=InnoDB;
