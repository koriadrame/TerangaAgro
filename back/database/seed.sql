-- Données de test pour TerangaAgro
USE teranga_agro;

-- Insertion d'utilisateurs de base
INSERT INTO Utilisateur (nom, prenom, email, telephone, motDePasse, adress) VALUES
('Sarr', 'Abdoulaye', 'abdoulaye.sarr@email.com', '+221 77 123 45 67', 'password123', 'Dakar, Plateau'),
('Diop', 'Aminata', 'aminata.diop@email.com', '+221 78 234 56 78', 'password123', 'Saint-Louis, Sor'),
('Faye', 'Moussa', 'moussa.faye@email.com', '+221 76 345 67 89', 'password123', 'Thiès, Cité Lamy'),
('Ndiaye', 'Fatou', 'fatou.ndiaye@email.com', '+221 70 456 78 90', 'password123', 'Kaolack, Medina');

-- Spécialisation des utilisateurs
INSERT INTO Producteur (cooperative, localisation, descriptionFerme, idUtilisateur) VALUES
('Coopérative des Maraîchers', 'Niayes', 'Production de carottes et d\'oignons de haute qualité.', 1);

INSERT INTO Consommateur (historiqueAchats, idUtilisateur) VALUES
('Première commande effectuée en Juin 2026', 2);

INSERT INTO Livreur (zoneLivraison, disponibilite, idUtilisateur) VALUES
('Dakar et Banlieue', TRUE, 3);

INSERT INTO Administrateur (permission, niveauAcces, idUtilisateur) VALUES
('Super Admin', 10, 4);

-- Stock
INSERT INTO Stock (quantiteDisponible, seuilAlerte) VALUES
(100, 10),
(50, 5);

-- Produits
INSERT INTO Produit (nom, description, categorie, prix, quantiteStock, image, idStock, idProducteur) VALUES
('Carottes Bio', 'Carottes fraîches récoltées quotidiennement.', 'Légumes', 500.00, 100, 'carottes.jpg', 1, 1),
('Oignons Jaunes', 'Oignons secs parfaits pour la conservation.', 'Légumes', 800.00, 50, 'oignons.jpg', 2, 1);

-- Panier pour le consommateur
INSERT INTO Panier (totalPanier) VALUES (0.00);
UPDATE Consommateur SET idPanier = 1 WHERE idConsommateur = 1;

-- Avis
INSERT INTO Avis (note, commentaire, idProduit) VALUES
(5, 'Excellentes carottes, vraiment fraîches !', 1),
(4, 'Bonne qualité d\'oignons.', 2);

-- Formations
INSERT INTO FormationAgricole (titre, description, typeContenu, niveau, lienContenu, idAdministrateur) VALUES
('Techniques de maraîchage', 'Cours complet sur la culture maraîchère au Sénégal.', 'Vidéo', 'Débutant', 'https://youtube.com/terangaagro/maraichage', 1);
