const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Formation = require('../models/Formation');

// 1. Obtenir les statistiques du tableau de bord admin
exports.getDashboard = async (req, res) => {
  try {
    // Statistiques des utilisateurs
    const totalUsers = await User.countDocuments({ isDeleted: { $ne: true } });
    
    const rolesAggregate = await User.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    const byRole = rolesAggregate.map(item => ({ role: item._id, count: item.count }));

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const newThisWeek = await User.countDocuments({
      isDeleted: { $ne: true },
      createdAt: { $gte: oneWeekAgo }
    });

    // Statistiques des produits
    const totalProducts = await Product.countDocuments();
    const availableProducts = await Product.countDocuments({ isAvailable: true });

    // Statistiques des commandes
    const totalOrders = await Order.countDocuments();
    const statusAggregate = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byStatus = statusAggregate.map(item => ({ status: item._id, count: item.count }));

    // Revenu total (hors commandes annulées)
    const revenueAggregate = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const revenueTotal = revenueAggregate.length > 0 ? revenueAggregate[0].total : 0;

    // Commandes récentes (10 dernières commandes)
    const recentOrders = await Order.find()
      .populate('consumer', 'firstName lastName email phone')
      .populate('items.product', 'name price')
      .sort('-createdAt')
      .limit(10);

    res.status(200).json({
      status: 'success',
      data: {
        users: {
          total: totalUsers,
          byRole,
          newThisWeek
        },
        products: {
          total: totalProducts,
          available: availableProducts
        },
        orders: {
          total: totalOrders,
          byStatus
        },
        revenue: {
          total: revenueTotal
        },
        recentOrders
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 2. Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 50 } = req.query;
    const query = { isDeleted: { $ne: true } };

    if (role && role !== 'all') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: String(search), $options: 'i' } },
        { lastName: { $regex: String(search), $options: 'i' } },
        { email: { $regex: String(search), $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find(query)
      .skip(skip)
      .limit(limitNum)
      .sort('-createdAt');

    const total = await User.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: users.length,
      total,
      data: { users }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 3. Obtenir les détails d'un utilisateur
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 4. Modifier le statut général d'un utilisateur (active/inactive)
exports.updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Utilisateur non trouvé'
      });
    }

    if (req.body.status === 'toggle') {
      user.isActive = !user.isActive;
    } else if (req.body.status !== undefined) {
      user.isActive = req.body.status === 'true' || req.body.status === true || req.body.status === 'active';
    }

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Statut de l\'utilisateur mis à jour',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 5. Toggle le statut d'un utilisateur
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Utilisateur non trouvé'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Statut de l\'utilisateur basculé',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 6. Bloquer un utilisateur
exports.blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Utilisateur bloqué avec succès',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 7. Débloquer un utilisateur
exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Utilisateur débloqué avec succès',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 8. Supprimer un utilisateur (soft delete)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Utilisateur non trouvé'
      });
    }

    user.isDeleted = true;
    user.deletedAt = new Date();
    user.isActive = false; // Désactiver par précaution
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Utilisateur supprimé (archivé) avec succès'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 9. Modifier le rôle d'un utilisateur
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    
    // Rôles acceptés
    const validRoles = ['consommateur', 'producteur', 'livreur', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        status: 'error',
        message: 'Rôle invalide'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Rôle de l\'utilisateur mis à jour',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 10. Obtenir toutes les commandes
exports.getAllOrders = async (req, res) => {
  try {
    const { status, startDate, endDate, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const orders = await Order.find(query)
      .populate('consumer', 'firstName lastName email phone')
      .populate('items.product', 'name price')
      .skip(skip)
      .limit(limitNum)
      .sort('-createdAt');

    const total = await Order.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: orders.length,
      total,
      data: { orders }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 11. Obtenir les produits en attente d'approbation
exports.getPendingProducts = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const query = { isApproved: false };

    const products = await Product.find(query)
      .populate('producer', 'firstName lastName email phone profilePicture producteurInfo')
      .skip(skip)
      .limit(limitNum)
      .sort('-createdAt');

    const total = await Product.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: products.length,
      total,
      data: { products }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 12. Approuver un produit
exports.approveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isApproved: true, isAvailable: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Produit non trouvé'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Produit approuvé avec succès',
      data: { product }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 13. Obtenir les statistiques de ventes
exports.getSalesStats = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    let matchDate = new Date();

    if (period === 'day') {
      matchDate.setDate(matchDate.getDate() - 1);
      groupBy = { $dateToString: { format: '%Y-%m-%d %H:00', date: '$createdAt' } };
    } else if (period === 'week') {
      matchDate.setDate(matchDate.getDate() - 7);
    } else if (period === 'month') {
      matchDate.setMonth(matchDate.getMonth() - 1);
    } else if (period === 'year') {
      matchDate.setFullYear(matchDate.getFullYear() - 1);
      groupBy = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
    }

    const salesAggregate = await Order.aggregate([
      { $match: { createdAt: { $gte: matchDate }, status: { $ne: 'cancelled' } } },
      {
        $group: {
          _id: groupBy,
          sales: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: salesAggregate
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 14. Obtenir les statistiques utilisateurs
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isDeleted: { $ne: true } });
    const activeUsers = await User.countDocuments({ isDeleted: { $ne: true }, isActive: true });
    const inactiveUsers = await User.countDocuments({ isDeleted: { $ne: true }, isActive: false });

    const rolesAggregate = await User.aggregate([
      { $match: { isDeleted: { $ne: true } } },
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        roles: rolesAggregate
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// 15. Publier/Dépublier une formation
exports.toggleFormationPublish = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({
        status: 'error',
        message: 'Formation non trouvée'
      });
    }

    formation.isPublished = !formation.isPublished;
    await formation.save();

    res.status(200).json({
      status: 'success',
      message: `Formation ${formation.isPublished ? 'publiée' : 'dépubliée'} avec succès`,
      data: { formation }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};
