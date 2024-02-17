const User = require('../model/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/sendToken');

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password, address, privateKey, mnemonic } = req.body;
    console.log(name);
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler('User already exists', 400));
    }
    const user = {
      name: name,
      email: email,
      password: password,
      address: address,
      privateKey: privateKey,
      mnemonic: mnemonic,
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/#/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: 'Activate your account',
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

exports.activationPost = async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      return next(new ErrorHandler('Invalid token', 400));
    }
    const { name, email, password, address, privateKey, mnemonic } = newUser;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler('User already exists', 400));
    }
    user = await User.create({
      name: name,
      email: email,
      password: password,
      address: address,
      privateKey: privateKey,
      mnemonic: mnemonic,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: '5m',
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler('Please provide the all fields!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler('Please provide the correct information', 400)
      );
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.loadUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: 'Log out successful!',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
