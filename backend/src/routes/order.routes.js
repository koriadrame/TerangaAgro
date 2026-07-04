const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');
const { validate, schemas } = require('../middlewares/validation.middleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Gestion des commandes
 */

router.post('/', protect, validate(schemas.createOrder), orderController.createOrder);
router.get('/', protect, orderController.getMyOrders);
router.get('/:id([0-9a-fA-F]{24})', protect, orderController.getOrder);
router.patch('/:id([0-9a-fA-F]{24})/status', protect, restrictTo('producteur', 'producer', 'livreur', 'deliverer', 'admin'), orderController.updateOrderStatus);
router.patch('/:id([0-9a-fA-F]{24})/cancel', protect, orderController.cancelOrder);
router.get('/producer/list', protect, restrictTo('producteur', 'producer'), orderController.getProducerOrders);
router.get('/deliverer/list', protect, restrictTo('livreur', 'deliverer'), orderController.getDelivererOrders);
router.get('/history', protect, orderController.getTransactionHistory);

module.exports = router;