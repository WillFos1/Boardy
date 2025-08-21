import React, { useEffect, useState } from 'react';

function ArrowButton({ direction = 'left', label, onClick }) {
  return (
    <button className={`arrow-btn ${direction}`} onClick={onClick}>
      {direction === 'left' ? '←' : '→'} {label}
    </button>
  );
}

function CardModal({ card, onClose, onMoveLeft, onMoveRight, onMarkDone, onUndoDone, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (card) {
      setTitle(card.title || '');
      setDescription(card.description || '');
    }
  }, [card]);

  if (!card) return null;

  const isDone = card.listType === 'DONE';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <ArrowButton direction="left" label="To Do" onClick={onMoveLeft} />
          <ArrowButton direction="right" label="In Progress" onClick={onMoveRight} />
        </div>
        <div className="modal-body">
          <input className="input title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="input" rows={5} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="modal-footer">
          {!isDone ? (
            <button className="check-btn" onClick={onMarkDone} title="Mark as done">✓</button>
          ) : (
            <button className="btn ghost" onClick={onUndoDone} title="Move back to To Do">Uncheck Done</button>
          )}
          <div className="spacer" />
          <button className="btn" onClick={() => onSave(title, description)}>Save</button>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
