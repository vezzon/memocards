const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    front: {
      type: String,
      required: true,
    },
    back: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
    passed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);
