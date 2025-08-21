// Simple in-memory data store for demo purposes
// Not for production use
const { randomUUID } = require('crypto');

// Seed a demo user
const users = new Map(); // id -> { id, email, name, password }
const demoUser = { id: 'demo-user', email: 'demo@boardy.app', name: 'Demo User', password: 'demo' };
users.set(demoUser.id, demoUser);

const userByEmail = new Map([[demoUser.email, demoUser.id]]);

// Boards, Lists, Cards
const boards = new Map(); // id -> { id, title, ownerId, isPublic, members: [{ userId, role }], createdAt }
const lists = new Map(); // id -> { id, boardId, title, position, type: 'TODO'|'IN_PROGRESS'|'DONE', ownerUserId? }
const cards = new Map(); // id -> { id, listId, title, description, position }

function ensureDefaultLists(boardId, ownerId) {
  // TODO, owner in-progress, DONE
  const todo = { id: randomUUID(), boardId, title: 'To Do', position: 1, type: 'TODO' };
  const inprog = { id: randomUUID(), boardId, title: 'In Progress', position: 2, type: 'IN_PROGRESS', ownerUserId: ownerId };
  const done = { id: randomUUID(), boardId, title: 'Done', position: 3, type: 'DONE' };
  lists.set(todo.id, todo);
  lists.set(inprog.id, inprog);
  lists.set(done.id, done);
  return { todo, inprog, done };
}

function createUser({ email, name, password }) {
  if (userByEmail.has(email)) return null;
  const id = randomUUID();
  const u = { id, email, name, password };
  users.set(id, u);
  userByEmail.set(email, id);
  return u;
}

function findUserByEmail(email) {
  const id = userByEmail.get(email);
  if (!id) return null;
  return users.get(id) || null;
}

function getUser(userId) {
  return users.get(userId) || null;
}

function createBoard({ title, ownerId }) {
  const id = randomUUID();
  const board = { id, title, ownerId, isPublic: false, members: [{ userId: ownerId, role: 'OWNER' }], createdAt: new Date().toISOString() };
  boards.set(id, board);
  const defaults = ensureDefaultLists(id, ownerId);
  return { board, defaults };
}

function addMember({ boardId, userId, role = 'COLLABORATOR' }) {
  const b = boards.get(boardId);
  if (!b) return null;
  if (!b.members.find(m => m.userId === userId)) {
    b.members.push({ userId, role });
    // Create a personal in-progress for the new member
    const pos = Math.max(...Array.from(lists.values()).filter(l => l.boardId === boardId).map(l => l.position)) + 1;
    const inprog = { id: randomUUID(), boardId, title: `In Progress (${getUser(userId)?.name || 'User'})`, position: pos, type: 'IN_PROGRESS', ownerUserId: userId };
    lists.set(inprog.id, inprog);
  }
  return b;
}

function setBoardPublic({ boardId, isPublic }) {
  const b = boards.get(boardId);
  if (!b) return null;
  b.isPublic = !!isPublic;
  return b;
}

function listBoardsForUser(userId) {
  return Array.from(boards.values()).filter(b => b.ownerId === userId || b.members.some(m => m.userId === userId));
}

function getBoardWithContent(boardId) {
  const b = boards.get(boardId);
  if (!b) return null;
  const ls = Array.from(lists.values()).filter(l => l.boardId === boardId).sort((a, z) => a.position - z.position);
  const cs = Array.from(cards.values()).filter(c => ls.some(l => l.id === c.listId));
  return { ...b, lists: ls.map(l => ({ ...l, cards: cs.filter(c => c.listId === l.id).sort((a, z) => a.position - z.position) })) };
}

function listsByBoard(boardId) {
  return Array.from(lists.values()).filter(l => l.boardId === boardId).sort((a, z) => a.position - z.position);
}

function createCard({ listId, title, description }) {
  const list = lists.get(listId);
  if (!list) return null;
  const position = Math.max(0, ...Array.from(cards.values()).filter(c => c.listId === listId).map(c => c.position)) + 1;
  const id = randomUUID();
  const card = { id, listId, title, description: description || '', position };
  cards.set(id, card);
  return card;
}

function moveCard({ cardId, targetListId }) {
  const card = cards.get(cardId);
  const list = lists.get(targetListId);
  if (!card || !list) return null;
  card.listId = targetListId;
  // Place at end
  card.position = Math.max(0, ...Array.from(cards.values()).filter(c => c.listId === targetListId).map(c => c.position)) + 1;
  return card;
}

function updateCard({ cardId, title, description }) {
  const card = cards.get(cardId);
  if (!card) return null;
  if (typeof title === 'string') card.title = title;
  if (typeof description === 'string') card.description = description;
  return card;
}

function getCardsByList(listId) {
  return Array.from(cards.values()).filter(c => c.listId === listId).sort((a, z) => a.position - z.position);
}

module.exports = {
  // users
  createUser,
  findUserByEmail,
  getUser,
  // boards
  createBoard,
  addMember,
  setBoardPublic,
  listBoardsForUser,
  getBoardWithContent,
  listsByBoard,
  // lists/cards
  createCard,
  moveCard,
  updateCard,
  getCardsByList,
};
