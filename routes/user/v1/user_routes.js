const { updateLocale } = require('moment-timezone');
const { getUsers, loginUser, addUser, changeRole, deleteUser, updateUser } = require('../../../controllers/user/v1/user_controllers');
const {verifyToken,checkAdmin} = require('../../../middleware/auth');

const router = require('express').Router();


router.get('/get-users',verifyToken, getUsers);
router.post('/login-user', loginUser);
router.post('/sign-up', addUser);
router.post('/update-role',verifyToken,checkAdmin, changeRole);
router.delete('/delete-user/:id',verifyToken,checkAdmin, deleteUser);
router.put('/update-user/:id',verifyToken, updateUser);

module.exports=router;