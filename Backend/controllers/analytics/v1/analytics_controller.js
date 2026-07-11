const  pool  = require("../../../config/pool");
const { failure, success, validationFailed } = require("../../../utils/response");

module.exports = {
    getAnalytics: async (req, res) => {

    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return validationFailed(
            res,
            "Start Date and End Date are required.",
            {}
        );
    }

    try {

        // Milk Purchase Summary
        const [purchase] = await pool.query(
            `
            SELECT
                COALESCE(SUM(quantity),0) AS totalPurchasedMilk,
                COALESCE(SUM(totalAmount),0) AS totalPurchaseAmount
            FROM milk_purchase
            WHERE
                isActive = 1
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
            [startDate, endDate]
        );

        // Milk sells Summary
        const [sells] = await pool.query(
            `
            SELECT
                COALESCE(SUM(quantity),0) AS totalSoldMilk,
                COALESCE(SUM(totalAmount),0) AS totalSellsAmount
            FROM milk_sells
            WHERE
                isActive = 1
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
            [startDate, endDate]
        );

        // Amount Paid to Farmers
        const [farmerPaid] = await pool.query(
            `
            SELECT
                COALESCE(SUM(amount),0) AS totalPaidToFarmers
            FROM farmer_payments
            WHERE
                isActive = 1
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
            [startDate, endDate]
        );

        // Amount Received From Customers
        const [customerReceived] = await pool.query(
            `
            SELECT
                COALESCE(SUM(amount),0) AS totalReceivedFromCustomers
            FROM customer_payments
            WHERE
                isActive = 1
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
            [startDate, endDate]
        );

        // Pending Farmer Amount
        const [pendingFarmer] = await pool.query(
            `
            SELECT
                COALESCE(SUM(totalAmount),0) AS pendingFarmerAmount
            FROM milk_purchase
            WHERE
                paymentId IS NULL
                AND isActive = 1
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
            [startDate, endDate]
        );

        // Pending Customer Amount
        const [pendingCustomer] = await pool.query(
            `
            SELECT
                COALESCE(SUM(totalAmount),0) AS pendingCustomerAmount
            FROM milk_sells
            WHERE
                paymentId IS NULL
                AND isActive = 1
                AND DATE(createdAt) BETWEEN ? AND ?
            `,
            [startDate, endDate]
        );

        return success(
            res,
            "Analytics fetched successfully.",
            {
                totalPurchasedMilk: purchase[0].totalPurchasedMilk,
                totalSoldMilk: sells[0].totalSoldMilk,

                totalPurchaseAmount: purchase[0].totalPurchaseAmount,
                totalSellsAmount: sells[0].totalSellsAmount,

                totalPaidToFarmers: farmerPaid[0].totalPaidToFarmers,
                totalReceivedFromCustomers: customerReceived[0].totalReceivedFromCustomers,

                pendingFarmerAmount: pendingFarmer[0].pendingFarmerAmount,
                pendingCustomerAmount: pendingCustomer[0].pendingCustomerAmount
            }
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