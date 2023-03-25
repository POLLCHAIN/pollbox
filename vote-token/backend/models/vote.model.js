const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  id: {type: String, index: true}, // proposalId-address
  timestamp: {type: Number, index: true},
  spaceId: {type: String, index: true},
  proposalId: {type: String, index: true},  
  address: {type: String, index: true, lowercase: true},
  power: Number,
  choice: String  
});

const Vote = mongoose.model('votes', voteSchema);

module.exports = Vote;
