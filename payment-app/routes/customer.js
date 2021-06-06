const router = require('express').Router();

const customerController = require('../controllers/customer');

router.get('/', customerController.getAll);

router.post('/signup', customerController.signUp);

router.post('/login', customerController.login);

module.exports = router;