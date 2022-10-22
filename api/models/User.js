const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      reqired: true,
    },
    password: {
      type: String,
      reqired: true,
    },
    roles: {
      User: {
        type: Number,
        default: 1001,
      },
      Admin: Number,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
