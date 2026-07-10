const { getMilkRate, updateMilkRate, deleteMilkRate, addMilkRate } = require('../../../controllers/milk_rates/v1/milk_rates_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const router  = require('express').Router();
/**
 * @swagger
 * tags:
 *   name: Milk Rates
 *   description: Milk Rate Management APIs
 */

/**
 * @swagger
 * /api/milk-rates/v1/get-rates:
 *   get:
 *     summary: Get all active milk rates
 *     description: Returns all active milk rates.
 *     tags:
 *       - Milk Rates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Milk rates fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get('/get-rates', verifyToken,checkAdmin,getMilkRate)
/**
 * @swagger
 * /api/milk-rates/v1/update-rates/{id}:
 *   post:
 *     summary: Update milk rate
 *     description: Updates farmer rate and/or customer rate of an existing milk rate.
 *     tags:
 *       - Milk Rates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Milk Rate ID
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               farmerRate:
 *                 type: number
 *                 format: float
 *                 example: 39.00
 *               customerRate:
 *                 type: number
 *                 format: float
 *                 example: 53.50
 *     responses:
 *       200:
 *         description: Milk rate updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Milk rate not found.
 */
router.post('/update-rates/:id', verifyToken,checkAdmin, updateMilkRate)
/**
 * @swagger
 * /api/milk-rates/v1/delete-rates/{id}:
 *   delete:
 *     summary: Delete milk rate
 *     description: Soft deletes a milk rate by setting isActive to 0.
 *     tags:
 *       - Milk Rates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Milk Rate ID
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Milk rate deleted successfully.
 *       404:
 *         description: Milk rate not found.
 *       401:
 *         description: Unauthorized.
 */
router.delete('/delete-rates/:id', verifyToken, checkAdmin, deleteMilkRate);
/**
 * @swagger
 * /api/milk-rates/v1/add-rates:
 *   post:
 *     summary: Add milk rate
 *     description: Creates a new milk rate for the current date. Only one active milk rate can exist per day.
 *     tags:
 *       - Milk Rates
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - farmerRate
 *               - customerRate
 *             properties:
 *               farmerRate:
 *                 type: number
 *                 format: float
 *                 example: 38.50
 *               customerRate:
 *                 type: number
 *                 format: float
 *                 example: 52.00
 *               remarks:
 *                 type: string
 *                 example: Revised milk rates effective from today.
 *     responses:
 *       200:
 *         description: Milk rate created successfully.
 *       400:
 *         description: Validation failed or today's milk rate already exists.
 *       401:
 *         description: Unauthorized.
 */
router.post('/add-rates', verifyToken,checkAdmin, addMilkRate)

module.exports = router;