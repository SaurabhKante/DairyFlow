const  router = require('express').Router();

router.use("/v1", require('./v1/customer_routes'))

module.exports=router;