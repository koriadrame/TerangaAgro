# 🤖 Guide de Configuration IA - Chatbot TerangaAgro

## 🎯 Configuration Actuelle

### ✅ Solution Intégrée
- **IA Gratuite** : Hugging Face API (1000 requêtes/jour)
- **Fallback Intelligent** : Réponses prédéfinies pour fiabilité
- **Détection automatique** des questions complexes

### 🔧 Pour Améliorer la Qualité

#### Option 1 : API Hugging Face (Gratuite - RECOMMANDÉ)
1. Créer un compte sur [Hugging Face](https://huggingface.co/join)
2. Aller dans Settings → Access Tokens
3. Créer un nouveau token avec lecture
4. Ajouter dans un fichier `.env` :
   ```
   REACT_APP_HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

#### Option 2 : OpenAI API (Premium - Meilleure qualité)
1. Créer un compte sur [OpenAI](https://platform.openai.com/)
2. Générer une clé API dans API Keys
3. Ajouter dans un fichier `.env` :
   ```
   REACT_APP_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
cd /workspace/front-TerangaAgro
npm install
```

### 2. Configuration API (Optionnel)
```bash
# Créer fichier .env
echo "REACT_APP_HUGGINGFACE_API_KEY=your_key_here" > .env
```

### 3. Lancement
```bash
npm start
```

## 🎛️ Fonctionnalités IA

### Détection Automatique
L'IA s'active automatiquement pour :
- ✅ Conseils agricoles personnalisés
- ✅ Questions techniques spécifiques
- ✅ Planification culturale
- ✅ Problèmes de ravageurs
- ✅ Optimisation budget

### Questions Types où l'IA intervient
- "Quels légumes sont faciles à cultiver à domicile ?"
- "Avec un budget de 50 000 FCFA, comment me lancer ?"
- "Comment protéger mes plantes des insectes naturellement ?"
- "Quelle est la meilleure période pour planter des tomates ?"
- "Quels engrais naturels recommandez-vous ?"

### Réponses Automatiques (sans IA)
- Informations produits et prix
- Contact et services
- Commandes et livraison
- Formations disponibles

## 📊 Monitoring

### Indicateurs Visuels
- 🟢 **Point vert** : IA disponible
- 🔵 **Badge "IA"** : Réponse générée par l'IA
- ⚡ **Message "IA en réflexion"** : Traitement en cours

### Métriques
- Nombre de requêtes IA utilisées
- Questions qui déclenchent l'IA
- Taux de satisfaction utilisateur

## 🔒 Sécurité

### Clés API
- **Jamais** exposer les clés dans le code
- Utiliser des variables d'environnement
- Limiter les permissions des tokens

### Limitation
- Rate limiting automatique
- Fallback en cas d'erreur API
- Messages d'erreur informatifs

## 💰 Coûts Estimés

### Hugging Face (Gratuit)
- 1000 requêtes/jour gratuites
- Idéal pour démo et tests
- Qualité correcte pour cas simples

### OpenAI (Payant)
- ~0.02€ par conversation
- Qualité professionnelle
- Recommandé pour production

### Optimisation Coût
- Cache des réponses communes
- Fallback intelligent
- Limitation intelligente des appels

## 🛠️ Personnalisation

### Ajout de Réponses Prédéfinies
Modifier `src/services/aiService.js` :
```javascript
getPredefinedResponse(message) {
  const responses = {
    "votre_question": "Votre réponse personnalisée",
    // ...
  };
}
```

### Amélioration Détection
```javascript
isComplexQuestion(message) {
  const complexKeywords = [
    "votre_nouveau_mot_cle",
    // ...
  ];
}
```

## 🚨 Dépannage

### Erreur "API key not found"
1. Vérifier le fichier `.env`
2. Redémarrer le serveur
3. Utiliser le fallback automatique

### Réponses de mauvaise qualité
1. Changer vers OpenAI API
2. Affiner les prompts système
3. Améliorer la base de connaissances

### Performance lente
1. Vérifier la connexion internet
2. Utiliser le cache des réponses
3. Augmenter le timeout

## 📈 Améliorations Futures

### Court terme
- [ ] Cache Redis pour réponses
- [ ] Analytics d'utilisation
- [ ] Interface admin de monitoring

### Moyen terme
- [ ] Multi-langues (Wolof, Serère)
- [ ] Intégration base de données produit
- [ ] Chatbot vocal

### Long terme
- [ ] IA personnalisée TerangaAgro
- [ ] Recommandations basées sur profil utilisateur
- [ ] Intégration IoT et capteurs

---

## 📞 Support

Pour toute question sur la configuration IA :
- **Email** : TerangaAgro@gmail.com
- **Téléphone** : 77 343 24 85

*Documentation mise à jour le 24/10/2025*