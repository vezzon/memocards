import './EditCards.css';
import { RiDeleteBin2Line } from 'react-icons/ri';

const EditCards = ({ cards, deleteCardHandler }) => {
  return (
    <div className="flex__container">
      <h2>Cards</h2>
      <div className="editCards__list">
        {cards.map(card => (
          <div className="editCards__list_item" key={card.front}>
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
