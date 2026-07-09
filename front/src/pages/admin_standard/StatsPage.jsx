import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  TrendingUp,
  Loader2, 
  AlertCircle, 
  RefreshCw,
  Users,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'
import { useAuth } from '../../hooks/useApi'
import { useToast } from '../../contexts/ToastContext'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminHeader from '../../components/admin/AdminHeader'
import SuperAdminSidebar from '../../components/super_admin/SuperAdminSidebar'
import SuperAdminHeader from '../../components/super_admin/SuperAdminHeader'
import AdminProfileModal from '../../components/admin/AdminProfileModal'

const AdminStatistics = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { success, error: showError } = useToast()
  
  // États de mise en page globale
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  
  // États pour les filtres et requêtes de statistiques
  const [timeRange, setTimeRange] = useState('month')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Jeux de données pour les graphiques Recharts
  const revenueData = [
    { month: 'Jan', revenue: 4000000, profit: 1200000 },
    { month: 'Fév', revenue: 4500000, profit: 1350000 },
    { month: 'Mar', revenue: 5200000, profit: 1560000 },
    { month: 'Avr', revenue: 4800000, profit: 1440000 },
    { month: 'Mai', revenue: 6100000, profit: 1830000 },
    { month: 'Juin', revenue: 7500000, profit: 2250000 },
  ]

  const salesByCategory = [
    { category: 'Légumes', sales: 450, growth: 12 },
    { category: 'Fruits', sales: 320, growth: 8 },
    { category: 'Céréales', sales: 280, growth: 15 },
    { category: 'Produits laitiers', sales: 190, growth: 5 },
    { category: 'Viandes', sales: 150, growth: 10 },
  ]

  const userDistribution = [
    { name: 'Consommateurs', value: 65, color: '#6366F1' },
    { name: 'Producteurs', value: 25, color: '#10B981' },
    { name: 'Livreurs', value: 8, color: '#F59E0B' },
    { name: 'Admins', value: 2, color: '#EC4899' },
  ]

  const orderStatusData = [
    { status: 'Confirmées', value: 45, color: '#10B981' },
    { status: 'En cours', value: 30, color: '#3B82F6' },
    { status: 'Livré', value: 20, color: '#8B5CF6' },
    { status: 'Annulées', value: 5, color: '#EF4444' },
  ]

  // Détecter si on est dans un contexte Super Admin via l'URL
  const isSuperAdminContext = location.pathname.startsWith('/super-admin/')

  // Déterminer quel utilisateur charger selon le contexte
  const user = React.useMemo(() => {
    try {
      let storageKey
      if (isSuperAdminContext) {
        storageKey = localStorage.getItem('superAdminUser') || localStorage.getItem('adminDashboardUser')
      } else {
        storageKey = localStorage.getItem('adminDashboardUser')
      }
      return storageKey ? JSON.parse(storageKey) : null
    } catch {
      return null
    }
  }, [isSuperAdminContext])

  // Récupérer l'admin connecté via le hook d'authentification
  const { admin: currentAdmin } = useAuth()

  // Actions de déconnexion et gestion de profil
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('adminDashboardUser')
    localStorage.removeItem('superAdminUser')
    window.location.href = isSuperAdminContext ? '/login' : '/admin/login'
  }

  const handleOpenProfile = () => {
    setShowProfileModal(true)
  }

  const handleProfileUpdated = () => {
    console.log('Profil mis à jour')
  }

  const handleRefreshStats = async () => {
    setLoading(true)
    setError(null)
    try {
      // Simulation d'une attente de rafraîchissement
      await new Promise(resolve => setTimeout(resolve, 800))
      success('Statistiques actualisées')
    } catch (err) {
      setError(err.message || 'Erreur lors de la récupération des données')
    } finally {
      setLoading(false)
    }
  }

  // Écran d'attente initial si l'utilisateur n'est pas encore extrait du stockage
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAF8]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F8FAF8]">
      {/* Rendu dynamique du Sidebar selon l'URL */}
      {isSuperAdminContext ? (
        <SuperAdminSidebar user={user} onClose={() => setSidebarOpen(false)} />
      ) : (
        <AdminSidebar user={user} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Rendu dynamique du Header selon l'URL */}
        {isSuperAdminContext ? (
          <SuperAdminHeader
            user={user}
            onOpenProfile={handleOpenProfile}
            onLogout={handleLogout}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        ) : (
          <AdminHeader
            user={user}
            onOpenProfile={handleOpenProfile}
            onLogout={handleLogout}
          />
        )}

        {/* Zone de contenu défilable principale */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            

            {/* Titre & Filtres de la page */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Statistiques Analytiques</h1>
                <p className="text-gray-600">Visualisation détaillée des performances de TerangaAgro</p>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="7days">7 derniers jours</option>
                  <option value="month">Ce mois-ci</option>
                  <option value="year">Cette année</option>
                </select>

                <button 
                  onClick={handleRefreshStats}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>Actualiser</span>
                </button>
              </div>
            </div>

            {/* Alerte d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* --- GRAPHIQUES INTEGRÉS --- */}
            
            {/* Ligne 1 : Évolution des revenus & Ventes par catégorie */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Diagramme des revenus */}
              <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Évolution des revenus
                  </h3>
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+18.5%</span>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M FCFA`} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={3} fill="url(#revenueGradient)" name="Revenus" />
                    <Area type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} fill="url(#profitGradient)" name="Profit" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Ventes par catégorie */}
              <div className="bg-gradient-to-br from-white via-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Ventes par catégorie
                  </h3>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Top 5</span>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={salesByCategory} layout="vertical">
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10B981"/>
                        <stop offset="100%" stopColor="#059669"/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" stroke="#6B7280" fontSize={12} />
                    <YAxis dataKey="category" type="category" stroke="#6B7280" fontSize={12} width={80} />
                    <Tooltip />
                    <Bar dataKey="sales" fill="url(#barGradient)" radius={[0, 8, 8, 0]} name="Ventes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Ligne 2 : Distribution des utilisateurs & Statut des commandes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Distribution des utilisateurs */}
              <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Distribution des utilisateurs
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <defs>
                      {userDistribution.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.7}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={userDistribution}
                      cx="50%" cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={90} innerRadius={50} paddingAngle={5}
                      dataKey="value"
                    >
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} stroke="white" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Statut des commandes */}
              <div className="bg-gradient-to-br from-white via-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100 shadow-sm">
                <h3 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
                  Statut des commandes
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={orderStatusData}>
                    <defs>
                      {orderStatusData.map((entry, index) => (
                        <linearGradient key={`statusGradient-${index}`} id={`statusGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={1}/>
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="status" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    {orderStatusData.map((entry, index) => (
                      <Bar key={entry.status} dataKey="value" fill={`url(#statusGradient-${index})`} radius={[8, 8, 0, 0]} name={entry.status} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* Modal de profil (partagé Admin & Super Admin) */}
      {showProfileModal && (
        <AdminProfileModal 
          isOpen={showProfileModal} 
          onClose={() => setShowProfileModal(false)} 
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </div>
  )
}

export default AdminStatistics