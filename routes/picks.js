const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const User = require('../models/User');
const Pick = require('../models/Pick');
const BillsPicks = require('../models/BillsPicks');
const SalsPicks = require('../models/SalsPicks');

//@route  POST /picks
//@desc   Enter User's Picks
//@access Private

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('picks', 'week');

    const pick = new Pick({
      user,
      week: req.body.week,
      picks: req.body.picks,
    });

    let duplicate = false;
    user.picks.map((p) => {
      if (pick.week === p.week) {
        res.json({ msg: 'User has already picked this week' });
        duplicate = true;
      }
    });

    if (!duplicate) {
      await pick
        .save()
        .then((result) => {
          User.findOne({ email: user.email }, (err, user) => {
            if (user) {
              user.picks.push(pick);
              user.save();
              res.json({ msg: 'Picks added!' });
            }
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  POST /picks/bill
//@desc   Enter Bill's Picks
//@access Private

router.post('/bill', async (req, res) => {
  try {
    const picks = new BillsPicks(req.body);
    await picks.save();
    res.json(picks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  POST /picks/sal
//@desc   Enter Sal's Picks
//@access Private

router.post('/sal', async (req, res) => {
  try {
    const picks = new SalsPicks(req.body);
    await picks.save();
    res.json(picks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route  GET /picks/bill
//@desc   Get Bill's Picks
//@access Public

router.get('/bill', async (req, res) => {
  const picks = await BillsPicks.find({});
  res.json(picks);
});

//@route  GET /picks/sal
//@desc   Get Sals's Picks
//@access Public

router.get('/sal', async (req, res) => {
  const picks = await SalsPicks.find({});
  res.json(picks);
});

//@route  GET /picks/bill/:week
//@desc   Get Bill's Picks by Week
//@access Public

router.get('/bill/:week', async (req, res) => {
  const target = parseInt(req.params.week);
  BillsPicks.findOne({ week: target }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

//@route  GET /picks/sal/:week
//@desc   Get Sal's Picks by Week
//@access Public

router.get('/sal/:week', async (req, res) => {
  const target = parseInt(req.params.week);
  SalsPicks.findOne({ week: target }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

//@route  GET /picks
//@desc   Get All Picks
//@access Private

router.get('/', auth, async (req, res) => {
  const pick = await Pick.find({}).populate('user', 'name');
  res.json(pick);
});

//@route  GET /picks/:id
//@desc   Get Users Picks by Id
//@access Private

router.get('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id);
  const picks = await BillsPicks.find({}).populate('user');
  res.json(picks);
});

module.exports = router;
