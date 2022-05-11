const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ExpressError = require('../utils/ExpressError');


const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email.trim() || !password.trim()) {
      res.status(401)
      throw new ExpressError('Invalid data', 'error');
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404)
      throw new ExpressError('User does not exist', 'error');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401)
      throw new ExpressError('Invalid credentials', 'error');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.status(200).json({ 
      userId: user._id,
      username: user.username,
      email: user.email,
      token 
    });
  } catch(err) {
    return next(err);
  }
}

const signupUser = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    if (!username.trim() || !email.trim() || !password.trim()) {
      res.status(400);
      throw new ExpressError('Invalid credentials', 'error');
    }
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.status(400);
      throw new ExpressError('User already exists', 'error');
    }
    const pwd = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: pwd, username });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.status(201).json({
      userId: user._id,
      username: user.username,
      email: user.email,
      token 
    })
  } catch(err) {
    return next(err);
  }
}

module.exports = { loginUser, signupUser };
