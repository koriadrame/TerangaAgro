#!/usr/bin/env node

/**
 * Script de test pour le système de gestion d'erreurs TerangaAgro
 * Teste toutes les fonctionnalités du nouveau système d'erreurs
 */

const fs = require('fs')
const path = require('path')

class ErrorSystemTester {
  constructor() {
    this.tests = []
    this.passed = 0
    this.failed = 0
    this.warnings = []
  }

  // Ajouter un test
  addTest(name, testFunction) {
    this.tests.push({ name, test: testFunction })
  }

  // Exécuter tous les tests
  async runTests() {
    console.log('🧪 Démarrage des tests du système de gestion d\'erreurs\n')
    
    for (const test of this.tests) {
      try {
        console.log(`⚡ Test: ${test.name}`)
        await test.test()
        console.log(`✅ Passé: ${test.name}\n`)
        this.passed++
      } catch (error) {
        console.log(`❌ Échec: ${test.name}`)
        console.log(`   Erreur: ${error.message}\n`)
        this.failed++
      }
    }

    this.printSummary()
  }

  // Afficher le résumé
  printSummary() {
    console.log('📊 RÉSUMÉ DES TESTS')
    console.log('='.repeat(50))
    console.log(`✅ Tests passés: ${this.passed}`)
    console.log(`❌ Tests échoués: ${this.failed}`)
    console.log(`⚠️  Avertissements: ${this.warnings.length}`)
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  AVERTISSEMENTS:')
      this.warnings.forEach(warning => console.log(`   - ${warning}`))
    }

    const successRate = ((this.passed / (this.passed + this.failed)) * 100).toFixed(1)
    console.log(`\n📈 Taux de réussite: ${successRate}%`)
    
    if (this.failed === 0) {
      console.log('\n🎉 Tous les tests sont passés ! Le système est prêt.')
    } else {
      console.log('\n⚠️  Certains tests ont échoué. Vérifiez les erreurs ci-dessus.')
    }
  }

  // Vérifier l'existence d'un fichier
  assertFileExists(filePath, description) {
    const fullPath = path.join(__dirname, '..', filePath)
    if (!fs.existsSync(fullPath)) {
      throw new Error(`${description}: ${filePath} n'existe pas`)
    }
  }

  // Vérifier le contenu d'un fichier
  assertFileContains(filePath, content, description) {
    const fullPath = path.join(__dirname, '..', filePath)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    
    if (!fileContent.includes(content)) {
      throw new Error(`${description}: "${content}" non trouvé dans ${filePath}`)
    }
  }

  // Vérifier qu'une chaîne n'est PAS dans un fichier
  assertFileNotContains(filePath, content, description) {
    const fullPath = path.join(__dirname, '..', filePath)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    
    if (fileContent.includes(content)) {
      throw new Error(`${description}: "${content}" trouvé dans ${filePath} mais ne devrait pas être là`)
    }
  }

  // Ajouter un avertissement
  addWarning(message) {
    this.warnings.push(message)
  }
}

// Initialiser le testeur
const tester = new ErrorSystemTester()

// TEST 1: Vérifier l'existence des fichiers principaux
tester.addTest('Existence des fichiers principaux', () => {
  const requiredFiles = [
    'src/hooks/useErrorHandler.js',
    'src/components/ErrorMessage.jsx',
    'src/contexts/ToastContext.jsx',
    'src/components/ErrorDemo.jsx',
    'GESTION_ERREURS_GUIDE.md'
  ]

  requiredFiles.forEach(file => {
    tester.assertFileExists(file, `Fichier requis`)
  })
})

// TEST 2: Vérifier le hook useErrorHandler
tester.addTest('Hook useErrorHandler - Structure', () => {
  tester.assertFileContains(
    'src/hooks/useErrorHandler.js',
    'export const useErrorHandler = () =>',
    'Hook principal exporté'
  )

  tester.assertFileContains(
    'src/hooks/useErrorHandler.js',
    'handleApiError',
    'Fonction handleApiError présente'
  )

  tester.assertFileContains(
    'src/hooks/useErrorHandler.js',
    'validateField',
    'Fonction validateField présente'
  )

  tester.assertFileContains(
    'src/hooks/useErrorHandler.js',
    'validateForm',
    'Fonction validateForm présente'
  )
})

// TEST 3: Vérifier les messages d'erreur en français
tester.addTest('Messages d\'erreur en français', () => {
  const frenchMessages = [
    'Ce champ est obligatoire',
    'Adresse email invalide',
    'Mot de passe doit contenir au moins 8 caractères',
    'Numéro de téléphone invalide',
    'Identifiants de connexion incorrects',
    'Votre compte n\'est pas encore vérifié'
  ]

  frenchMessages.forEach(message => {
    tester.assertFileContains(
      'src/hooks/useErrorHandler.js',
      message,
      `Message français "${message}"`
    )
  })
})

// TEST 4: Vérifier les composants d'erreur
tester.addTest('Composants d\'erreur - Structure', () => {
  const componentTests = [
    { file: 'src/components/ErrorMessage.jsx', content: 'const ErrorMessage' },
    { file: 'src/components/ErrorMessage.jsx', content: 'export const ErrorList' },
    { file: 'src/components/ErrorMessage.jsx', content: 'export const FieldWithError' },
    { file: 'src/components/ErrorMessage.jsx', content: 'export const ErrorToast' }
  ]

  componentTests.forEach(test => {
    tester.assertFileContains(
      test.file,
      test.content,
      `Composant ${test.content}`
    )
  })
})

// TEST 5: Vérifier le système Toast
tester.addTest('Système Toast - Structure', () => {
  const toastTests = [
    { file: 'src/contexts/ToastContext.jsx', content: 'export const ToastProvider' },
    { file: 'src/contexts/ToastContext.jsx', content: 'export const useToast' },
    { file: 'src/contexts/ToastContext.jsx', content: 'export const useAuthToast' },
    { file: 'src/contexts/ToastContext.jsx', content: 'showAuthError' },
    { file: 'src/contexts/ToastContext.jsx', content: 'showAuthSuccess' }
  ]

  toastTests.forEach(test => {
    tester.assertFileContains(
      test.file,
      test.content,
      `Fonction Toast ${test.content}`
    )
  })
})

// TEST 6: Vérifier l'intégration dans RegisterModal
tester.addTest('Intégration RegisterModal', () => {
  const registerTests = [
    { file: 'src/components/RegisterModal.jsx', content: 'import useErrorHandler' },
    { file: 'src/components/RegisterModal.jsx', content: 'import { FieldWithError }' },
    { file: 'src/components/RegisterModal.jsx', content: 'import { useAuthToast }' },
    { file: 'src/components/RegisterModal.jsx', content: 'validateForm' },
    { file: 'src/components/RegisterModal.jsx', content: 'handleApiError' }
  ]

  registerTests.forEach(test => {
    tester.assertFileContains(
      test.file,
      test.content,
      `Intégration RegisterModal: ${test.content}`
    )
  })
})

// TEST 7: Vérifier l'intégration dans LoginModal
tester.addTest('Intégration LoginModal', () => {
  const loginTests = [
    { file: 'src/components/LoginModal.jsx', content: 'import useErrorHandler' },
    { file: 'src/components/LoginModal.jsx', content: 'import { FieldWithError }' },
    { file: 'src/components/LoginModal.jsx', content: 'import { useAuthToast }' },
    { file: 'src/components/LoginModal.jsx', content: 'validateField' },
    { file: 'src/components/LoginModal.jsx', content: 'handleApiError' }
  ]

  loginTests.forEach(test => {
    tester.assertFileContains(
      test.file,
      test.content,
      `Intégration LoginModal: ${test.content}`
    )
  })
})

// TEST 8: Vérifier la mise à jour d'App.jsx
tester.addTest('Mise à jour App.jsx', () => {
  tester.assertFileContains(
    'src/App.jsx',
    'import { ToastProvider }',
    'Import ToastProvider'
  )

  tester.assertFileNotContains(
    'src/App.jsx',
    'react-toastify',
    'Ancien système react-toastify supprimé'
  )

  tester.assertFileContains(
    'src/App.jsx',
    '<ToastProvider>',
    'ToastProvider intégré'
  )
})

// TEST 9: Vérifier les types d'erreurs HTTP gérées
tester.addTest('Gestion des erreurs HTTP', () => {
  const httpErrors = [
    { code: 400, message: 'Données invalides' },
    { code: 401, message: 'Identifiants de connexion incorrects' },
    { code: 403, message: 'Accès refusé' },
    { code: 404, message: 'Utilisateur non trouvé' },
    { code: 409, message: 'Compte déjà existant' },
    { code: 500, message: 'Erreur serveur temporaire' },
    { code: 503, message: 'Service temporairement indisponible' }
  ]

  httpErrors.forEach(error => {
    // Vérifier que les codes de statut sont mentionnés
    const hasStatus = tester.assertFileContains(
      'src/hooks/useErrorHandler.js',
      `case ${error.code}:`,
      `Gestion erreur HTTP ${error.code}`
    )
  })
})

// TEST 10: Vérifier les fonctionnalités avancées
tester.addTest('Fonctionnalités avancées', () => {
  const advancedFeatures = [
    { file: 'src/hooks/useErrorHandler.js', content: 'handleErrorWithRetry' },
    { file: 'src/contexts/ToastContext.jsx', content: 'maxToasts' },
    { file: 'src/contexts/ToastContext.jsx', content: 'actions' },
    { file: 'src/components/ErrorMessage.jsx', content: 'contextHelp' },
    { file: 'src/components/ErrorMessage.jsx', content: 'helpText' }
  ]

  advancedFeatures.forEach(feature => {
    tester.assertFileContains(
      feature.file,
      feature.content,
      `Fonctionnalité avancée: ${feature.content}`
    )
  })
})

// TEST 11: Vérifier le composant de démonstration
tester.addTest('Composant de démonstration', () => {
  const demoTests = [
    { file: 'src/components/ErrorDemo.jsx', content: 'simulateApiError' },
    { file: 'src/components/ErrorDemo.jsx', content: 'Démonstration du Système' },
    { file: 'src/components/ErrorDemo.jsx', content: 'Fonctionnalités du Système' }
  ]

  demoTests.forEach(test => {
    tester.assertFileContains(
      test.file,
      test.content,
      `Composant demo: ${test.content}`
    )
  })
})

// TEST 12: Vérifier la documentation
tester.addTest('Documentation complète', () => {
  const docTests = [
    { file: 'GESTION_ERREURS_GUIDE.md', content: '# Guide du Système de Gestion d\'Erreurs' },
    { file: 'GESTION_ERREURS_GUIDE.md', content: '## Composants Principaux' },
    { file: 'GESTION_ERREURS_GUIDE.md', content: '## Types d\'Erreurs Gérées' },
    { file: 'GESTION_ERREURS_GUIDE.md', content: '## Intégration dans les Composants' },
    { file: 'GESTION_ERREURS_GUIDE.md', content: '## Bonnes Pratiques' }
  ]

  docTests.forEach(test => {
    tester.assertFileContains(
      test.file,
      test.content,
      `Documentation: ${test.content}`
    )
  })
})

// AVERTISSEMENTS (non bloquants)
tester.addWarning('Vérifiez que tous les imports sont corrects dans les composants')
tester.addWarning('Testez manuellement les modals d\'inscription et de connexion')
tester.addWarning('Vérifiez les styles Tailwind CSS')
tester.addWarning('Testez les notifications toast en situation réelle')

// Exécuter les tests
if (require.main === module) {
  tester.runTests()
}

module.exports = ErrorSystemTester