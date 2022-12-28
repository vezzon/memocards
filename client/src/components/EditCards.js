import './EditCards.css';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { v4 as uuid } from 'uuid';

const EditCards = ({ cards, deleteCardHandler }) => {
  return (
    <div className="flex__container">
      <h2>Cards</h2>
      <div className="editCards__list">
        {cards.map(card => (
          <div className="editCards__list_item" key={uuid()}>
            <div className="editCards__front">{card.front}</div>
            <div className="editCards__back">{card.back}</div>
            <div
              className="editCards__delete"
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
