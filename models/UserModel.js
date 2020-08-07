const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    min: 0,
    max: 14
  }
});

module.exports = mongoose.model('User', userSchema);