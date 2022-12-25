import useCards from '../../hooks/useCards';
import './Dashboard.css';
import AddCard from '../AddCard';
import AddCardsCsv from '../AddCardsCsv';
import EditCards from '../EditCards';
import { useReducer } from 'react';

const initialState = { addCard: false, addCardsCsv: false, editCards: false };

const reducer = (state, action) => {
  switch (action.type) {
    case 'addCard':
      return { ...initialState, addCard: true };
    case 'addCardsCsv':
      return { ...initialState, addCardsCsv: true };
    case 'editCards':
      return { ...initialState, editCards: true };
    default:
      return initialState;
  }
};

const Dashboard = () => {
  const { cards } = useCards();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="dashboard__container">
      <h2 className="dashboard__header">Flashcards total: {cards.length} </h2>
      <div className="dashbord__options">
        <button onClick={() => dispatch({ type: 'addCard' })} className="btn">
          Add Card
        </button>
        <button
          onClick={() => dispatch({ type: 'addCardsCsv' })}
          className="btn"
        >
          Add Cards CSV
        </button>
        <button onClick={() => dispatch({ type: 'editCards' })} className="btn">
          Edit Cards
        </button>
      </div>
      {state.addCard && <AddCard />}
      {state.addCardsCsv && <AddCardsCsv />}
      {state.editCards && <EditCards />}
    </div>
  );
};

export default Dashboard;
