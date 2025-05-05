const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = {}; // In-memory user wallet

app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (!users[username]) {
    users[username] = { balance: 5 };
  }
  res.json({ user: username, balance: users[username].balance });
});

app.post('/api/add-money', (req, res) => {
  const { username, amount } = req.body;
  if (users[username]) {
    users[username].balance += amount;
    return res.json({ balance: users[username].balance });
  }
  res.status(404).json({ error: 'User not found' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));