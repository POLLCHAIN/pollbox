const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SettingSchema = new Schema({
    id: {type: Number, index: true},
    chainId: {type: Number, index: true},
    blockNumber: { type: Number, required: true, default: 1 }, // start blocknumber to sync data
});

module.exports = mongoose.model('settings', SettingSchema);
