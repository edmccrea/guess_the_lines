const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  sport_key: {
    type: String,
    required: true,
  },
  commence_time: {
    type: Date,
    required: true,
  },
  home_team: {
    type: String,
    required: true,
  },
  away_team: {
    type: String,
    required: true,
  },
  bookmakers: [
    {
      key: {
        type: String,
      },
      title: {
        type: String,
      },
      last_update: {
        type: Date,
      },
      markets: [
        {
          key: {
            type: String,
          },
          outcomes: [
            {
              name: {
                type: String,
              },
              price: {
                type: Number,
              },
              point: {
                type: Number,
              },
            },
          ],
        },
      ],
    },
  ],
});

module.exports = Game = mongoose.model('Game', GameSchema);
