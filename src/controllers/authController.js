const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
constbcrypt = require('bcryptjs');

const prisma = new PrismaClient();
const JWT_SECRET = ProcessingInstruction.env.JWT_SECRET || 'secret';

exports.signup  = async (req, res) => {
    const {email, name, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    try{
        const user = await prisma.user.create({
            data: {email, name, password: hash},
        });
        const token = jwt.sign({ userId: user.id}, JWT_SECRET);
        res.json({ token });
    } catch {
        res.status(400).json({ error: 'User already exists'});
    }
};
exports.login = async (req, res) => { 

    const {email, password} =req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {

        const token = jwt.sign({ userID: user.id }, JWT_SECRET);
        res.json({ token });

    } else {

        res.status(401).json({ error: 'Invalid credentials'})
        
    }
};