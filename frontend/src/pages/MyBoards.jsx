import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoards, createBoard } from '../services/api';

function MyBoards() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token') || 'demo-token';

  useEffect(() => {
    async function load() {
      try {
        const data = await getBoards(token);
        setBoards(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const b = await createBoard(token, title.trim());
      navigate(`/board/${b.id}`);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="my-boards">
      <nav className="navbar">
        <div className="brand">Boardy</div>
      </nav>
      <div className="content">
        <h2>My Boards</h2>
        <form className="create-board" onSubmit={handleCreate}>
          <input placeholder="New board title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button className="btn primary" type="submit">Create</button>
        </form>
        {loading ? (
          <div className="muted">Loading…</div>
        ) : (
          <div className="board-grid">
            {boards.map((b) => (
              <div key={b.id} className="board-tile" onClick={() => navigate(`/board/${b.id}`)}>
                <div className="board-title">{b.title}</div>
                {b.isPublic ? <div className="badge">Public</div> : <div className="badge ghost">Private</div>}
              </div>
            ))}
            {boards.length === 0 && <div className="muted">No boards yet</div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBoards;
