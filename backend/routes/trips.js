const express = require('express');
const { getTrips } = require('../controllers/trips');
const router = express.Router();

router.route('/')
  .get(getTrips)
  
