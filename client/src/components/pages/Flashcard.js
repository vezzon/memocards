import { useState, useEffect } from 'react';
import useCards from '../../hooks/useCards';
import Button from '../Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Flashcard = () => {
  const [flip, setFlip] = useState(false);
  const [reverseCard, setReverseCard] = useState(false);
  const [index, setIndex] = useState(0);
  const [card, setCard] = useState({ front: 'Front', back: 'Back' });
  const { cardsToLearn, setRefresh } = useCards();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (cardsToLearn.length === 0) return;

    setFlip(reverseCard);
    console.log(cardsToLearn); // For debugging

    setCard(cardsToLearn[index]);
  }, [index, cardsToLearn, reverseCard]);

  const editCardRequest = async card => {
    try {
      await axiosPrivate.put(`cards/${card._id}`, card);
      setRefresh(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const move = () => {
    if (index + 1 === cardsToLearn.length) return;
    setFlip(false);
    setIndex(index => index + 1);
    const currentCard = { ...card, passed: (card.passed += 1) };
    editCardRequest(currentCard);
  };

  const repeat = () => {
    setFlip(false);
    // TODO: Move this card to end of the cards
    setIndex(index => index + 1);
    const currentCard = { ...card, passed: 0 };
    editCardRequest(currentCard);
  };

  return (
    <>
      <div className="mx-auto flex w-4/5 flex-col items-center">
        <Button clickHandler={() => setReverseCard(!reverseCard)}>
          Reverse sides
        </Button>
        <div
          className="flex h-96 w-full items-center justify-center rounded-md bg-slate-300 p-4 text-xl font-bold text-indigo-400 sm:text-2xl"
          onClick={() => setFlip(!flip)}
        >
          <div>{!flip ? card.front : card.back}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button clickHandler={repeat}>Repeat</Button>
        <Button clickHandler={move}>Move forward</Button>
      </div>
    </>
  );
};

export default Flashcard;
