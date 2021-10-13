const mongoose = require('mongoose');

const SalsPicksSchema = new mongoose.Schema({
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

module.exports = SalsPicks = mongoose.model('salsPicks', SalsPicksSchema);
