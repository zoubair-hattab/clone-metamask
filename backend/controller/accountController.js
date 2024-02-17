const Account = require('../model/accountModel');
const ErrorHandler = require('../utils/ErrorHandler');

exports.allAccount = async (req, res, next) => {
  try {
    const accounts = await Account.find();
    if (!accounts) {
      return next(new ErrorHandler("Account doesn't exists", 400));
    }
    res.status(200).json({
      status: true,
      accounts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.createAccount = async (req, res, next) => {
  try {
    const account = await Account.create({
      privateKey: req.body.privateKey,
      address: req.body.address,
    });
    res.status(201).json({
      status: true,
      account,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
