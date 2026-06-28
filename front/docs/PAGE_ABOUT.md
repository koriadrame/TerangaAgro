# Page À Propos - Documentation

## 🎯 Vue d'ensemble

La page "À Propos" présente TerangaAgro, sa mission, son fonctionnement et ses valeurs fondamentales.

---

## 📍 Structure de la Page

### 1. **Header**
- Identique à la page d'accueil
- Navigation avec lien "A Propos" actif
- Boutons "Se connecter" et "S'inscrire"

---

### 2. **Section Hero** (Bannière verte)

**Design :**
- Fond vert foncé (`bg-green-800`)
- Texte blanc centré

**Contenu :**
- **Titre principal :** "À Propos d'TerangaAgro"
- **Mission statement :** "Notre mission est de donner le pouvoir aux agriculteurs locaux en créant un écosystème agricole transparent, équitable et durable pour tous."

**Code :**
```jsx
<section className="bg-green-800 text-white py-20">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">
      À Propos d'TerangaAgro
    </h1>
    <p className="text-lg md:text-xl max-w-4xl mx-auto">
      Notre mission est de donner le pouvoir aux agriculteurs locaux...
    </p>
  </div>
</section>
```

---

### 3. **Section "Qui sommes-nous ?"**

**Layout :** Grille 2 colonnes (responsive)

#### **Colonne Gauche - Texte**

**Titre :** "Qui sommes-nous ?"

**Paragraphe 1 :**
> TerangaAgro est une plateforme numérique dédiée à la valorisation des produits agricoles locaux. Nous mettons en relation directe les producteurs, les consommateurs et les livreurs, pour encourager une agriculture durable, transparente et équitable. Notre objectif est de construire un pont entre les champs sénégalais et votre table, en garantissant la fraîcheur, la qualité et une juste rémunération pour les agriculteurs.

**Paragraphe 2 :**
> Grâce à notre réseau, les producteurs peuvent vendre facilement leurs récoltes, les consommateurs ont accès à des produits frais et sains, et les livreurs participent à la chaîne de distribution locale. Ensemble, nous bâtissons un écosystème agricole responsable qui soutient les communautés rurales et favorise le développement local.

**Bouton :** "Contactez-nous →" (vert foncé)

#### **Colonne Droite - Images**

**Disposition :** Grille 2x2
- **Grande image verticale (gauche)** : Jeune pousse verte
- **Petite image horizontale (haut droite)** : Assortiment de légumes frais
- **Petite image horizontale (bas droite)** : Plantation d'arbre en groupe

**Code :**
```jsx
<div className="grid grid-cols-2 gap-4">
  <div className="col-span-1 row-span-2">
    <img src="..." alt="Jeune pousse" className="w-full h-full object-cover rounded-lg shadow-lg" />
  </div>
  <div className="col-span-1">
    <img src="..." alt="Légumes frais" className="w-full h-48 object-cover rounded-lg shadow-lg" />
  </div>
  <div className="col-span-1">
    <img src="..." alt="Plantation" className="w-full h-48 object-cover rounded-lg shadow-lg" />
  </div>
</div>
```

---

### 4. **Section "Nos valeurs"**

**Fond :** Gris clair (`bg-gray-50`)

**Titre :** "Nos valeurs"

**Sous-titre :** "Au cœur de notre démarche, trois piliers fondamentaux guident nos actions."

**Layout :** 3 cartes en grille (responsive : 1 col mobile → 3 cols desktop)

#### **Carte 1 : Équité**
- **Icône :** Groupe de personnes (SVG vert foncé)
- **Titre :** "Équité"
- **Description :** "Nous assurons des transactions justes qui valorisent le travail des agriculteurs et garantissent des prix abordables pour les consommateurs."

#### **Carte 2 : Transparence**
- **Icône :** Œil (SVG vert foncé)
- **Titre :** "Transparence"
- **Description :** "Nous offrons une traçabilité complète du producteur au consommateur pour une confiance totale dans la qualité des produits."

#### **Carte 3 : Durabilité**
- **Icône :** Feuille/flamme (SVG vert foncé)
- **Titre :** "Durabilité"
- **Description :** "Nous soutenons les pratiques agricoles respectueuses de l'environnement pour préserver nos terres pour les générations futures."

**Style des cartes :**
```jsx
<div className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow text-center">
  {/* Icône */}
  <svg className="w-16 h-16 text-green-700 mx-auto mb-4">...</svg>
  
  {/* Titre */}
  <h3 className="text-xl font-bold text-gray-800 mb-4">Équité</h3>
  
  {/* Description */}
  <p className="text-gray-600 leading-relaxed">...</p>
</div>
```

---

### 5. **Footer**
- Identique à la page d'accueil
- Fond vert foncé
- 3 colonnes : Logo/Social, Explorer, Contact

---

## 🎨 Palette de Couleurs

| Élément | Couleur | Code Tailwind |
|---------|---------|---------------|
| Hero Background | Vert foncé | `bg-green-800` |
| Bouton "Contactez-nous" | Vert | `bg-green-600` |
| Icônes des valeurs | Vert foncé | `text-green-700` |
| Section valeurs | Gris clair | `bg-gray-50` |
| Cartes | Blanc | `bg-white` |
| Texte principal | Noir | `text-gray-800` |
| Texte secondaire | Gris | `text-gray-600` |

---

## 📱 Responsive Design

### **Breakpoints :**

**Mobile (< 768px) :**
- Texte et images en colonne unique
- Images empilées verticalement
- Cartes de valeurs empilées

**Tablet (768px - 1024px) :**
- Grille 2 colonnes pour "Qui sommes-nous ?"
- 2 cartes de valeurs par ligne

**Desktop (> 1024px) :**
- Grille 2 colonnes pour tout
- 3 cartes de valeurs en ligne
- Images en disposition 2x2

---

## 🔗 Navigation

**Route :** `/about`

**Accès depuis :**
- Header : Lien "A Propos"
- Footer : Lien dans "Explorer"

**Configuration du routing :**
```jsx
// App.jsx
import About from './pages/About'

<Route path="/about" element={<About />} />
```

---

## ✨ Fonctionnalités

### **Implémentées :**
✅ Section hero avec mission statement  
✅ Présentation détaillée de l'entreprise  
✅ Grille d'images responsive  
✅ 3 valeurs fondamentales avec icônes  
✅ Bouton d'appel à l'action "Contactez-nous"  
✅ Modal d'inscription accessible depuis le header  
✅ Design responsive complet  
✅ Hover effects sur les cartes  

### **À implémenter :**
☐ Lier le bouton "Contactez-nous" à la page contact  
☐ Ajouter des animations au scroll  
☐ Intégrer des témoignages vidéo  
☐ Ajouter une timeline de l'histoire de l'entreprise  

---

## 📝 Fichier

**Emplacement :** `front-TerangaAgro/src/pages/About.jsx`

**Dépendances :**
- `Header.jsx`
- `Footer.jsx`
- `RegisterModal.jsx`
- React Router (`useNavigate`, `Link`)
- React (`useState`)

---

## 🛠️ Maintenance

**Pour modifier le contenu :**

1. **Texte de la mission :** Modifier dans la section Hero
2. **Paragraphes "Qui sommes-nous ?" :** Modifier dans la section correspondante
3. **Valeurs :** Modifier le tableau `values` dans le composant
4. **Images :** Remplacer les URLs Unsplash par vos propres images

**Exemple de modification des valeurs :**
```jsx
const values = [
  {
    icon: <svg>...</svg>,
    title: 'Nouvelle valeur',
    description: 'Description de la nouvelle valeur...'
  },
  // ...
]
```

---

**Créé par MiniMax Agent** 🤖  
**Date :** 2025-10-23  
**Version :** 1.0