const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token Missing' });

  // Allow demo token for local demo mode
  if (token === 'demo-token') {
    req.user = { userId: 'demo-user' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId }
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
