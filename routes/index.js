const router = require('express').Router();

router.use("/api/user", require("./user"));
router.use("/api/farmer", require("./farmer"))

module.exports=router;