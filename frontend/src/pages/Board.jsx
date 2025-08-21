import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BoardColumn from '../components/BoardColumn';
import CardModal from '../components/CardModal';
import { getBoard, createCard, updateCard, moveCard, updateBoard } from '../services/api';

function Board() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || 'demo-token';

  const [board, setBoard] = useState(null);
  const [active, setActive] = useState(null);
  const [adding, setAdding] = useState({ listId: null, title: '', description: '' });

  useEffect(() => {
    async function load() {
      try {
        const b = await getBoard(token, id);
        setBoard(b);
      } catch (e) {
        console.error(e);
      }
    }
    if (id) load();
  }, [id]);

  const me = { id: 'demo-user' }; // for demo matching middleware

  const todoList = useMemo(() => board?.lists?.find(l => l.type === 'TODO'), [board]);
  const myInProgress = useMemo(() => board?.lists?.find(l => l.type === 'IN_PROGRESS' && l.ownerUserId === me.id) || board?.lists?.find(l => l.type === 'IN_PROGRESS'), [board]);
  const doneList = useMemo(() => board?.lists?.find(l => l.type === 'DONE'), [board]);

  const todoCards = todoList?.cards || [];
  const inProgressCards = myInProgress?.cards || [];
  const doneCards = doneList?.cards || [];

  const openCard = (card, list) => setActive({ ...card, listId: list.id, listType: list.type });
  const closeModal = () => setActive(null);

  async function refresh() {
    const b = await getBoard(token, id);
    setBoard(b);
  }

  const handleAdd = async (listId) => {
    if (!adding.title.trim()) return;
    await createCard(token, { listId, title: adding.title.trim(), description: adding.description.trim() });
    setAdding({ listId: null, title: '', description: '' });
    refresh();
  };

  const moveLeft = async () => {
    if (!active || !todoList) return;
    await moveCard(token, active.id, todoList.id);
    setActive(a => a ? { ...a, listId: todoList.id, listType: 'TODO' } : a);
    refresh();
  };

  const moveRight = async () => {
    if (!active || !myInProgress) return;
    await moveCard(token, active.id, myInProgress.id);
    setActive(a => a ? { ...a, listId: myInProgress.id, listType: 'IN_PROGRESS' } : a);
    refresh();
  };

  const markDone = async () => {
    if (!active || !doneList) return;
    await moveCard(token, active.id, doneList.id);
    setActive(null);
    refresh();
  };

  const undoDone = async () => {
    if (!active || !todoList) return;
    await moveCard(token, active.id, todoList.id);
    setActive(null);
    refresh();
  };

  const saveEdits = async (title, description) => {
    if (!active) return;
    await updateCard(token, active.id, { title, description });
    setActive(a => a ? { ...a, title, description } : a);
    refresh();
  };

  if (!board) return (
    <div className="board-page">
      <nav className="navbar"><div className="brand">Boardy</div></nav>
      <div className="muted" style={{ padding: 16 }}>Loading…</div>
    </div>
  );

  return (
    <div className="board-page">
      <nav className="navbar">
        <div className="brand" onClick={() => navigate('/boards')} style={{ cursor: 'pointer' }}>Boardy</div>
        <div className="nav-actions"><span className="muted">{board.title}</span></div>
      </nav>

      <div className="board-controls" style={{ padding: 12, display: 'flex', gap: 16, alignItems: 'center' }}>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={!!board.isPublic} onChange={async (e) => { await updateBoard(token, id, { isPublic: e.target.checked }); refresh(); }} />
          Public (view-only for non-members)
        </label>
      </div>

      <div className="board">
        <BoardColumn
          title="To Do"
          cards={todoCards}
          onCardClick={(c) => openCard(c, todoList)}
          adding={adding.listId === todoList?.id}
          addTitle={adding.title}
          addDescription={adding.description}
          onAddChange={(f, v) => setAdding(s => ({ ...s, [f]: v }))}
          onStartAdd={() => setAdding({ listId: todoList.id, title: '', description: '' })}
          onCancelAdd={() => setAdding({ listId: null, title: '', description: '' })}
          onConfirmAdd={() => handleAdd(todoList.id)}
        />
        <BoardColumn
          title="In Progress"
          cards={inProgressCards}
          onCardClick={(c) => openCard(c, myInProgress)}
          adding={adding.listId === myInProgress?.id}
          addTitle={adding.title}
          addDescription={adding.description}
          onAddChange={(f, v) => setAdding(s => ({ ...s, [f]: v }))}
          onStartAdd={() => setAdding({ listId: myInProgress.id, title: '', description: '' })}
          onCancelAdd={() => setAdding({ listId: null, title: '', description: '' })}
          onConfirmAdd={() => handleAdd(myInProgress.id)}
        />
      </div>

      <div className="done-strip">
        <div className="done-title">Done</div>
        <div className="done-cards">
          {doneCards.map(card => (
            <div key={card.id} className="chip" title={card.description || ''} onClick={() => openCard(card, doneList)}>
              {card.title}
            </div>
          ))}
          {doneCards.length === 0 && <div className="muted small">No done tasks yet</div>}
        </div>
      </div>

      <CardModal
        card={active}
        onClose={closeModal}
        onMoveLeft={moveLeft}
        onMoveRight={moveRight}
        onMarkDone={markDone}
        onUndoDone={undoDone}
        onSave={saveEdits}
      />
    </div>
  );
}

export default Board;
