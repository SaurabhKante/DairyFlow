const { addFarmer, getAllFarmers, getFarmer, deleteFarmer, updateFarmer, addMilkPurchase } = require('../../../controllers/farmer/v1/farmer_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Farmers
 *   description: Farmer Management APIs
 */

/**
 * @swagger
 * /add-farmer:
 *   post:
 *     summary: Create a new farmer
 *     description: Creates a new farmer. Admin access required.
 *     tags:
 *       - Farmers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - mobile
 *             properties:
 *               name:
 *                 type: string
 *                 example: Saurabh Kante
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Pune, Maharashtra
 *     responses:
 *       200:
 *         description: Farmer created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.post("/add-farmer",verifyToken, checkAdmin, addFarmer);
/**
 * @swagger
 * /get-all-farmers:
 *   get:
 *     summary: Get all active farmers
 *     description: Returns all active farmers.
 *     tags:
 *       - Farmers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Farmers fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get('/get-all-farmers', verifyToken, getAllFarmers);
/**
 * @swagger
 * /get-farmer/{id}:
 *   get:
 *     summary: Get farmer by ID
 *     description: Fetch a farmer using Farmer ID.
 *     tags:
 *       - Farmers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Farmer ID
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Farmer fetched successfully.
 *       404:
 *         description: Farmer not found.
 *       401:
 *         description: Unauthorized.
 */
router.get('/get-farmer/:id', verifyToken, getFarmer);
/**
 * @swagger
 * /delete-farmer/{id}:
 *   delete:
 *     summary: Delete farmer
 *     description: Soft deletes a farmer by setting isActive to 0. Admin access required.
 *     tags:
 *       - Farmers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Farmer ID
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Farmer deleted successfully.
 *       404:
 *         description: Farmer not found.
 *       401:
 *         description: Unauthorized.
 */
router.delete('/delete-farmer/:id', verifyToken, checkAdmin, deleteFarmer);
/**
 * @swagger
 * /update-farmer/{id}:
 *   post:
 *     summary: Update farmer
 *     description: Updates farmer information. Admin access required.
 *     tags:
 *       - Farmers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Farmer ID
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mahesh Patil
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Nashik
 *     responses:
 *       200:
 *         description: Farmer updated successfully.
 *       404:
 *         description: Farmer not found.
 *       401:
 *         description: Unauthorized.
 */
router.post('/update-farmer/:id', verifyToken,checkAdmin, updateFarmer);
/**
 * @swagger
 * /milk-purchase/{id}:
 *   post:
 *     summary: Add milk purchase
 *     description: Adds a milk purchase entry for a farmer using the latest active milk rate.
 *     tags:
 *       - Farmers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Farmer ID
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 format: float
 *                 example: 18.5
 *               remarks:
 *                 type: string
 *                 example: Morning collection
 *     responses:
 *       200:
 *         description: Milk purchase added successfully.
 *       400:
 *         description: Invalid request or no active milk rate found.
 *       401:
 *         description: Unauthorized.
 */
router.post('/milk-purchase/:id', verifyToken, addMilkPurchase);

module.exports = router;