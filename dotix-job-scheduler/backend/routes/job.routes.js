const express = require('express');
const router = express.Router();
const controller = require('../controllers/job.controller');

router.post('/jobs', controller.createJob);
router.get('/jobs', controller.getJobs);
router.get('/jobs/:id', controller.getJobById);
router.post('/run-job/:id', controller.runJob);

module.exports = router;
