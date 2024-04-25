const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  macAddress: {
    type: String,
    required: true,
    unique: true
  },
  fcmTokens: {
    type: [String],
    default: []
  }
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
