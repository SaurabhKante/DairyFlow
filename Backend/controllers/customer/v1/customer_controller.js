const pool = require("../../../config/pool");
const { convertUTCtoIST } = require("../../../utils/helperfunction");
const { validationFailed, success, failure, unauthorized, created, recordUpdated } = require("../../../utils/response");

module.exports={
    addCustomer : async(req, resp) => {
        const {customerName, mobileNum, address} = req.body;
        if(!customerName || !mobileNum || customerName == "" || mobileNum == ""){
            return validationFailed(resp,
                "Customer Name and Mobile Number is Required",
                {},
            );
        }
        try {
            const [result] = await pool.query(`INSERT INTO customers(customerName, mobileNo, address) VALUES (?,?,?)`, [customerName, mobileNum, address]);
            return created(resp,"Customer Registered Successfully", result);
        } catch (err) {
            return failure(resp, "Error on Registering Customer", err.message);
        }
    },

    getAllCustomers: async(req,resp)=>{
        try {
            const [result] = await pool.query("SELECT * FROM customers WHERE isActive = 1");
            if(!result || result.length === 0){
                return success(resp, "No Customers Found", [])
            }
            result.map((item)=>{
                item.createdAt = convertUTCtoIST(item.createdAt);
                item.modifiedAt = convertUTCtoIST(item.modifiedAt);
            })
            return success(resp, "Found Customers Successfully",result);
        } catch (err) {
            return failure(resp, err.sql, err.message);
        }
    },

    getCustomer:async (req, resp)=>{
        const custId = req.params.id;
        try {
            const [result] = await pool.query(`SELECT * FROM customers WHERE customerId=? AND isActive = 1`,[custId]);
            if(!result || result.length === 0){
                return success(resp, "Requested Cutomer not found", [])
            }
            
            result[0].createdAt = convertUTCtoIST(item.createdAt);
            result[0].modifiedAt = convertUTCtoIST(item.modifiedAt);

            return success(resp, "Found Requested Customer Successfully",result);
        } catch (err) {
            return failure(resp, err.sql, err.message);
        }
    },

    updateCustomer:async(req, resp)=>{
        const custId = req.params.id;
        const {customerName, mobileNum, address} = req.body;
        const key = [];
        const value = [];
        if(undefined !== customerName && null !== customerName && "" !== customerName){
            key.push("customerName = ?");
            value.push(customerName);
        }
        if(undefined !== mobileNum && null !== mobileNum && "" !== mobileNum){
            key.push("mobileNo = ?");
            value.push(mobileNum);
        }
        if(undefined !== address && null !== address && "" !== address){
            key.push("address = ?");
            value.push(address);
        }
        try {
            const [result] = await pool.query(`UPDATE customers SET ${key.join(", ")} WHERE customerId = ?`,[...value, custId]);
            if(result.affectedRows <=0){
                return unauthorized(resp,"Customer not found", {});
            }else{
                return recordUpdated(resp,"Customer updated successfully", result);
            }
        } catch (err) {
            return failure(resp,err.sql,err.message);
        }
    },

    deleteCustomer: async(req, resp)=>{
        const custId = req.params.id;
        try{
            const result = await pool.query(`UPDATE customers SET isActive = 0 WHERE customerId = ?`, [custId])
            if(result[0].affectedRows <= 0){
                return unauthorized(resp, "Customer not found", {});
            }else{
                return success(resp ,"Deleted Customer successfully", result);
            }
        } catch(err){
            return failure(resp, err.sql, err.message);
        } 
    }
}