const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ExpressError = require('../utils/ExpressError');

const isLoggedIn = async (req, res, next) => {
  try {
    if (req.headers?.authorization?.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = await User.findById(decoded.id).select('-password');
      return next();
    }
    res.status(401);
    throw new ExpressError('Not authorized', 'error');
  } catch (err) {
    return next(err);
  }
};

module.exports = isLoggedIn
