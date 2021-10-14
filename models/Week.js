const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeekSchema = new Schema({
  week: {
    type: Number,
    required: true,
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Game',
    },
  ],
});

module.exports = Week = mongoose.model('Week', WeekSchema);
