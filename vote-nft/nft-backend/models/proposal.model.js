const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  id: {type: String, index: true}, // spaceId-timestamp
  timestamp: {type: Number, index: true}, // created timestamp
  spaceId: {type: String, index: true}, // id of Space
  creator: {type: String, lowercase: true},
  title: {type: String, index: true},
  description: String,
  overview: String,
  choices: [{type: String, default: []}], //choice list,
  endTime: Number,
  totalPower: Number
});

const Proposal = mongoose.model('proposals', proposalSchema);

module.exports = Proposal;
