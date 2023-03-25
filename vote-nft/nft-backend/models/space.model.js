const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  id: {type: String, index: true}, // chainId-spaceId
  spaceId: {type: Number, index: true},
  chainId: {type: Number, index: true}, //
  timestamp: {type: Number, index: true},
  logo: String,
  name: {type: String, index: true},
  about: String,
  category: {type: String, index: true},
  creator: {type: String, lowercase: true},
  socialMetadata: String, 
  nftType: {type: Number, index: true}, // 0:ERC721, 1: ERC1155 
  nftAddr: {type: String, lowercase: true},  
  createLimit: Number  
});

spaceSchema.index({ id: 1 }, { unique: true });
const Space = mongoose.model('spaces', spaceSchema);

module.exports = Space;
