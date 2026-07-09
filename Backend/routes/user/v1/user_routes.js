const { updateLocale } = require('moment-timezone');
const { getUsers, loginUser, addUser, changeRole, deleteUser, updateUser, getProfile } = require('../../../controllers/user/v1/user_controllers');
const {verifyToken,checkAdmin} = require('../../../middleware/auth');

const router = require('express').Router();


router.get('/get-users',verifyToken,checkAdmin, getUsers);
router.post('/login-user', loginUser);
router.post('/sign-up',verifyToken,checkAdmin, addUser);
router.put('/update-role/:id',verifyToken,checkAdmin, changeRole);
router.delete('/delete-user/:id',verifyToken,checkAdmin, deleteUser);
router.put('/update-user',verifyToken, updateUser);
router.get('/get-profile',verifyToken,getProfile);

module.exports=router;