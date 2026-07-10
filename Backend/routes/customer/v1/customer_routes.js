const { addCustomer, getAllCustomers, getCustomer, deleteCustomer, updateCustomer } = require('../../../controllers/customer/v1/customer_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const router = require('express').Router();
/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customer Management APIs
 */

/**
 * @swagger
 * /api/customer/v1/add-customer:
 *   post:
 *     summary: Create a new customer
 *     description: Creates a new customer. Admin access required.
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - mobileNum
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: Amit Sharma
 *               mobileNum:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Pune, Maharashtra
 *     responses:
 *       201:
 *         description: Customer registered successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.post("/add-customer",verifyToken, checkAdmin, addCustomer);
/**
 * @swagger
 * /api/customer/v1/get-all-customers:
 *   get:
 *     summary: Get all active customers
 *     description: Returns all active customers.
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customers fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get('/get-all-customers', verifyToken, getAllCustomers);
/**
 * @swagger
 * /api/customer/v1/get-customer/{id}:
 *   get:
 *     summary: Get customer by ID
 *     description: Returns customer details using Customer ID.
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Customer fetched successfully.
 *       404:
 *         description: Customer not found.
 *       401:
 *         description: Unauthorized.
 */
router.get('/get-customer/:id', verifyToken, getCustomer);
/**
 * @swagger
 * /api/customer/v1/delete-customer/{id}:
 *   delete:
 *     summary: Delete customer
 *     description: Soft deletes a customer by setting isActive to 0. Admin access required.
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Customer deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Customer not found.
 */
router.delete('/delete-customer/:id', verifyToken, checkAdmin, deleteCustomer);
/**
 * @swagger
 * /api/customer/v1/update-customer/{id}:
 *   post:
 *     summary: Update customer
 *     description: Updates customer information. Admin access required.
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: integer
 *           example: 3
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: Amit Sharma
 *               mobileNum:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Mumbai, Maharashtra
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Customer not found.
 */
router.post('/update-customer/:id', verifyToken,checkAdmin, updateCustomer);

module.exports = router;