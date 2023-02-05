import React from 'react';

const EditCardModal = ({ open, onClose, editCardHandler, card }) => {
  if (!open) return null;

  editCardHandler(card);
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-40 bg-black/70">
      <div className="fixed top-1/2 left-1/2 z-50 translate-y-1/2 translate-x-1/2 bg-white p-4">
        <h1>Edit card</h1>
        <p>{card.front}</p>
        <p>{card.back}</p>
        <button onClick={onClose}>Close</button>
        <button onClick={onClose}>Save</button>
      </div>
    </div>
  );
};

export default EditCardModal;
