import '../components/AddCard.css';
import { useState, useRef, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useCards from '../hooks/useCards';
import useAuth from '../hooks/useAuth';

const AddCard = () => {
  const addFrontRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const { cards, refresh } = useCards();
  const { userId } = useAuth();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  useEffect(() => {
    addFrontRef.current.focus();
  }, []);

  const frontHandler = event => {
    setFront(event.target.value);
  };

  const backHandler = event => {
    setBack(event.target.value);
  };

  const createCardReq = async card => {
    try {
      await axiosPrivate.post(`cards`, card);
    } catch (error) {
      console.log(error);
    }
  };

  const addCardHandler = async event => {
    event.preventDefault();

    const card = { front, back, userId };

    try {
      createCardReq(card);
      refresh(prev => !prev);
      setFront('');
      setBack('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addcard">
      <h2>Add card components</h2>
      <form
        className="addcard_form"
        onSubmit={addCardHandler}
        autoComplete="off"
      >
        <div className="addcard__input">
          <label htmlFor="front">Front</label>
          <input
            ref={addFrontRef}
            type="text"
            name="front"
            value={front}
            onChange={frontHandler}
            required
          />
        </div>
        <div className="addcard__input">
          <label htmlFor="back">Back</label>
          <input
            type="text"
            name="back"
            value={back}
            onChange={backHandler}
            required
          />
        </div>
        <button className="btn" type="submit">
          Add card
        </button>
      </form>
    </div>
  );
};

export default AddCard;
