const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  privateKey: { type: String, unique: true, required: true, dropDups: true },
  address: { type: String, unique: true, required: true, dropDups: true },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
