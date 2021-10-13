const mongoose = require('mongoose');

const BillsPicksSchema = new mongoose.Schema({
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

module.exports = BillsPicks = mongoose.model('billsPicks', BillsPicksSchema);
