const express = require('express');
const router = express.Router();
const weekChecker = require('../middleware/weekChecker');
const auth = require('../middleware/auth');

const Game = require('../models/Game');
const Week = require('../models/Week');

//@route  POST /games
//@desc   Create new Game
//@access Private

router.post('/', auth, async (req, res) => {
  try {
    const game = new Game(req.body);
    const gameWeek = weekChecker(game);

    if (gameWeek) {
      await game
        .save()
        .then((result) => {
          Week.findOne({ week: gameWeek }, (err, week) => {
            if (week) {
              week.games.push(game);
              week.save();
              res.json({ msg: 'Game added!' });
            }
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }

    if (!gameWeek) {
      res.json({ msg: 'Not a valid week' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  GET /games
//@desc   Get all Games
//@access Public

router.get('/', async (req, res) => {
  const games = await Game.find({});
  res.json(games);
});

module.exports = router;
