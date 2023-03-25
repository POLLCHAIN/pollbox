const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  address: {type: String, lowercase: true}, //user address
  nonce: { type: Number, defuault: Math.floor(Math.random() * 1000000) }  
});

userSchema.index({ address: 1 }, { unique: true });
const User = mongoose.model('users', userSchema);

module.exports = User;
