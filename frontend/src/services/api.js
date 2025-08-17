const API_URL = 'http://localhost:4000/api';

export async function getBoards(token) {
  const res = await fetch(`${API_URL}/boards`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch boards');
  return res.json();
}