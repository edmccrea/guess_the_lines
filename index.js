const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/games', require('./routes/games'));
app.use('/picks', require('./routes/picks'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/week', require('./routes/week'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
