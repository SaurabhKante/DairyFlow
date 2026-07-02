const pool = require("../../../config/pool");
const { convertUTCtoIST } = require("../../../utils/helperfunction");
const { validationFailed, success, failure, unauthorized } = require("../../../utils/response");

module.exports={
    addFarmer : async(req, res) => {
        const {name, mobile, address} = req.body;
        if(!name || !mobile || name == "" || mobile == ""){
            return validationFailed(res,
                "Farmer Name and Mobile Number Required",
                {},
            );
        }
        try {
            const [result] = await pool.query(`INSERT INTO farmers(farmerName, mobileNo, address) VALUES (?,?,?)`, [name, mobile, address]);
            return success(res,"Farmer Created Successfully", result);
        } catch (err) {
            return failure(res, "Error while creating farmer", err.message);
        }
    },

    getAllFarmers : async(req,res) =>{
        try {
            const [result] = await pool.query("SELECT * FROM farmers WHERE isActive = 1");
            if(!result || result.length === 0){
                return success(res, "No Farmers Found", [])
            }
            result.map((item)=>{
                item.createdAt = convertUTCtoIST(item.createdAt);
                item.modifiedAt = convertUTCtoIST(item.modifiedAt);
            })
            return success(res, "Farmers Fetched Successfully",result);
        } catch (err) {
            return failure(res,err.sql, err.message);
        }
    },

    getFarmer : async(req,res)=>{
        const fid = req.params.id;
        try {
            const [result] = await pool.query(`SELECT * FROM farmers WHERE farmerId = ? AND isActive = 1`,[fid]);
            if(!result || result.length === 0){
                return success(res,"No Farmer Found", []);
            }
            result[0].createdAt = convertUTCtoIST(result[0].createdAt);
            result[0].modifiedAt = convertUTCtoIST(result[0].modifiedAt);
            return success(res, "Farmer Fetched Successfully", result);
        } catch (err) {
            return failure(res, err.sql,err.message);
        }
    },

    updateFarmer : async(req, res)=>{
        const fid = req.params.id;
        const {name, mobile, address} = req.body;
        const key = [];
        const value = [];
        if(name !== undefined && name !== null && name !== ""){
            key.push("farmerName = ?");
            value.push(name);
        }
        if(mobile !== undefined && mobile !== null && mobile !== ""){
            key.push("mobileNo = ?");
            value.push(mobile);
        }
        if(address !== undefined && address !== null && address !== ""){
            key.push("address = ?");
            value.push(address);
        }
        try {
            const [result] = await pool.query(`UPDATE farmers SET ${key.join(", ")} WHERE farmerId = ?`,[...value, fid]);
            if(result.affectedRows <=0){
        return unauthorized(res,"Farmer not found", {});
      }else{
        return success(res,"farmer updated successfully", result);
      }
        } catch (err) {
            return failure(res,err.sql,err.message);
        }
    },

    deleteFarmer : async(req,res)=>{
        const fid = req.params.id;
    try {
      const result = await pool.query(`UPDATE farmers SET isActive = 0 WHERE farmerId = ?`, [fid])
    if(result[0].affectedRows <=0){
      return unauthorized(res, "Farmer not found", {})
    }else{
      return success(res,"Farmer deleted successfully", result);
    }
    } catch (err) {
      return failure(res,err.sql,err.message);
    }
    }
}