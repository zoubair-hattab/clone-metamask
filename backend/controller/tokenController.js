const Token = require('../model/tokenModel');
const ErrorHandler = require('../utils/ErrorHandler');

exports.allToken = async (req, res, next) => {
  try {
    const tokens = await Token.find();

    if (!tokens) {
      return next(new ErrorHandler("Token doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      tokens,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.addToken = async (req, res, next) => {
  try {
    const createToken = await Token.create({
      name: req.body.name,
      address: req.body.address,
      symbol: req.body.symbol,
    });
    res.status(201).json({
      status: 'success',
      createToken,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
