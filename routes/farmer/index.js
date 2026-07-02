const router = require('express').Router();

router.use("/v1",require('./v1/farmer_routes'));

module.exports=router;