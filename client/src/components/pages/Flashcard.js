import { useState, useEffect, useContext } from 'react';
import CardsContext from '../../context/CardsContext';
import Button from '../Button';

const Flashcard = () => {
  const [flip, setFlip] = useState(false);
  const [rev, setRev] = useState(false);
  const [index, change] = useState(0);
  const [card, setCard] = useState({ front: 'Front', back: 'Back' });
  const { cards } = useContext(CardsContext);

  useEffect(() => {
    if (cards.length === 0) return;

    setFlip(rev);

    setCard(cards[index]);
  }, [index, cards, rev]);

  const next = () => {
    if (index + 1 === cards.length) return;
    setFlip(false);
    change(index => index + 1);
  };

  const prev = () => {
    if (index === 0) return;
    setFlip(false);
    change(index => index - 1);
  };

  return (
    <>
      <div className="mx-auto flex w-4/5 flex-col items-center">
        <Button text={'Reverse sides'} clickHandler={() => setRev(!rev)} />
        <div
          className="flex h-96 w-full items-center justify-center rounded-md bg-slate-300 p-4 text-xl font-bold text-indigo-400 sm:text-2xl"
          onClick={() => setFlip(!flip)}
        >
          <div>{!flip ? card.front : card.back}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button text={'Prev'} clickHandler={prev} />
        <Button text={'Next'} clickHandler={next} />
      </div>
    </>
  );
};

export default Flashcard;
