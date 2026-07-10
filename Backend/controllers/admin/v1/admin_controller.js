const pool = require("../../../config/pool");
const { convertUTCtoIST } = require("../../../utils/helperfunction");
const { success, failure, validationFailed } = require("../../../utils/response");

module.exports = {
  // farmers
  getMilkPurchaseSummary: async (req, res) => {
    try {
      const [result] = await pool.query(`
                SELECT
                    f.farmerId,
                    f.farmerName,
                    f.mobileNo,
                    SUM(mp.quantity) AS totalQuantity,
                    SUM(mp.totalAmount) AS totalAmount
                FROM farmers f
                INNER JOIN milk_purchase mp
                    ON f.farmerId = mp.farmerId
                WHERE
                    f.isActive = 1
                    AND mp.isActive = 1
                GROUP BY
                    f.farmerId,
                    f.farmerName,
                    f.mobileNo
                ORDER BY
                    f.farmerName ASC
            `);

      if (result.length === 0) {
        return success(res, "No Milk Purchase Found", []);
      }

      return success(res, "Milk Purchase Summary Fetched Successfully", result);
    } catch (err) {
      return failure(res, err.sql, err.message);
    }
  },

  getFarmerMilkPurchase: async (req, res) => {
    const farmerId = req.params.id;
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return validationFailed(res, "Start Date and End Date are required.", {});
    }

    try {
      // Fetch purchase details
      const [result] = await pool.query(
        `
            SELECT
                mp.purchaseId,
                mp.quantity,
                mr.farmerRate,
                mp.totalAmount,
                mp.paymentId,
                mp.remarks,
                mp.createdAt,
                mp.modifiedAt
            FROM milk_purchase mp
            INNER JOIN milk_rates mr
                ON mp.rateId = mr.rateId
            WHERE
                mp.farmerId = ?
                AND mp.isActive = 1
                AND DATE(mp.createdAt) BETWEEN ? AND ?
            ORDER BY mp.createdAt DESC
            `,
        [farmerId, startDate, endDate],
      );

      // Fetch summary
      const [summary] = await pool.query(
        `
            SELECT
                COALESCE(SUM(quantity), 0) AS totalQuantity,
                COALESCE(SUM(totalAmount), 0) AS totalAmount
            FROM milk_purchase
            WHERE
                farmerId = ?
                AND isActive = 1
                AND paymentId IS NULL
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
        [farmerId, startDate, endDate],
      );

      result.forEach((item) => {
        item.createdAt = convertUTCtoIST(item.createdAt);
        item.modifiedAt = convertUTCtoIST(item.modifiedAt);
      });

      return success(res, "Farmer Milk Purchase Fetched Successfully", {
        summary: summary[0],
        purchases: result,
      });
    } catch (err) {
      return failure(res, err.sql, err.message);
    }
  },

  payFarmer: async (req, res) => {
    const farmerId = req.params.id;
    const createdBy = req.user.id;

    const {
      startDate,
      endDate,
      paymentDate = new Date().toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      }),
      paymentMode = "CASH",
      remarks,
    } = req.body;

    if (!startDate || !endDate || !paymentDate) {
      return validationFailed(
        res,
        "Start Date, End Date and Payment Date are required.",
        {},
      );
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Calculate total pending amount
      const [summary] = await connection.query(
        `
            SELECT
                COALESCE(SUM(quantity),0) AS totalQuantity,
                COALESCE(SUM(totalAmount),0) AS totalAmount
            FROM milk_purchase
            WHERE
                farmerId = ?
                AND paymentId IS NULL
                AND isActive = 1
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
        [farmerId, startDate, endDate],
      );

      if (summary[0].totalAmount == 0) {
        await connection.rollback();

        return validationFailed(res, "No pending milk purchase found.", {});
      }

      // Insert payment
      const [payment] = await connection.query(
        `
            INSERT INTO farmer_payments
            (
                farmerId,
                startDate,
                endDate,
                paymentDate,
                amount,
                paymentMode,
                remarks,
                createdBy
            )
            VALUES (?,?,?,?,?,?,?,?)
            `,
        [
          farmerId,
          startDate,
          endDate,
          paymentDate,
          summary[0].totalAmount,
          paymentMode,
          remarks,
          createdBy,
        ],
      );

      const paymentId = payment.insertId;

      // Link purchases to payment
      await connection.query(
        `
            UPDATE milk_purchase
            SET paymentId = ?
            WHERE
                farmerId = ?
                AND paymentId IS NULL
                AND isActive = 1
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
        [paymentId, farmerId, startDate, endDate],
      );

      await connection.commit();

      return success(res, "Farmer payment completed successfully.", {
        paymentId,
        totalQuantity: summary[0].totalQuantity,
        totalAmount: summary[0].totalAmount,
      });
    } catch (err) {
      await connection.rollback();

      return failure(res, err.sql, err.message);
    } finally {
      connection.release();
    }
  },

  // customers
  getMilkSellSumary: async (req, resp) => {

  },

  getCustomerMilkSells: async (req, resp) => {

  },
  
  customerBill: async (req, resp) => {

  }
  
};
