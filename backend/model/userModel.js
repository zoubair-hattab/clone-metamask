const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSechema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'PLease enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email!'],
      unquie: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Password should be greater then 6 characters '],
      select: false,
    },
    address: { type: String },
    privateKey: { type: String },
    mnemonic: { type: String },
  },
  {
    timestamps: true,
  }
);
// Hash password
userSechema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSechema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '3d',
  });
};

// compare password
userSechema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSechema);
