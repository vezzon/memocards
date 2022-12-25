import useCards from '../hooks/useCards';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import './EditCards.css';
import { useEffect } from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';

const EditCards = () => {
  const { cards, refresh } = useCards();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {}, [refresh]);

  const deleteCardHandler = async _id => {
    try {
      await axiosPrivate.delete(`cards/${_id}`);
      refresh(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex__container">
      <h2>Cards</h2>
      <div className="editCards__list">
        {cards.map(card => (
          <div className="editCards__list_item">
            <div className="editCards__front">{card.front}</div>
            <div className="editCards__back">{card.back}</div>
            <div
              className="editCards__delete"
              onClick={() => deleteCardHandler(card._id)}
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
