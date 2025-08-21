const API_URL = 'http://localhost:4000/api';

function authHeaders(token) {
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function getBoards(token) {
  const res = await fetch(`${API_URL}/boards`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch boards');
  return res.json();
}

export async function createBoard(token, title) {
  const res = await fetch(`${API_URL}/boards`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Failed to create board');
  return res.json();
}

export async function getBoard(token, id) {
  const res = await fetch(`${API_URL}/boards/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error('Failed to fetch board');
  return res.json();
}

export async function updateBoard(token, id, body) {
  const res = await fetch(`${API_URL}/boards/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to update board');
  return res.json();
}

export async function createCard(token, { listId, title, description }) {
  const res = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ listId, title, description }),
  });
  if (!res.ok) throw new Error('Failed to create card');
  return res.json();
}

export async function updateCard(token, id, { title, description }) {
  const res = await fetch(`${API_URL}/cards/${id}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) throw new Error('Failed to update card');
  return res.json();
}

export async function moveCard(token, id, targetListId) {
  const res = await fetch(`${API_URL}/cards/${id}/move`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ targetListId }),
  });
  if (!res.ok) throw new Error('Failed to move card');
  return res.json();
}
