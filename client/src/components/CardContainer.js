import React, { useState } from 'react';
import { RiDeleteBin2Line, RiEdit2Line } from 'react-icons/ri';
import { v4 as uuid } from 'uuid';
import EditCardModal from './EditCardModal';

const CardContainer = ({ card, deleteCardHandler, editCardHandler }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="m-2 flex w-11/12 px-3 py-1" key={uuid()}>
      <div className="w-full">
        <div className="rounded-tl-xl rounded-tr-xl bg-slate-300 p-2 text-left text-slate-900">
          {card.front}
        </div>
        <div className="rounded-bl-xl rounded-br-xl bg-slate-900 p-2 text-left text-slate-100">
          {card.back}
        </div>
        <div className="flex">
          <div
            className="m-1 rounded-xl bg-red-700 p-2 text-slate-300 hover:bg-red-500 hover:text-slate-900"
            onClick={() => deleteCardHandler(card)}
          >
            <RiDeleteBin2Line />
          </div>
          <div
            className="m-1  rounded-xl bg-indigo-600  p-2 text-slate-300 hover:bg-indigo-400 hover:text-slate-900"
            onClick={() => setIsModalOpen(true)}
          >
            <RiEdit2Line />
          </div>
          <EditCardModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            editCardHandler={editCardHandler}
            card={card}
          />
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
