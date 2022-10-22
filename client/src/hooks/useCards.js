import { useContext } from 'react';
import CardsContext from './../context/CardsContext';

const useCards = () => {
  return useContext(CardsContext);
};

export default useCards;
