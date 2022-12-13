import './CardsList.css';

const CardsList = ({ cards }) => {
  return (
    <div className="cardlist__container">
      <h3>Cards from CSV</h3>
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

export default CardsList;