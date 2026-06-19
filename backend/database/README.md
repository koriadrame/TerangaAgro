# Configuration de la Base de Données - TerangaAgro

Ce dossier contient le schéma SQL et les données de référence (seed) pour la plateforme.

## 1. Installation de la Base de Données (MySQL)

1. Connectez-vous à votre serveur MySQL (ex: via phpMyAdmin ou CLI).
2. Exécutez le fichier `backend/database/schema.sql` pour créer les tables et les triggers.
3. Exécutez le fichier `backend/database/seed.sql` pour insérer les régions du Sénégal et les catégories initiales.

```bash
# Exemple via CLI
mysql -u root -p < backend/database/schema.sql
mysql -u root -p < backend/database/seed.sql
```

## Structure des Tables (10)
- `region` : Les 14 régions du Sénégal.
- `utilisateur` : Clients, Producteurs et Admins.
- `profil_producteur` : Détails spécifiques aux agriculteurs.
- `categorie` : Hiérarchie des types de produits.
- `produit` : Offres des producteurs.
- `commande` : Gestion des achats.
- `ligne_commande` : Détails des produits par commande.
- `paiement` : Historique des transactions (Wave, OM, etc.).
- `livraison` : Suivi des livraisons.
- `avis` : Notes et commentaires.
