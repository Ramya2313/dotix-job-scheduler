const express = require('express');
const router = express.Router();
const controller = require('../controllers/job.controller');

router.post('/jobs', controller.createJob);

module.exports = router;
