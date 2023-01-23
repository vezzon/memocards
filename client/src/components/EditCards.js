import { RiDeleteBin2Line } from 'react-icons/ri';
import { v4 as uuid } from 'uuid';

const EditCards = ({ cards, deleteCardHandler }) => {
  return (
    <div className="flex flex-col">
      <div className="mx-auto mt-4 flex flex-col items-center rounded-md border border-gray-600 bg-slate-700 p-4">
        <h2 className="p-4 text-center font-bold text-indigo-300">Cards</h2>
        {cards.map(card => (
          <div className="m-2 flex w-full px-3 py-1" key={uuid()}>
            <div className="w-full">
              <div className="bg-slate-300 px-2 text-left text-slate-900">
                {card.front}
              </div>
              <div className="bg-slate-900 px-2 text-left text-slate-100">
                {card.back}
              </div>
            </div>
            <div
              className="flex items-center bg-red-700 px-2 text-slate-300 hover:bg-red-500 hover:text-slate-900"
              onClick={() => deleteCardHandler(card)}
            >
              <RiDeleteBin2Line />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCards;
