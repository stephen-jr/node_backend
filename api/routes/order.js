/* jshint esversion: 6 */
const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const OrderController = require('../controllers/order');

router.get('/:orderId', checkAuth, OrderController.getOrder);

router.get('/', OrderController.getAllOrders);

router.post('/', checkAuth, OrderController.createOrder);

router.delete('/:orderId', checkAuth, OrderController.deleteOrder);

module.exports = router;