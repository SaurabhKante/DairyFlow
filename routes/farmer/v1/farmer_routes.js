const { addFarmer, getAllFarmers, getFarmer, deleteFarmer, updateFarmer } = require('../../../controllers/farmer/v1/farmer_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const router = require('express').Router();

router.post("/add-farmer",verifyToken, checkAdmin, addFarmer);
router.get('/get-all-farmers', verifyToken, getAllFarmers);
router.get('/get-farmer/:id', verifyToken, getFarmer);
router.delete('/delete-farmer/:id', verifyToken, checkAdmin, deleteFarmer);
router.post('/update-farmer/:id', verifyToken,checkAdmin, updateFarmer);

module.exports = router;