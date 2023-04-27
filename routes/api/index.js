const router = require('express').Router();
const workerRoutes = require('./worker-routes');
const dailyreportRoutes = require('./dailyreport-routes');

router.use('/workers', workerRoutes);
router.use('/dailyreport', dailyreportRoutes);

module.exports = router;
