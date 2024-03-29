import { useState } from 'react';
import CardContainer from './CardContainer';
import { v4 as uuid } from 'uuid';

const EditCards = ({ cards, deleteCardHandler, editCardHandler }) => {
  const [query, setQuery] = useState('');

  const keys = ['front', 'back'];

  const search = data => {
    return data.filter(item =>
      keys.some(key => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <div className="flex w-full flex-col sm:w-4/5">
      <div className="mx-auto my-4 flex w-full flex-col items-center rounded-md border border-gray-600 bg-slate-700 p-4">
        <h2 className="p-4 text-center font-bold text-indigo-200">Cards</h2>
        <input
          type="text"
          placeholder="Search cards..."
          className="m-4 w-4/5 appearance-none rounded border-2 border-gray-200 bg-slate-300 p-4 leading-tight text-indigo-700 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-slate-200 focus:outline-none"
          onChange={e => setQuery(e.target.value)}
        />
        {search(cards).map(card => (
          <CardContainer
            key={card.id ? card.id : uuid()}
            card={card}
            deleteCardHandler={deleteCardHandler}
            editCardHandler={editCardHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default EditCards;
