const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: {type: String, index: true}, // proposalId-timestamp
  timestamp: {type: Number, index: true}, // timestamp
  spaceId: {type: String, index: true},
  proposalId: {type: String, index: true},  
  address: {type: String, index: true, lowercase: true}, 
  message: String
});

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
