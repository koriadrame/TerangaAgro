-- Schema for TerangaAgro
-- Database: teranga_agro
-- Moteur: InnoDB, Charset: utf8mb4, Collation: utf8mb4_unicode_ci

CREATE DATABASE IF NOT EXISTS teranga_agro;
USE teranga_agro;

-- 1. Region
CREATE TABLE IF NOT EXISTS region (
    id_region INT AUTO_INCREMENT PRIMARY KEY,
    nom_region VARCHAR(100) NOT NULL UNIQUE,
    code_iso CHAR(5) UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Utilisateur
CREATE TABLE IF NOT EXISTS utilisateur (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(80) NOT NULL,
    prenom VARCHAR(80),
    email VARCHAR(150) NOT NULL UNIQUE,
    telephone VARCHAR(20) UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    role ENUM('producteur', 'acheteur', 'admin') NOT NULL DEFAULT 'acheteur',
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_region INT,
    statut_compte ENUM('actif', 'suspendu', 'en_attente') DEFAULT 'en_attente',
    photo_profil VARCHAR(255),
    CONSTRAINT fk_utilisateur_region FOREIGN KEY (id_region) REFERENCES region(id_region) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Profil Producteur (Specialization IS-A of utilisateur)
CREATE TABLE IF NOT EXISTS profil_producteur (
    id_producteur INT PRIMARY KEY,
    ninea VARCHAR(20) UNIQUE,
    superficie_ha DECIMAL(8,2),
    type_agriculture ENUM('bio', 'conventionnel', 'mixte'),
    coordonnees_gps POINT,
    description_exploitation TEXT,
    date_certification DATE,
    documents_url VARCHAR(255),
    CONSTRAINT fk_profil_producteur_utilisateur FOREIGN KEY (id_producteur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Categorie (Self-referenced for hierarchy)
CREATE TABLE IF NOT EXISTS categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom_categorie VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icone VARCHAR(10),
    id_parent INT,
    CONSTRAINT fk_categorie_parent FOREIGN KEY (id_parent) REFERENCES categorie(id_categorie) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Produit
CREATE TABLE IF NOT EXISTS produit (
    id_produit INT AUTO_INCREMENT PRIMARY KEY,
    nom_produit VARCHAR(150) NOT NULL,
    description TEXT,
    prix_unitaire DECIMAL(12,2) NOT NULL CHECK (prix_unitaire > 0),
    unite_mesure VARCHAR(20) DEFAULT 'kg',
    quantite_dispo DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (quantite_dispo >= 0),
    id_categorie INT NOT NULL,
    id_producteur INT NOT NULL,
    date_recolte DATE,
    image_url VARCHAR(255),
    statut_produit ENUM('disponible', 'rupture', 'archive') DEFAULT 'disponible',
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_produit_categorie FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie) ON DELETE RESTRICT,
    CONSTRAINT fk_produit_producteur FOREIGN KEY (id_producteur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Commande
CREATE TABLE IF NOT EXISTS commande (
    id_commande INT AUTO_INCREMENT PRIMARY KEY,
    id_acheteur INT NOT NULL,
    date_commande DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'confirmee', 'expediee', 'livree', 'annulee') DEFAULT 'en_attente',
    montant_total DECIMAL(14,2),
    adresse_livraison TEXT,
    date_livraison_prev DATE,
    CONSTRAINT fk_commande_acheteur FOREIGN KEY (id_acheteur) REFERENCES utilisateur(id_utilisateur) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Ligne Commande (Many-to-Many Commande x Produit)
CREATE TABLE IF NOT EXISTS ligne_commande (
    id_commande INT NOT NULL,
    id_produit INT NOT NULL,
    quantite DECIMAL(10,2) NOT NULL CHECK (quantite > 0),
    prix_unitaire_cmd DECIMAL(12,2) NOT NULL,
    sous_total DECIMAL(14,2) AS (quantite * prix_unitaire_cmd) STORED,
    PRIMARY KEY (id_commande, id_produit),
    CONSTRAINT fk_ligne_commande_commande FOREIGN KEY (id_commande) REFERENCES commande(id_commande) ON DELETE CASCADE,
    CONSTRAINT fk_ligne_commande_produit FOREIGN KEY (id_produit) REFERENCES produit(id_produit) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Paiement
CREATE TABLE IF NOT EXISTS paiement (
    id_paiement INT AUTO_INCREMENT PRIMARY KEY,
    id_commande INT UNIQUE,
    mode_paiement ENUM('wave', 'orange_money', 'free_money', 'virement', 'especes') NOT NULL,
    montant DECIMAL(14,2) NOT NULL CHECK (montant > 0),
    statut_paiement ENUM('en_attente', 'valide', 'rejete', 'rembourse') DEFAULT 'en_attente',
    ref_transaction VARCHAR(100) UNIQUE,
    date_paiement DATETIME,
    CONSTRAINT fk_paiement_commande FOREIGN KEY (id_commande) REFERENCES commande(id_commande) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Livraison
CREATE TABLE IF NOT EXISTS livraison (
    id_livraison INT AUTO_INCREMENT PRIMARY KEY,
    id_commande INT UNIQUE,
    livreur_nom VARCHAR(100),
    livreur_telephone VARCHAR(20),
    statut_livraison ENUM('en_preparation', 'en_route', 'livre', 'echec') DEFAULT 'en_preparation',
    date_livraison_eff DATETIME,
    localisation_gps POINT,
    CONSTRAINT fk_livraison_commande FOREIGN KEY (id_commande) REFERENCES commande(id_commande) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Avis
CREATE TABLE IF NOT EXISTS avis (
    id_avis INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    id_produit INT NOT NULL,
    note TINYINT NOT NULL CHECK (note BETWEEN 1 AND 5),
    commentaire TEXT,
    date_avis DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (id_utilisateur, id_produit),
    CONSTRAINT fk_avis_utilisateur FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE,
    CONSTRAINT fk_avis_produit FOREIGN KEY (id_produit) REFERENCES produit(id_produit) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes for performance
CREATE INDEX idx_produit_categorie ON produit(id_categorie);
CREATE INDEX idx_produit_producteur ON produit(id_producteur);
CREATE INDEX idx_commande_acheteur ON commande(id_acheteur);
CREATE INDEX idx_commande_statut ON commande(statut);
CREATE INDEX idx_commande_date ON commande(date_commande);

-- Trigger to verify producer role before product insertion
DELIMITER //
CREATE TRIGGER before_insert_produit
BEFORE INSERT ON produit
FOR EACH ROW
BEGIN
    DECLARE v_role VARCHAR(20);
    SELECT role INTO v_role FROM utilisateur WHERE id_utilisateur = NEW.id_producteur;
    IF v_role != 'producteur' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: The producer must have the role "producteur".';
    END IF;
END;
//
DELIMITER ;
