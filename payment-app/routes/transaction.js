const router = require('express').Router();

const transactionController = require('../controllers/transaction');
const auth  = require('../middleware/check-auth');
const authAction = require('../middleware/auth-action');

router.get('/', auth, authAction, transactionController.getAll);

router.get('/:transactionId', auth, authAction, transactionController.getTransactionDetails);

router.post('/', auth, authAction, transactionController.createTransaction);

router.patch('/:transactionId', auth, authAction, transactionController.completeTransaction);

router.delete('/:transactionId', auth, authAction, transactionController.deleteTransaction);

module.exports = router;