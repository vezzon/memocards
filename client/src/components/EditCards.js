import useCards from '../hooks/useCards';
import './EditCards.css';

const EditCards = () => {
  const { cards } = useCards();
  return (
    <div className="editCards__container">
      <h2>Edit Cards</h2>
      <ol className="cardlist">
        {cards.map(card => (
          <li className="cardlist_item" key={card.front}>
            {card.front} : {card.back}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default EditCards;
