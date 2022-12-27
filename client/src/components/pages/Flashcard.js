import { useState, useEffect, useContext } from 'react';
import CardsContext from '../../context/CardsContext';
import './Flashcard.css';

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
      <div className="card-container">
        <button className="btn" onClick={() => setRev(!rev)}>
          Reverse sides
        </button>
        <div
          className={`card ${flip ? 'flip' : ''}`}
          onClick={() => setFlip(!flip)}
        >
          <div className="front">{card.front}</div>
          <div className="back">{card.back}</div>
        </div>
      </div>
      <div className="buttons">
        <button className="btn" onClick={prev}>
          Prev
        </button>
        <button className="btn" onClick={next}>
          Next
        </button>
      </div>
    </>
  );
};

export default Flashcard;
