const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  summaries: [
    {
      summaryId: {
        type: String,
        required: true,
      },
      favorite: {
        type: Boolean,
        required: true,
        default: false,
      }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
