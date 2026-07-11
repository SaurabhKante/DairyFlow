const { getAnalytics, getPurchasedMilkDetails, getSoldMilkDetails, getPaidToFarmersDetails, getReceivedFromCustomersDetails, getPendingFarmerPayments, getPendingCustomerPayments } = require('../../../controllers/analytics/v1/analytics_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const  router = require('express').Router();

router.post("/get-analytics",verifyToken,checkAdmin, getAnalytics);
router.post("/get-purchased-milk-details",verifyToken,checkAdmin, getPurchasedMilkDetails);
router.post("/get-sold-milk-details",verifyToken,checkAdmin, getSoldMilkDetails);
router.post("/get-paidto-farmer-details",verifyToken,checkAdmin, getPaidToFarmersDetails);
router.post("/get-received-from-customer-details",verifyToken,checkAdmin, getReceivedFromCustomersDetails);
router.post("/get-pending-farmer-payments",verifyToken,checkAdmin, getPendingFarmerPayments);
router.post("/get-pending-customer-payments",verifyToken,checkAdmin, getPendingCustomerPayments);

module.exports=router;