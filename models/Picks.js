const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PicksSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
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

module.exports = Picks = mongoose.model('picks', PicksSchema);
