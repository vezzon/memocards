import { useState, useRef, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useCards from '../hooks/useCards';
import useAuth from '../hooks/useAuth';
import Button from './Button';

const AddCard = () => {
  const addFrontRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const { setRefresh } = useCards();
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
      setRefresh(prev => !prev);
      setFront('');
      setBack('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto mt-4 flex flex-col items-center rounded-md border border-gray-600 bg-slate-700 p-4">
      <h2 className="p-2">Add card</h2>
      <form
        className="flex flex-col items-center"
        onSubmit={addCardHandler}
        autoComplete="off"
      >
        <div>
          <input
            className="my-3 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            ref={addFrontRef}
            type="text"
            name="front"
            placeholder="Front side"
            value={front}
            onChange={frontHandler}
            required
          />
        </div>
        <div>
          <input
            className="my-3 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 leading-tight text-gray-700 focus:border-indigo-500 focus:bg-white focus:outline-none"
            type="text"
            name="back"
            placeholder="Back side"
            value={back}
            onChange={backHandler}
            required
          />
        </div>
        <Button type="submit">Add card</Button>
      </form>
    </div>
  );
};

export default AddCard;
