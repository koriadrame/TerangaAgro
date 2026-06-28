# Pages Tableau de bord et Mes Produits - Dashboard Producteur

## Vue d'ensemble

Ce document décrit les deux nouvelles pages créées pour le dashboard producteur d'TerangaAgro : **Tableau de bord** (Dashboard) et **Liste des produits** (Mes Produits).

---

## Page 1 : Tableau de bord (`/producer/dashboard`)

### Description
La page principale du producteur qui permet d'ajouter de nouveaux produits et de visualiser les performances de ventes.

### Structure de la page

#### 1. En-tête
- **Titre** : "Tableau de bord"
- **Salutation** : "Bienvenue, Producteur!"

#### 2. Carte "Ajouter un produit" (2/3 de la largeur)

##### Zone de téléversement d'image
- **Style** : Bordure en pointillés avec effet hover vert
- **Icône** : Nuage avec flèche (Upload)
- **Texte** : "Cliquez pour téléverser ou glissez-déposez"
- **Formats supportés** : SVG, PNG, JPG (MAX. 800x400px)
- **Fonctionnalité** : Upload de fichier avec input caché

##### Formulaire d'ajout de produit

**Champs du formulaire :**

1. **Nom du produit**
   - Type : Text input
   - Placeholder : "Ex: Tomates fraîches"
   - Validation : Requis

2. **Prix (FCFA / kg)**
   - Type : Number input
   - Placeholder : "Ex: 2500"
   - Unité : FCFA par kilogramme

3. **Description**
   - Type : Textarea
   - Rows : 4
   - Resizable : Oui (verticalement)
   - Placeholder : "Décrivez votre produit..."

4. **Catégorie**
   - Type : Select dropdown
   - Icône : ChevronDown
   - Options :
     - Légumes (défaut)
     - Fruits
     - Céréales
     - Tubercules
     - Épices

5. **Bouton de soumission**
   - Texte : "Ajouter le produit"
   - Style : Fond vert, pleine largeur
   - Action : Soumet le formulaire

#### 3. Carte "Mes ventes" (1/3 de la largeur)

##### Graphique en barres
- **Bibliothèque** : Recharts
- **Type** : BarChart avec double série
- **Période** : 6 mois (Janvier à Juin)
- **Séries de données** :
  - **Ce mois-ci** : Barres vertes (#16A34A)
  - **Mois dernier** : Barres grises (#D1D5DB)
- **Axe Y** : Valeurs de 0 à 500
- **Features** :
  - Grille en pointillés
  - Tooltip interactif
  - Légende en bas
  - Coins supérieurs arrondis sur les barres

##### Données exemple

```javascript
const salesData = [
  { month: 'Jan', thiMonth: 450, lastMonth: 300 },
  { month: 'Fév', thiMonth: 380, lastMonth: 420 },
  { month: 'Mar', thiMonth: 490, lastMonth: 350 },
  { month: 'Avr', thiMonth: 420, lastMonth: 480 },
  { month: 'Mai', thiMonth: 500, lastMonth: 390 },
  { month: 'Juin', thiMonth: 460, lastMonth: 440 },
];
```

### Fonctionnalités

#### State Management
```javascript
const [productForm, setProductForm] = useState({
  name: '',
  price: '',
  description: '',
  category: 'Légumes',
  image: null,
});
```

#### Handlers
- `handleInputChange` : Mise à jour des champs du formulaire
- `handleImageUpload` : Gestion du fichier image
- `handleSubmit` : Soumission du formulaire

### Layout responsive
- **Desktop** : 2 colonnes (2/3 + 1/3)
- **Tablette/Mobile** : 1 colonne (empilées)

---

## Page 2 : Liste des produits (`/producer/products`)

### Description
Page de gestion des produits permettant de visualiser, modifier et supprimer les produits du producteur.

### Structure de la page

#### 1. En-tête
- **Titre** : "Liste des produits"

#### 2. Tableau des produits

##### Colonnes du tableau

1. **Produit**
   - Icône circulaire avec emoji du produit
   - Nom du produit à côté de l'icône
   - Style : Fond vert clair pour l'icône

2. **Prix**
   - Format : "X XXX CFA / kg"
   - Couleur : Gris foncé

3. **Stock**
   - Format : "XX kg"
   - Couleur : Gris foncé

4. **Actions**
   - Deux boutons :
     - **Éditer** : Icône crayon (Edit2) en vert
     - **Supprimer** : Icône corbeille (Trash2) en rouge
   - Effet hover : Fond coloré léger

### Données affichées

| Produit | Prix | Stock |
|---------|------|-------|
| 🍅 Tomates fraîches | 2 500 CFA / kg | 50 kg |
| 🥕 Carottes Bio | 1 800 CFA / kg | 35 kg |
| 🫑 Poivrons | 3 000 CFA / kg | 20 kg |
| 🍆 Aubergines | 2 200 CFA / kg | 40 kg |

### Fonctionnalités

#### Actions disponibles

1. **Édition de produit**
   - Handler : `handleEdit(productId)`
   - Icône : Edit2 (Lucide)
   - Couleur : Vert avec hover plus foncé
   - À implémenter : Modale ou navigation vers formulaire d'édition

2. **Suppression de produit**
   - Handler : `handleDelete(productId)`
   - Icône : Trash2 (Lucide)
   - Couleur : Rouge avec hover plus foncé
   - À implémenter : Confirmation avant suppression

#### Effets visuels
- Hover sur les lignes : Fond gris léger
- Hover sur les boutons d'action : Fond coloré selon l'action
- Transition fluide sur tous les effets

---

## Installation et configuration

### Dépendance requise : Recharts

Le graphique de ventes utilise la bibliothèque **Recharts**. Vous devez l'installer :

```bash
npm install recharts
```

### Structure des fichiers

```
front-TerangaAgro/
├── src/
│   ├── pages/
│   │   └── producer/
│   │       ├── ProducerDashboard.jsx    # Page Tableau de bord
│   │       └── ProducerProducts.jsx     # Page Liste des produits
│   ├── layouts/
│   │   └── ProducerLayout.jsx         # Layout wrapper
│   └── App.jsx                          # Routes
└── docs/
    └── PRODUCER_DASHBOARD_PRODUCTS.md  # Cette documentation
```

### Routes

```jsx
// Déjà configurées dans App.jsx
<Route path="/producer/dashboard" element={<ProducerDashboard />} />
<Route path="/producer/products" element={<ProducerProducts />} />
```

### URLs d'accès

- **Tableau de bord** : `http://localhost:3000/producer/dashboard`
- **Liste des produits** : `http://localhost:3000/producer/products`

---

## Technologies utilisées

### Page Tableau de bord
- **React** : Framework principal
- **React Hooks** : `useState` pour gestion d'état
- **Recharts** : Visualisation de données
  - BarChart
  - CartesianGrid
  - XAxis, YAxis
  - Tooltip, Legend
  - ResponsiveContainer
- **Lucide React** : Icônes (Upload, ChevronDown)
- **Tailwind CSS** : Styling et responsive

### Page Liste des produits
- **React** : Framework principal
- **Lucide React** : Icônes (Edit2, Trash2)
- **Tailwind CSS** : Styling et tableau responsive

---

## Code couleur

### Couleurs principales
- **Vert primaire** : `#16A34A` (bg-green-600)
- **Vert hover** : `#15803D` (bg-green-700)
- **Vert clair** : `#E8F5E9` (bg-green-100)
- **Gris** : `#D1D5DB` (bg-gray-300)
- **Rouge** : `#EF4444` (text-red-500)

---

## Améliorations futures

### Page Tableau de bord

1. **Formulaire d'ajout de produit**
   - Validation des champs (required, min/max)
   - Prévisualisation de l'image uploadée
   - Messages d'erreur en temps réel
   - Notification de succès après ajout
   - Réinitialisation du formulaire après soumission

2. **Graphique de ventes**
   - Ajouter plus de métriques (revenus, volume)
   - Sélecteur de période (mois, trimestre, année)
   - Export du graphique en image
   - Données dynamiques depuis l'API

3. **Statistiques supplémentaires**
   - Cartes KPI (revenu total, nombre de ventes, meilleur produit)
   - Graphique d'évolution des stocks

### Page Liste des produits

1. **Fonctionnalités de gestion**
   - Implémenter la modale d'édition
   - Confirmation de suppression avec dialogue
   - Recherche et filtrage des produits
   - Tri par colonne (nom, prix, stock)
   - Pagination pour les longues listes

2. **Améliorations visuelles**
   - Badge de statut (En stock, Stock faible, Rupture)
   - Images réelles au lieu d'emojis
   - Indicateur visuel pour stock faible

3. **Actions supplémentaires**
   - Action rapide "Dupliquer le produit"
   - Export de la liste en CSV/Excel
   - Sélection multiple pour actions groupées

---

## Accessibilité

- **Labels sémantiques** : Tous les champs de formulaire ont des labels explicites
- **Focus visible** : Ring vert sur les éléments interactifs
- **Boutons accessibles** : Attributs `title` pour les actions
- **Contraste** : Respect des ratios WCAG AA
- **Navigation clavier** : Tous les éléments sont accessibles au clavier

---

## Dépannage

### Problème : Le graphique ne s'affiche pas

**Solution** : Installer Recharts
```bash
cd front-TerangaAgro
npm install recharts
```

### Problème : Erreur "Cannot find module 'lucide-react'"

**Solution** : Lucide React devrait déjà être installé. Si ce n'est pas le cas :
```bash
npm install lucide-react
```

### Problème : Le formulaire ne se soumet pas

**Vérifiez** :
1. Que `handleSubmit` est bien appelé
2. Que `e.preventDefault()` est présent
3. Que les données du formulaire sont bien capturées

---

**Auteur** : MiniMax Agent  
**Date de création** : 2025  
**Version** : 1.0
