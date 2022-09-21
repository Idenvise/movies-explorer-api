const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
