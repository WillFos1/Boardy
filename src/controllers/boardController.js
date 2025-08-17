const { PrismaClient } = require('@prisma/client');
const prisma =new PrismaClient();

exports.createBoard = async (req, res) => {
    const {title} = req.body;
    const board =await prisma.board.create({
        data:{
            title, 
            ownerId: req.user.userId,
        },
    });
    res.json(board);
};

exports.getBoards = async (req, res) => {
    const boards = await prisma.board.findMany({
        where: { ownerId: req.user.userId },
        include: {
            lists: {

                include: {cards: true },
                orderBy: { position: 'asc' },

            }
        },
    });
    res.json(boards);
};

const boards= await prisma.board.findMany({
    where: { ownerId: req.user.userId},
    include: {
        lists: {
            include: { cards: true},
            orderBy: { position: 'asc' },
        },
    },
});