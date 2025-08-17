import React, { useMemo, useState } from 'react';
import BoardColumn from '../components/BoardColumn';
import CardModal from '../components/CardModal';

const seed = [
  { id: '1', title: 'Design login screen', description: 'Wireframe and high-fidelity mockups.', status: 'todo' },
  { id: '2', title: 'Auth API integration', description: 'Implement JWT login with backend.', status: 'inprogress' },
  { id: '3', title: 'Board layout', description: 'Create To Do / In Progress columns and styling.', status: 'todo' },
];

function Board() {
  const [cards, setCards] = useState(seed);
  const [done, setDone] = useState([]);
  const [active, setActive] = useState(null);

  const todoCards = useMemo(() => cards.filter(c => c.status === 'todo'), [cards]);
  const inProgressCards = useMemo(() => cards.filter(c => c.status === 'inprogress'), [cards]);

  const openCard = (card) => setActive(card);
  const closeModal = () => setActive(null);

  const moveLeft = () => {
    if (!active) return;
    setCards(prev => prev.map(c => c.id === active.id ? { ...c, status: 'todo' } : c));
    setActive(a => a ? { ...a, status: 'todo' } : a);
  };

  const moveRight = () => {
    if (!active) return;
    setCards(prev => prev.map(c => c.id === active.id ? { ...c, status: 'inprogress' } : c));
    setActive(a => a ? { ...a, status: 'inprogress' } : a);
  };

  const markDone = () => {
    if (!active) return;
    setDone(prev => [{ ...active }, ...prev]);
    setCards(prev => prev.filter(c => c.id !== active.id));
    setActive(null);
  };

  return (
    <div className="board-page">
      <nav className="navbar">
        <div className="brand">Boardy</div>
        <div className="nav-actions">
          <span className="muted">Demo Board</span>
        </div>
      </nav>

      <div className="board">
        <BoardColumn title="To Do" cards={todoCards} onCardClick={openCard} />
        <BoardColumn title="In Progress" cards={inProgressCards} onCardClick={openCard} />
      </div>

      <div className="done-strip">
        <div className="done-title">Done</div>
        <div className="done-cards">
          {done.map(card => (
            <div key={card.id} className="chip" title={card.description || ''}>{card.title}</div>
          ))}
          {done.length === 0 && <div className="muted small">No done tasks yet</div>}
        </div>
      </div>

      <CardModal
        card={active}
        onClose={closeModal}
        onMoveLeft={moveLeft}
        onMoveRight={moveRight}
        onMarkDone={markDone}
      />
    </div>
  );
}

export default Board;
