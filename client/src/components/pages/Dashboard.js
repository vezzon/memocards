import useCards from '../../hooks/useCards';
import AddCard from '../AddCard';
import AddCardsCsv from '../AddCardsCsv';
import EditCards from '../EditCards';
import { useReducer } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Button from '../Button';

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
  const { cards, refresh } = useCards();
  const [state, dispatch] = useReducer(reducer, initialState);
  const axiosPrivate = useAxiosPrivate();

  const deleteCardHandler = async card => {
    try {
      await axiosPrivate.delete(`cards/${card._id}`);
      refresh(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const editCardRequest = async card => {
    try {
      await axiosPrivate.put(`cards/${card._id}`);
      refresh(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const editCardHandler = async card => {};

  return (
    <div className="mx-auto flex w-4/5 flex-col items-center">
      <h2 className="p-4 text-xl font-bold text-indigo-300">
        Cards total: {cards.length}
      </h2>
      <div className="flex items-center rounded-md border border-gray-600 bg-slate-700 p-4">
        <Button
          text={'Add card'}
          clickHandler={() => dispatch({ type: 'addCard' })}
        />
        <Button
          text="Add cards CSV"
          clickHandler={() => dispatch({ type: 'addCardsCsv' })}
        />
        <Button
          text="Edit cards"
          clickHandler={() => dispatch({ type: 'editCards' })}
        />
      </div>
      {state.addCard && <AddCard />}
      {state.addCardsCsv && <AddCardsCsv />}
      {state.editCards && (
        <EditCards
          cards={cards}
          deleteCardHandler={deleteCardHandler}
          editCardHandler={editCardHandler}
        />
      )}
    </div>
  );
};

export default Dashboard;
