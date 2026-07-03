const { getMilkRate, updateMilkRate, deleteMilkRate, addMilkRate } = require('../../../controllers/milk_rates/v1/milk_rates_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const router  = require('express').Router();

router.get('/get-rates', verifyToken,checkAdmin,getMilkRate)
router.post('/update-rates/:id', verifyToken,checkAdmin, updateMilkRate)
router.delete('/delete-rates', verifyToken,checkAdmin, deleteMilkRate)
router.post('/add-rates', verifyToken,checkAdmin, addMilkRate)

module.exports = router;