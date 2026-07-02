const router = require('express').Router();

router.use("/api/user", require("./user"));
router.use("/api/farmer", require("./farmer"))
router.use("/api/customer", require("./customer"))

module.exports=router;