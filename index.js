const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(cors());
app.get('/', (req, res) => res.send('API Running'));

app.use('/games', require('./routes/games'));
app.use('/picks', require('./routes/picks'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/week', require('./routes/week'));

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  // Step 1:
  app.use(express.static(path.resolve('client/build')));
  // Step 2:
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
