const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Dummy in-memory user store
const users = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).send('User already exists');
  }
  users.push({ name, email, password });
  res.send('Signup successful');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  res.send('Login successful');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});