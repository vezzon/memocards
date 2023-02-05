import { useState } from 'react';
import Button from './Button';

const EditCardModal = ({ open, onClose, editCardHandler, card }) => {
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);

  if (!open) return null;

  const frontHandler = event => {
    setFront(event.target.value);
  };

  const backHandler = event => {
    setBack(event.target.value);
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-40 bg-black/70">
      <div className="fixed top-1/2 left-1/2 z-50 w-80 translate-y-[-50%] translate-x-[-50%] rounded-xl bg-slate-700 p-4 text-slate-200">
        <h1 className="p-4 text-center text-xl font-bold">Edit card</h1>
        <div>
          <input
            className="my-3 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            type="text"
            value={front}
            onChange={frontHandler}
          />
        </div>
        <div>
          <input
            className="my-3 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            type="text"
            value={back}
            onChange={backHandler}
          />
        </div>
        <div className="mt-4 flex">
          <Button clickHandler={onClose}>Close</Button>
          <Button
            clickHandler={() => {
              editCardHandler(card, { front, back });
              onClose();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;
