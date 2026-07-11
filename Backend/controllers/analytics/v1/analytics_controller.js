const  pool  = require("../../../config/pool");
const { failure, success, validationFailed } = require("../../../utils/response");
const { convertUTCtoIST } = require("../../../utils/helperfunction");

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

getPurchasedMilkDetails: async (req, res) => {

    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return validationFailed(
            res,
            "Start Date and End Date are required.",
            {}
        );
    }

    try {

        const [result] = await pool.query(
            `
            SELECT
                f.farmerId,
                f.farmerName,
                f.mobileNo,
                COALESCE(SUM(mp.quantity), 0) AS totalQuantity,
                COALESCE(SUM(mp.totalAmount), 0) AS totalAmount
            FROM milk_purchase mp
            INNER JOIN farmers f
                ON mp.farmerId = f.farmerId
            WHERE
                mp.isActive = 1
                AND f.isActive = 1
                AND DATE(mp.createdAt) BETWEEN ? AND ?
            GROUP BY
                f.farmerId,
                f.farmerName,
                f.mobileNo
            ORDER BY
                totalQuantity DESC,
                f.farmerName ASC
            `,
            [startDate, endDate]
        );

        if (result.length === 0) {
            return success(
                res,
                "No Milk Purchase Found",
                []
            );
        }

        return success(
            res,
            "Purchased Milk Details Fetched Successfully",
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

getSoldMilkDetails: async (req, res) => {

    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return validationFailed(
            res,
            "Start Date and End Date are required.",
            {}
        );
    }

    try {

        const [result] = await pool.query(
            `
            SELECT
                c.customerId,
                c.customerName,
                c.mobileNo,
                COALESCE(SUM(ms.quantity), 0) AS totalQuantity,
                COALESCE(SUM(ms.totalAmount), 0) AS totalAmount
            FROM milk_sells ms
            INNER JOIN customers c
                ON ms.customerId = c.customerId
            WHERE
                ms.isActive = 1
                AND c.isActive = 1
                AND DATE(ms.createdAt) BETWEEN ? AND ?
            GROUP BY
                c.customerId,
                c.customerName,
                c.mobileNo
            ORDER BY
                totalQuantity DESC,
                c.customerName ASC
            `,
            [startDate, endDate]
        );

        if (result.length === 0) {
            return success(
                res,
                "No Milk Sales Found",
                []
            );
        }

        return success(
            res,
            "Sold Milk Details Fetched Successfully",
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

getPaidToFarmersDetails: async (req, res) => {

    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return validationFailed(
            res,
            "Start Date and End Date are required.",
            {}
        );
    }

    try {

        const [result] = await pool.query(
            `
            SELECT
                f.farmerId,
                f.farmerName,
                f.mobileNo,
                COUNT(fp.paymentId) AS totalPayments,
                COALESCE(SUM(fp.amount), 0) AS totalPaidAmount,
                MAX(fp.paymentDate) AS lastPaymentDate
            FROM farmer_payments fp
            INNER JOIN farmers f
                ON fp.farmerId = f.farmerId
            WHERE
                fp.isActive = 1
                AND f.isActive = 1
                AND DATE(fp.createdAt) BETWEEN ? AND ?
            GROUP BY
                f.farmerId,
                f.farmerName,
                f.mobileNo
            ORDER BY
                totalPaidAmount DESC,
                f.farmerName ASC
            `,
            [startDate, endDate]
        );

        if (result.length === 0) {
            return success(
                res,
                "No Farmer Payments Found",
                []
            );
        }

        result.forEach((item) => {
            item.lastPaymentDate = convertUTCtoIST(item.lastPaymentDate);
        });

        return success(
            res,
            "Farmer Payment Details Fetched Successfully",
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
getReceivedFromCustomersDetails: async (req, res) => {

    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return validationFailed(
            res,
            "Start Date and End Date are required.",
            {}
        );
    }

    try {

        const [result] = await pool.query(
            `
            SELECT
                c.customerId,
                c.customerName,
                c.mobileNo,
                COUNT(cp.paymentId) AS totalPayments,
                COALESCE(SUM(cp.amount), 0) AS totalReceivedAmount,
                MAX(cp.paymentDate) AS lastPaymentDate
            FROM customer_payments cp
            INNER JOIN customers c
                ON cp.customerId = c.customerId
            WHERE
                cp.isActive = 1
                AND c.isActive = 1
                AND DATE(cp.createdAt) BETWEEN ? AND ?
            GROUP BY
                c.customerId,
                c.customerName,
                c.mobileNo
            ORDER BY
                totalReceivedAmount DESC,
                c.customerName ASC
            `,
            [startDate, endDate]
        );

        if (result.length === 0) {
            return success(
                res,
                "No Customer Payments Found",
                []
            );
        }

        result.forEach((item) => {
            item.lastPaymentDate = convertUTCtoIST(item.lastPaymentDate);
        });

        return success(
            res,
            "Customer Payment Details Fetched Successfully",
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

getPendingFarmerPayments: async (req, res) => {

    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return validationFailed(
            res,
            "Start Date and End Date are required.",
            {}
        );
    }

    try {

        const [result] = await pool.query(
            `
            SELECT
                f.farmerId,
                f.farmerName,
                f.mobileNo,
                COALESCE(SUM(mp.quantity), 0) AS pendingQuantity,
                COALESCE(SUM(mp.totalAmount), 0) AS pendingAmount,
                COUNT(mp.purchaseId) AS totalPurchases
            FROM milk_purchase mp
            INNER JOIN farmers f
                ON mp.farmerId = f.farmerId
            WHERE
                mp.isActive = 1
                AND f.isActive = 1
                AND mp.paymentId IS NULL
                AND DATE(mp.createdAt) BETWEEN ? AND ?
            GROUP BY
                f.farmerId,
                f.farmerName,
                f.mobileNo
            HAVING
                pendingAmount > 0
            ORDER BY
                pendingAmount DESC,
                f.farmerName ASC
            `,
            [startDate, endDate]
        );

        if (result.length === 0) {
            return success(
                res,
                "No Pending Farmer Payments Found",
                []
            );
        }

        return success(
            res,
            "Pending Farmer Payments Fetched Successfully",
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

getPendingCustomerPayments: async (req, res) => {

    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
        return validationFailed(
            res,
            "Start Date and End Date are required.",
            {}
        );
    }

    try {

        const [result] = await pool.query(
            `
            SELECT
                c.customerId,
                c.customerName,
                c.mobileNo,
                COALESCE(SUM(ms.quantity), 0) AS pendingQuantity,
                COALESCE(SUM(ms.totalAmount), 0) AS pendingAmount,
                COUNT(ms.sellId) AS totalSells
            FROM milk_sells ms
            INNER JOIN customers c
                ON ms.customerId = c.customerId
            WHERE
                ms.isActive = 1
                AND c.isActive = 1
                AND ms.paymentId IS NULL
                AND DATE(ms.createdAt) BETWEEN ? AND ?
            GROUP BY
                c.customerId,
                c.customerName,
                c.mobileNo
            HAVING
                pendingAmount > 0
            ORDER BY
                pendingAmount DESC,
                c.customerName ASC
            `,
            [startDate, endDate]
        );

        if (result.length === 0) {
            return success(
                res,
                "No Pending Customer Payments Found",
                []
            );
        }

        return success(
            res,
            "Pending Customer Payments Fetched Successfully",
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