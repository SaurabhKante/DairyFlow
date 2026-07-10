const { updateLocale } = require('moment-timezone');
const { getUsers, loginUser, addUser, changeRole, deleteUser, updateUser, getProfile } = require('../../../controllers/user/v1/user_controllers');
const {verifyToken,checkAdmin} = require('../../../middleware/auth');

const router = require('express').Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Authentication & User Management APIs
 */

/**
 * @swagger
 * /get-users:
 *   get:
 *     summary: Get all active users
 *     description: Returns all active users. Admin access required.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get('/get-users',verifyToken,checkAdmin, getUsers);
/**
 * @swagger
 * /login-user:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Invalid email or password.
 */
router.post('/login-user', loginUser);
/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user. Only Admin can create users.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - mobile
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Rahul Sharma
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: Rahul@123
 *     responses:
 *       200:
 *         description: User created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */
router.post('/sign-up',verifyToken,checkAdmin, addUser);
/**
 * @swagger
 * /update-role/{id}:
 *   put:
 *     summary: Change user role
 *     description: Updates the role of a user. Only Admin can perform this operation.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum:
 *                   - ADMIN
 *                   - USER
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: User role updated successfully.
 *       401:
 *         description: Unauthorized.
 */
router.put('/update-role/:id',verifyToken,checkAdmin, changeRole);
/**
 * @swagger
 * /delete-user/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Soft deletes a user by setting isActive to 0. Only Admin can perform this operation.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description: Unauthorized.
 */
router.delete('/delete-user/:id',verifyToken,checkAdmin, deleteUser);
/**
 * @swagger
 * /update-user:
 *   put:
 *     summary: Update logged in user
 *     description: Updates profile details of the currently logged in user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 example: rahul@gmail.com
 *               password:
 *                 type: string
 *                 example: Rahul@123
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       401:
 *         description: Unauthorized.
 */
router.put('/update-user',verifyToken, updateUser);
/**
 * @swagger
 * /get-profile:
 *   get:
 *     summary: Get logged in user's profile
 *     description: Returns profile details of the currently logged in user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully.
 *       401:
 *         description: Unauthorized.
 */
router.get('/get-profile',verifyToken,getProfile);

module.exports=router;