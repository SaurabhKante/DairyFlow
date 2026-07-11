const router = require('express').Router();

router.use("/api/user", require("./user"));
router.use("/api/farmer", require("./farmer"))
router.use('/api/milk-rates', require('./milk_rates'))
router.use("/api/customer", require("./customer"))
router.use("/api/admin", require("./admin"))
router.use("/api/analytics", require("./analytics"))

module.exports=router;