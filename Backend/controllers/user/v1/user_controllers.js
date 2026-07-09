const config = require("../../../constants/constants");
const pool = require("../../../config/pool");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const {
  success,
  failure,
  unauthorized,
  validationFailed,
} = require("../../../utils/response");
const { convertUTCtoIST } = require("../../../utils/helperfunction");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const [result] = await pool.query(
        "SELECT * FROM users WHERE isActive = 1",
      );

      if (!result || result.length === 0) {
        return success(res, "No data found", []);
      }
      // result[0].createdAt = convertUTCtoIST(result[0].createdAt);
      result.map((item)=>{
        item.createdAt = convertUTCtoIST(item.createdAt);
        item.modifiedAt = convertUTCtoIST(item.modifiedAt);
      })
      return success(res, "Users fetched successfully", result);
    } catch (err) {
      return failure(res, "Error while finding users", err.message);
    }
  },

  getProfile: async (req, res) => {

    const userId = req.user.id;

    try {

        const [result] = await pool.query(
            `SELECT
                userId,
                fullName,
                email,
                mobileNo,
                role,
                createdAt,
                modifiedAt
            FROM users
            WHERE userId = ?
            AND isActive = 1`,
            [userId]
        );

        if (result.length === 0) {
            return success(
                res,
                "User not found",
                []
            );
        }

        result[0].createdAt = convertUTCtoIST(result[0].createdAt);
        result[0].modifiedAt = convertUTCtoIST(result[0].modifiedAt);

        return success(
            res,
            "User fetched successfully",
            result[0]
        );

    } catch (err) {

        return failure(
            res,
            "Error while fetching user",
            err.message
        );

    }

},

  addUser: async (req, res) => {

    const { fullName, mobile, email, password } = req.body;

    if (!fullName || !mobile || !email || !password) {
        return validationFailed(
            res,
            "Full Name, Mobile, Email and Password are required.",
            {}
        );
    }

    try {

        // Check if email already exists
        const [existingUser] = await pool.query(
            `SELECT userId, isActive
             FROM users
             WHERE email = ?`,
            [email]
        );

        // Email already exists and user is active
        if (existingUser.length > 0 && existingUser[0].isActive === 1) {
            return validationFailed(
                res,
                "A user with this email already exists.",
                {}
            );
        }

        const hashedPassword = await bcrypt.hash(
            password,
            config.SALT_ROUNDS
        );

        // Reactivate existing inactive user
        if (existingUser.length > 0 && existingUser[0].isActive === 0) {

            const [result] = await pool.query(
                `UPDATE users
                 SET
                    fullName = ?,
                    mobileNo = ?,
                    password = ?,
                    isActive = 1
                 WHERE email = ?`,
                [
                    fullName,
                    mobile,
                    hashedPassword,
                    email
                ]
            );

            return success(
                res,
                "User account reactivated successfully.",
                result
            );
        }

        // Create new user
        const [result] = await pool.query(
            `INSERT INTO users
            (
                fullName,
                mobileNo,
                email,
                password
            )
            VALUES (?,?,?,?)`,
            [
                fullName,
                mobile,
                email,
                hashedPassword
            ]
        );

        return success(
            res,
            "User created successfully.",
            result
        );

    } catch (err) {

        return failure(
            res,
            "Error while creating user.",
            err.message
        );

    }

},

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return validationFailed(res, "Email and Password are required", {});
      }

      const [users] = await pool.query(
        `
                SELECT
                    userId,
                    fullName,
                    email,
                    mobileNo,
                    password,
                    role,
                    isActive
                FROM users
                WHERE email = ? and isActive = 1
                `,
        [email],
      );

      const user = users[0];

      if (user) {
        const hashedPassword = user.password;
        const status = await bcrypt.compare(password, hashedPassword);
        if (status) {
          const res_user = {
            uid: user.userId,
            email: user.email,
          };
          const payload = {
               id: user.userId,
               role: user.role
            }
            const token = jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
          return success(res, "Login successful", {
            userId: user.userId,
            email: user.email,
            role: user.role,
            token: token
          });
        }else {
        return unauthorized(res, "Invalid password", {});
      }
      }else {
        return unauthorized(res, "Invalid email", {});
      }

    } catch (err) {
      return failure(res, "Error while logging in", err.message);
    }
  },

  // Only Admin acccess.
  changeRole: async (req, res) => {
    const uid = req.params.id;
    const {role} = req.body;
    try{
      const result = await pool.query(
        `UPDATE users SET role=? WHERE userId=? AND isActive=1`,
        [role, uid]
      )

      if(result[0].affectedRows == 0){
        return unauthorized(res, "User not found", {});
      }else{
        return success(res, "User Role updated successfully", result);
      }

    }catch(e){
      return failure(res, e.sql, e.message);
    }
  },


  deleteUser : async(req,res) =>{
    const uid = req.params.id;
    try {
      const result = await pool.query(`UPDATE users SET isActive = 0 WHERE userId = ?`, [uid])
    if(result[0].affectedRows <=0){
      return unauthorized(res, "User not found", {})
    }else{
      return success(res,"User deleted successfully", result);
    }
    } catch (err) {
      return failure(res,err.sql,err.message);
    }
    
  },

  updateUser: async (req,res)=>{
    const uid = req.user.id;
    const {name, mobile, email, password} = req.body;
    const key = [];
    const value = [];
    if(name !== undefined && name !== null && name !== ""){
      key.push("fullName = ?");
      value.push(name);
    }
    if(mobile !== undefined && mobile !== null && mobile !== ""){
      key.push("mobileNo = ?");
      value.push(mobile);
    }
    if(email !== undefined && email !== null && email !== ""){
      key.push("email = ?");
      value.push(email);
    }
    if(password !== undefined && password !== null && password !== ""){
       const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
      key.push("password = ?");
      value.push(hashedPassword);
    }
    try {
      const result = await pool.query(`UPDATE users SET ${key.join(", ")} WHERE userId = ?`,[...value,uid]);
      if(result[0].affectedRows <=0){
        return unauthorized(res,"User not found", {});
      }else{
        return success(res,"User updated successfully", result);
      }
    } catch (err) {
      return failure(res,err.sql,err.message);
    }
  }
}; 
