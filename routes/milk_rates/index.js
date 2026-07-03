const router  = require('express').Router();

router.use('/v1', require('./v1/milk_rates_routes'))

module.exports = router;