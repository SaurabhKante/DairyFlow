const { getAnalytics } = require('../../../controllers/analytics/v1/analytics_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const  router = require('express').Router();

router.get("/get-analytics",verifyToken,checkAdmin, getAnalytics);

module.exports=router;