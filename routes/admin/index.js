const  router = require('express').Router();

router.use("/v1", require('./v1/admin_routes'))

module.exports=router;