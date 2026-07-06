const  pool  = require("../../../config/pool");
const { convertUTCtoIST } = require("../../../utils/helperfunction");
const { validationFailed, success, failure, unauthorized } = require("../../../utils/response");


module.exports = {
    addMilkRate: async (req, res) => {

    const { farmerRate, customerRate, remarks } = req.body;

    if (
        farmerRate == null ||
        customerRate == null
    ) {
        return validationFailed(
            res,
            "Farmer Rate and Customer Rate are required.",
            {}
        );
    }

    // Get current date in YYYY-MM-DD format
    const effectiveFrom = new Date().toISOString().split("T")[0];

    try {

        const [existing] = await pool.query(
            `SELECT *
             FROM milk_rates
             WHERE effectiveFrom = ?
             AND isActive = 1`,
            [effectiveFrom]
        );

        if (existing.length > 0) {
            return validationFailed(
                res,
                "Milk rate already exists for today.",
                {}
            );
        }

        const [result] = await pool.query(
            `INSERT INTO milk_rates
            (farmerRate, customerRate, effectiveFrom, remarks)
            VALUES (?,?,?,?)`,
            [
                farmerRate,
                customerRate,
                effectiveFrom,
                remarks
            ]
        );

        return success(
            res,
            "Milk Rate Created Successfully",
            result
        );

    } catch (err) {

        return failure(
            res,
            "Error while creating milk rate",
            err.message
        );

    }
},
getMilkRate: async (req, res) => {

    try {

        const [result] = await pool.query(
            `SELECT *
             FROM milk_rates
             WHERE isActive = 1`
        );

        if (result.length === 0) {
            return success(
                res,
                "No Milk Rate Found",
                []
            );
        }

        result[0].createdAt = convertUTCtoIST(result[0].createdAt);
        result[0].modifiedAt = convertUTCtoIST(result[0].modifiedAt);

        return success(
            res,
            "Milk Rate Fetched Successfully",
            result
        );

    } catch (err) {

        return failure(
            res,
            err.sql,
            err.message
        );

    }

},

deleteMilkRate: async (req, res) => {

    const rateId = req.params.id;

    try {

        const [check] = await pool.query(
            `SELECT *
             FROM milk_rates
             WHERE rateId = ?
             AND isActive = 1`,
            [rateId]
        );

        if (check.length === 0) {
            return success(
                res,
                "Milk Rate Not Found",
                []
            );
        }

        const [result] = await pool.query(
            `UPDATE milk_rates
             SET isActive = 0
             WHERE rateId = ?`,
            [rateId]
        );

        return success(
            res,
            "Milk Rate Deleted Successfully",
            result
        );

    } catch (err) {

        return failure(
            res,
            err.sql,
            err.message
        );

    }

},

updateMilkRate: async (req, res) => {

    const rateId = req.params.id;
    const { farmerRate, customerRate} = req.body;

    const key = [];
    const value = [];

    if (farmerRate !== undefined && farmerRate !== null && farmerRate !== "") {
        key.push("farmerRate = ?");
        value.push(farmerRate);
    }

    if (customerRate !== undefined && customerRate !== null && customerRate !== "") {
        key.push("customerRate = ?");
        value.push(customerRate);
    }

    if (key.length === 0) {
        return validationFailed(
            res,
            "No fields provided for update.",
            {}
        );
    }

    try {

        const [result] = await pool.query(
            `UPDATE milk_rates
             SET ${key.join(", ")}
             WHERE rateId = ? AND isActive = 1`,
            [...value, rateId]
        );

        if (result.affectedRows <= 0) {
            return unauthorized(
                res,
                "Milk Rate not found",
                {}
            );
        }

        return success(
            res,
            "Milk Rate updated successfully",
            result
        );

    } catch (err) {

        return failure(
            res,
            err.sql,
            err.message
        );

    }

},
}