const { getMilkPurchaseSummary, getFarmerMilkPurchase, payFarmer, getMilkSellSummary, getCustomerMilkSells, customerBill } = require('../../../controllers/admin/v1/admin_controller');
const { verifyToken, checkAdmin } = require('../../../middleware/auth');

const router = require('express').Router();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Milk Purchase, Sells & Billing APIs
 */

/**
 * @swagger
 * /api/admin/v1/get-milk-purchase-summary:
 *   get:
 *     summary: Get milk purchase summary
 *     description: Returns total milk purchased and total payable amount grouped by farmers.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Milk purchase summary fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get("/get-milk-purchase-summary",
    verifyToken, 
    checkAdmin, 
    getMilkPurchaseSummary
);
/**
 * @swagger
 * /api/admin/v1/get-farmer-milk-purchase/{id}:
 *   post:
 *     summary: Get farmer milk purchase details
 *     description: Returns all milk purchase entries along with purchase summary for a farmer within the selected date range.
 *     tags:
 *       - Admin
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
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-31
 *     responses:
 *       200:
 *         description: Farmer milk purchase fetched successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.post("/get-farmer-milk-purchase/:id",
    verifyToken, 
    checkAdmin, 
    getFarmerMilkPurchase
);
/**
 * @swagger
 * /api/admin/v1/pay-farmer/{id}:
 *   post:
 *     summary: Pay farmer
 *     description: Generates payment for all pending milk purchases of a farmer within the selected date range.
 *     tags:
 *       - Admin
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
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-31
 *               paymentDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-31
 *               paymentMode:
 *                 type: string
 *                 enum:
 *                   - CASH
 *                   - UPI
 *                 example: CASH
 *               remarks:
 *                 type: string
 *                 example: Weekly payment
 *     responses:
 *       200:
 *         description: Farmer payment completed successfully.
 *       400:
 *         description: Validation failed or no pending purchases found.
 *       401:
 *         description: Unauthorized.
 */
router.post("/pay-farmer/:id",
    verifyToken, 
    checkAdmin, 
    payFarmer
);
/**
 * @swagger
 * /api/admin/v1/get-milk-sell-summary:
 *   get:
 *     summary: Get milk sales summary
 *     description: Returns total milk sold and total receivable amount grouped by customers.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Milk sales summary fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get(
  "/get-milk-sell-summary",
  verifyToken,
  checkAdmin,
  getMilkSellSummary
);
/**
 * @swagger
 * /api/admin/v1/get-customer-milk-sells/{id}:
 *   post:
 *     summary: Get customer milk sales
 *     description: Returns all milk sale entries along with sales summary for a customer within the selected date range.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: integer
 *           example: 7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-31
 *     responses:
 *       200:
 *         description: Customer milk sales fetched successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/get-customer-milk-sells/:id",
  verifyToken,
  checkAdmin,
  getCustomerMilkSells
);
/**
 * @swagger
 * /api/admin/v1/customer-bill/{id}:
 *   post:
 *     summary: Generate customer bill
 *     description: Generates a payment entry for a customer's milk sales within the selected date range.
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: integer
 *           example: 7
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - endDate
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-31
 *               paymentDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-07-31
 *               paymentMode:
 *                 type: string
 *                 enum:
 *                   - CASH
 *                   - UPI
 *                 example: CASH
 *               remarks:
 *                 type: string
 *                 example: Monthly bill payment
 *     responses:
 *       200:
 *         description: Customer bill generated successfully.
 *       400:
 *         description: Validation failed or no milk sales found.
 *       401:
 *         description: Unauthorized.
 */
router.post(
  "/customer-bill/:id",
  verifyToken,
  checkAdmin,
  customerBill
);

module.exports = router;