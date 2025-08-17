import React from 'react';

function BoardColumn({ title, cards, onCardClick }) {
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
      </div>
    </div>
  );
}

export default BoardColumn;
