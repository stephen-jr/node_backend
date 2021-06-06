const router = require('express').Router();
const auth = require('../middleware/check-auth')
const authAction = require('../middleware/auth-action');
const contractController = require('../controllers/contract');

router.get('/', auth, authAction, contractController.getAllContracts);

router.get('/:contractId', auth, authAction, contractController.getContractDetails);

router.post('/', auth, authAction, contractController.handleQuery);

router.patch('/:contractId', auth, authAction, contractController.endContract);

router.delete('/:contractId', auth, authAction, contractController.deleteContract);

module.exports = router;