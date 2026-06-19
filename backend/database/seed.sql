-- Seed data for TerangaAgro
USE teranga_agro;

-- Regions of Senegal
INSERT INTO region (nom_region, code_iso) VALUES
('Dakar', 'SN-DK'),
('Thiès', 'SN-TH'),
('Saint-Louis', 'SN-SL'),
('Kaolack', 'SN-KA'),
('Ziguinchor', 'SN-ZG'),
('Fatick', 'SN-FK'),
('Louga', 'SN-LG'),
('Tambacounda', 'SN-TC'),
('Kolda', 'SN-KD'),
('Diourbel', 'SN-DB'),
('Matam', 'SN-MT'),
('Kaffrine', 'SN-KF'),
('Kédougou', 'SN-KG'),
('Sédhiou', 'SN-SD');

-- Categories
INSERT INTO categorie (nom_categorie, description, icone) VALUES
('Céréales', 'Produits céréaliers de base', '🌾'),
('Légumes', 'Légumes frais du terroir', '🥦'),
('Fruits', 'Fruits tropicaux et locaux', '🍎'),
('Tubercules', 'Racines et tubercules', '🍠'),
('Légumineuses', 'Haricots, lentilles et autres', '🫘'),
('Oléagineux', 'Graines pour extraction d''huile', '🌻'),
('Produits laitiers', 'Lait, fromage et dérivés', '🥛'),
('Épices', 'Aromates et épices locales', '🌶️');

-- Sub-categories
INSERT INTO categorie (nom_categorie, description, icone, id_parent) VALUES
('Mil', 'Sous-catégorie de céréales', '🌾', (SELECT id_categorie FROM (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Céréales') AS t)),
('Sorgho', 'Sous-catégorie de céréales', '🌾', (SELECT id_categorie FROM (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Céréales') AS t)),
('Maïs', 'Sous-catégorie de céréales', '🌽', (SELECT id_categorie FROM (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Céréales') AS t)),
('Riz', 'Sous-catégorie de céréales', '🍚', (SELECT id_categorie FROM (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Céréales') AS t)),
('Arachide', 'Sous-catégorie d''oléagineux', '🥜', (SELECT id_categorie FROM (SELECT id_categorie FROM categorie WHERE nom_categorie = 'Oléagineux') AS t));
