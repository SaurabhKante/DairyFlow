const { getMilkPurchaseSummary, getFarmerMilkPurchase, payFarmer } = require('../../../controllers/admin/v1/admin_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const router = require('express').Router();

router.get("/get-milk-purchase-summary",verifyToken, checkAdmin, getMilkPurchaseSummary);
router.post("/get-farmer-milk-purchase/:id",verifyToken, checkAdmin, getFarmerMilkPurchase);
router.post("/pay-farmer/:id",verifyToken, checkAdmin, payFarmer);


module.exports = router;