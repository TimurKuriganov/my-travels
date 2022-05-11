const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const { getTrips } = require('../controllers/trips');
const router = express.Router();

router.get('/', isLoggedIn, getTrips);

module.exports = router;
