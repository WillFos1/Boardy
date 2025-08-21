import React from 'react';

function BoardColumn({ title, cards, onCardClick, adding, addTitle, addDescription, onAddChange, onStartAdd, onCancelAdd, onConfirmAdd }) {
  return (
    <div className="board-column">
      <div className="column-header">
        <span>{title}</span>
        <div className="glow" />
      </div>
      <div className="column-body">
        {cards.map((card) => (
          <div key={card.id} className="card-item" onClick={() => onCardClick(card)}>
            <div className="card-title">{card.title}</div>
            {card.description && <div className="card-sub">{card.description.slice(0, 60)}</div>}
          </div>
        ))}
        {cards.length === 0 && <div className="empty">No tasks</div>}
        {!adding ? (
          <button className="btn ghost small" onClick={onStartAdd} style={{ marginTop: 8 }}>+ Add card</button>
        ) : (
          <div className="add-card">
            <input placeholder="Title" value={addTitle} onChange={(e) => onAddChange('title', e.target.value)} />
            <textarea placeholder="Description (optional)" value={addDescription} onChange={(e) => onAddChange('description', e.target.value)} />
            <div className="row">
              <button className="btn primary" onClick={onConfirmAdd}>Add</button>
              <button className="btn ghost" onClick={onCancelAdd}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardColumn;
