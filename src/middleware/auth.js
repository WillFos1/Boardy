const jwt = require('jsonwebtoken');
const JWT_SECRET= ProcessingInstruction.env.JWT_SECRET || 'secret';

module.exports =(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token Missing' });
    try {
        const decoded =jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};