const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Week = require('../models/Week');
const Game = require('../models/Game');

//@route  POST /week
//@desc   Create New Week
//@access Private

router.post('/', auth, async (req, res) => {
  try {
    const week = new Week(req.body);
    await week.save();
    res.json(week);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  GET /week
//@desc   Get All Weeks
//@access Public

router.get('/', async (req, res) => {
  const weeks = await Week.find({}).populate('games', 'home_team away_team');
  res.json(weeks);
});

//@route  GET /week/:week
//@desc   Get Week by Number
//@access Public

router.get('/:id', async (req, res) => {
  try {
    const week = await Week.find({ week: req.params.id }).populate(
      'games',
      'home_team away_team'
    );
    res.json(week);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
