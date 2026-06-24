# Dashboard Administrateur TerangaAgro

## Vue d'ensemble
Le dashboard administrateur offre une interface complète pour gérer la plateforme TerangaAgro. Il comprend des pages pour gérer les utilisateurs, les produits, les ventes et les formations.

---

## Structure du Dashboard

### Composants Principaux

#### 1. AdminSidebar (`src/components/admin/AdminSidebar.jsx`)
**Description** : Menu de navigation latéral fixe.

**Éléments** :
- **Logo TerangaAgro** : Icône verte + nom de marque
- **Menu de navigation** :
  - 📊 Tableau de bord (`/admin/dashboard`)
  - 👥 Utilisateurs (`/admin/users`)
  - 📦 Produits (`/admin/products`)
  - 💵 Ventes (`/admin/sales`)
  - 🎓 Formations (`/admin/formations`)

**Comportement** :
- Item actif : Fond vert clair (`#E7F7E0`) + icône verte (`#67BD3A`)
- Items inactifs : Gris avec hover
- Position fixe : `fixed left-0 top-0`
- Largeur : `w-64` (256px)

**Couleurs** :
- Fond : Blanc (`#FFFFFF`)
- Bordure droite : Gris clair (`border-gray-200`)
- Item actif : Vert clair (`#E7F7E0`)
- Icône active : Vert (`#67BD3A`)

---

#### 2. AdminHeader (`src/components/admin/AdminHeader.jsx`)
**Description** : Barre supérieure avec titre, recherche et profil.

**Éléments** :
- **Titre de la page** : Texte gras (ex: "Gestion des utilisateurs")
- **Barre de recherche** (optionnelle) :
  - Icône loupe à gauche
  - Placeholder : "Rechercher..."
  - Largeur : `w-80`
  - Focus : Bordure verte
- **Notifications** : Icône cloche
- **Profil utilisateur** :
  - Avatar circulaire (icône utilisateur)
  - Nom : "Admin"
  - Email : "admin@TerangaAgro.sn"

**Props** :
```jsx
<AdminHeader 
  title="Titre de la page" 
  showSearch={true/false} 
/>
```

---

#### 3. AdminLayout (`src/layouts/AdminLayout.jsx`)
**Description** : Layout commun pour toutes les pages admin.

**Structure** :
```jsx
<AdminLayout title="Titre" showSearch={true}>
  {children}
</AdminLayout>
```

**Fonctionnalités** :
- Intègre `AdminSidebar` et `AdminHeader`
- Gère le décalage de contenu (`ml-64` pour la sidebar)
- Fond gris clair (`bg-gray-50`)
- Padding du contenu principal : `p-8`

---

## Pages du Dashboard

### 1. Tableau de Bord (`/admin/dashboard`)
**Fichier** : `src/pages/admin/AdminDashboard.jsx`

**Contenu** :
- **4 Cartes de statistiques** :
  1. Total Utilisateurs : 1,245 (+12%)
  2. Produits Actifs : 432 (+8%)
  3. Ventes du Mois : 8.5M FCFA (+23%)
  4. Formations : 28 (+5%)

- **Activités récentes** :
  - Liste chronologique des dernières actions
  - Icône d'horloge verte
  - Action, utilisateur et temps

**Design** :
- Grille responsive : `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Cartes blanches avec ombre légère
- Icônes vertes
- Badges de variation verts

---

### 2. Gestion des Utilisateurs (`/admin/users`)
**Fichier** : `src/pages/admin/AdminUsers.jsx`

**Caractéristiques** :
- **Barre de recherche active** dans le header
- **Tableau avec colonnes** :
  1. ☐ Checkbox de sélection
  2. **Nom** : Avatar + Nom complet
  3. **Email** : Adresse email
  4. **Rôle** : Administrateur / Producteur / Consommateur
  5. **Date d'inscription** : Format JJ/MM/AAAA
  6. **Statut** : Badge coloré
  7. **Actions** : ✏️ Modifier / 🗑️ Supprimer

**Données d'exemple** :
1. Aminata Sow - Administrateur - Actif
2. Babacar Faye - Producteur - Actif
3. Ousmane Diop - Consommateur - Actif
4. Fatou Ndiaye - Consommateur - Actif
5. Moussa Traoré - Producteur - Bloqué

**Badges de statut** :
- **Actif** : Fond vert clair (`#E6F7D9`) + texte vert (`#36A300`)
- **Bloqué** : Fond rouge clair (`#FEE8E6`) + texte rouge (`#DC3545`)

**Pagination** :
- Affichage : "Affiche 1 à 5 sur 25 résultats"
- Boutons : ◀ 1 2 3 ... 5 ▶
- Page active : Fond vert (`#4CAF50`) + texte blanc

---

### 3. Liste des Produits (`/admin/products`)
**Fichier** : `src/pages/admin/AdminProducts.jsx`

**Caractéristiques** :
- **Titre** : "Liste des Produits" au-dessus du tableau
- **Tableau avec colonnes** :
  1. **Produit** : Icône + Nom + Catégorie
  2. **Producteur** : Avatar + Nom
  3. **Prix** : Format FCFA
  4. **Stock** : Quantité + unité
  5. **Statut** : Badge coloré
  6. **Actions** : 👁️ Voir détails

**Données d'exemple** :
1. **Millet** (Céréale)
   - Producteur : Prod. Keita
   - Prix : 500 FCFA/kg
   - Stock : 1500 kg
   - Statut : 🟢 En stock

2. **Arachide** (Légumineuse)
   - Producteur : Ferme Ndiaye
   - Prix : 1200 FCFA/kg
   - Stock : 850 kg
   - Statut : 🟢 En stock

3. **Mangue Kent** (Fruit)
   - Producteur : BioTeranga
   - Prix : 250 FCFA/unité
   - Stock : 50 unités
   - Statut : 🟡 Stock faible

4. **Oignon Violet** (Légume)
   - Producteur : Jardin Fall
   - Prix : 400 FCFA/kg
   - Stock : 0 kg
   - Statut : 🔴 Rupture

**Icônes des produits** :
- Carrés avec coins arrondis
- Couleurs de fond variées :
  - Vert (`#4CAF50`) : Céréales, légumineuses, légumes
  - Bleu (`#2196F3`) : Fruits

**Badges de statut** :
- **En stock** : Fond vert (`#4CAF50`) + texte blanc
- **Stock faible** : Fond jaune (`#FFC107`) + texte gris foncé
- **Rupture** : Fond rouge (`#F44336`) + texte blanc

---

## Palette de Couleurs

### Couleurs Principales
- **Vert principal** : `#67BD3A` (logo, items actifs)
- **Vert secondaire** : `#4CAF50` (badges, boutons)
- **Vert clair** : `#E7F7E0` (fond item actif)

### Couleurs de Statut
- **Succès** : `#4CAF50` / `#36A300`
- **Attention** : `#FFC107` (jaune/orange)
- **Erreur** : `#F44336` / `#DC3545` (rouge)
- **Info** : `#2196F3` (bleu)

### Couleurs Neutres
- **Fond page** : `#F8F8F8` (gris très clair)
- **Fond cartes** : `#FFFFFF` (blanc)
- **Texte principal** : `#333333` (gris foncé)
- **Texte secondaire** : `#666666` (gris moyen)
- **Bordures** : `#E0E0E0` / `#CCCCCC`

---

## Routes Disponibles

```jsx
/admin/dashboard     → Tableau de bord (statistiques)
/admin/users         → Gestion des utilisateurs
/admin/products      → Liste des produits
/admin/sales         → À implémenter
/admin/formations    → À implémenter
```

---

## Responsive Design

### Points de rupture
- **Mobile** : < 768px
  - Sidebar en menu hamburger (recommandé)
  - Grille stats : 1 colonne
  - Tableau : scroll horizontal

- **Tablet** : 768px - 1024px
  - Grille stats : 2 colonnes
  - Sidebar fixe

- **Desktop** : > 1024px
  - Grille stats : 4 colonnes
  - Layout complet

---

## Fonctionnalités Interactives

### Implémentées
- ✅ Navigation entre pages
- ✅ Mise en évidence de la page active
- ✅ Hover sur les lignes de tableau
- ✅ Affichage des données statiques

### À Implémenter (Backend nécessaire)
- ⏳ Recherche dans les tableaux
- ⏳ Tri des colonnes
- ⏳ Pagination fonctionnelle
- ⏳ Modification des utilisateurs
- ⏳ Suppression des utilisateurs
- ⏳ Filtrage par statut
- ⏳ Ajout de nouveaux produits
- ⏳ Notifications en temps réel
- ⏳ Export de données (CSV/PDF)

---

## Fichiers Créés

```
front-TerangaAgro/
├── src/
│   ├── components/
│   │   └── admin/
│   │       ├── AdminSidebar.jsx
│   │       └── AdminHeader.jsx
│   ├── layouts/
│   │   └── AdminLayout.jsx
│   ├── pages/
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminUsers.jsx
│   │       └── AdminProducts.jsx
│   └── App.jsx (mis à jour)
└── docs/
    └── ADMIN_DASHBOARD.md
```

---

## Utilisation

### Accès au Dashboard
1. Connectez-vous via `/login`
2. Après authentification, redirigez vers `/admin/dashboard`
3. Naviguez via le menu latéral

### Exemple d'intégration
```jsx
import { Navigate } from 'react-router-dom'

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = checkAdminStatus() // À implémenter
  
  if (!isAdmin) {
    return <Navigate to="/login" />
  }
  
  return children
}

// Dans App.jsx
<Route 
  path="/admin/*" 
  element={
    <ProtectedAdminRoute>
      {/* Routes admin */}
    </ProtectedAdminRoute>
  } 
/>
```

---

## Prochaines Étapes

1. **Authentification & Sécurité** :
   - Implémenter la vérification des rôles
   - Protéger les routes admin
   - Gérer les tokens JWT

2. **Connexion Backend** :
   - Créer les API endpoints
   - Intégrer les appels API (fetch/axios)
   - Gérer les états de chargement

3. **Fonctionnalités Avancées** :
   - Système de notifications
   - Export de rapports
   - Graphiques et analytics
   - Upload d'images pour produits

4. **Pages Manquantes** :
   - Page Ventes (`/admin/sales`)
   - Page Formations (`/admin/formations`)
   - Page Paramètres
   - Page Profil Admin

---

## Support et Maintenance

Pour toute question ou amélioration, contactez l'équipe de développement.
