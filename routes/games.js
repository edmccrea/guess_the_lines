const express = require('express');
const router = express.Router();

const Game = require('../models/Game');

//@route  POST /games
//@desc   Create new Game
//@access Private

router.post('/', async (req, res) => {
  try {
    const game = new Game(req.body);
    await game.save();
    res.json(game);
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
