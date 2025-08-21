const jwt = require('jsonwebtoken');
const store = require('../store');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

exports.signup = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) return res.status(400).json({ error: 'Missing fields' });

  const existing = store.findUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'User already exists' });

  const user = store.createUser({ email, name, password });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = store.findUserByEmail(email);
  if (user && user.password === password) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
