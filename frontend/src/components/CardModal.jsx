import React from 'react';

function ArrowButton({ direction = 'left', label, onClick }) {
  return (
    <button className={`arrow-btn ${direction}`} onClick={onClick}>
      {direction === 'left' ? '←' : '→'} {label}
    </button>
  );
}

function CardModal({ card, onClose, onMoveLeft, onMoveRight, onMarkDone }) {
  if (!card) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <ArrowButton direction="left" label="To Do" onClick={onMoveLeft} />
          <ArrowButton direction="right" label="In Progress" onClick={onMoveRight} />
        </div>
        <div className="modal-body">
          <h3>{card.title}</h3>
          <p className="muted">{card.description || 'No description provided.'}</p>
        </div>
        <div className="modal-footer">
          <button className="check-btn" onClick={onMarkDone} title="Mark as done">
            ✓
          </button>
          <div className="spacer" />
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
