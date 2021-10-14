const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PickSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  week: {
    type: Number,
  },
  picks: [
    {
      team_name: {
        type: String,
      },
      point: {
        type: Number,
      },
    },
  ],
});

module.exports = Pick = mongoose.model('Pick', PickSchema);
