const { addCustomer, getAllCustomers, getCustomer, deleteCustomer, updateCustomer } = require('../../../controllers/customer/v1/customer_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const router = require('express').Router();

router.post("/add-customer",verifyToken, checkAdmin, addCustomer);
router.get('/get-all-customers', verifyToken, getAllCustomers);
router.get('/get-customer/:id', verifyToken, getCustomer);
router.delete('/delete-customer/:id', verifyToken, checkAdmin, deleteCustomer);
router.post('/update-customer/:id', verifyToken,checkAdmin, updateCustomer);

module.exports = router;