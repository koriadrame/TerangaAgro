import api from './api'

const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Vérification email
  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verify-email/${token}`)
    const apiUser = response.data?.data?.user || response.data?.user
    const apiToken = response.data?.token
    if (apiToken && apiUser) {
      const isAdmin = apiUser?.role === 'admin' || apiUser?.isSuperAdmin === true
      if (isAdmin) {
        // Admins: n'utilisent pas le token générique du site public
        try { localStorage.removeItem('token'); localStorage.removeItem('user'); } catch {}
        localStorage.setItem('adminDashboardToken', apiToken)
        localStorage.setItem('adminDashboardUser', JSON.stringify(apiUser))
      } else {
        // Utilisateurs publics
        localStorage.setItem('token', apiToken)
        localStorage.setItem('user', JSON.stringify(apiUser))
        const role = apiUser?.role
        if (role === 'producteur') {
          localStorage.setItem('producerDashboardToken', apiToken)
          localStorage.setItem('producerDashboardUser', JSON.stringify(apiUser))
        } else if (role === 'livreur') {
          localStorage.setItem('deliveryDashboardToken', apiToken)
          localStorage.setItem('deliveryDashboardUser', JSON.stringify(apiUser))
        }
      }
      try { window.dispatchEvent(new Event('auth-changed')) } catch {}
    }
    return response.data
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    const apiUser = response.data?.data?.user || response.data?.user
    const apiToken = response.data?.token
    if (apiToken && apiUser) {
      const isAdmin = apiUser?.role === 'admin' || apiUser?.isSuperAdmin === true
      if (isAdmin) {
        // Admins: n'utilisent pas le token générique du site public
        try { localStorage.removeItem('token'); localStorage.removeItem('user'); } catch {}
        localStorage.setItem('adminDashboardToken', apiToken)
        localStorage.setItem('adminDashboardUser', JSON.stringify(apiUser))
      } else {
        // Utilisateurs publics
        localStorage.setItem('token', apiToken)
        localStorage.setItem('user', JSON.stringify(apiUser))
        const role = apiUser?.role
        if (role === 'producteur') {
          localStorage.setItem('producerDashboardToken', apiToken)
          localStorage.setItem('producerDashboardUser', JSON.stringify(apiUser))
        } else if (role === 'livreur') {
          localStorage.setItem('deliveryDashboardToken', apiToken)
          localStorage.setItem('deliveryDashboardUser', JSON.stringify(apiUser))
        }
      }
      try { window.dispatchEvent(new Event('auth-changed')) } catch {}
    }
    return response.data
  },

  // Déconnexion
 logout: () => {
  try {
    // Suppression des tokens et utilisateurs pour tous les rôles
    const keysToRemove = [
      'token', 'user',
      'adminDashboardToken', 'adminDashboardUser',
      'producerDashboardToken', 'producerDashboardUser',
      'deliveryDashboardToken', 'deliveryDashboardUser'
    ]
    keysToRemove.forEach(key => localStorage.removeItem(key))

    // Notifier les autres composants que l’état d’auth a changé
    window.dispatchEvent(new Event('auth-changed'))
  } catch (err) {
    console.error('Erreur pendant la déconnexion :', err)
  }

  // Redirection vers la page de connexion
  window.location.href = '/login'
},

  // Récupérer l'utilisateur connecté
  getCurrentUser: () => {
    const userString = localStorage.getItem('user')
    if (!userString || userString === 'undefined' || userString === 'null') {
      return null
    }
    try {
      return JSON.parse(userString)
    } catch (error) {
      // En cas d'erreur de parsing, nettoyer le localStorage corrompu
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return null
    }
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
}

export default authService
