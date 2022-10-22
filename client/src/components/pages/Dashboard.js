import { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useCards from '../../hooks/useCards';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useCSVReader } from 'react-papaparse';
import './Dashboard.css';

const Dashboard = () => {
  const { cards, refresh } = useCards();
  const { userId } = useAuth();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [newCards, setNewCards] = useState([]);
  const { CSVReader } = useCSVReader();
  const addFrontRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    addFrontRef.current.focus();
  }, []);

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

  const frontHandler = event => {
    setFront(event.target.value);
  };

  const backHandler = event => {
    setBack(event.target.value);
  };

  const exstractCSV = file => {
    const { data } = file;
    let cardsArr = [];
    data.forEach(ele => {
      if (ele.length > 2) {
        const card = { front: ele[2], back: ele[3], userId };
        cardsArr.push(card);
      }
    });
    setNewCards(cardsArr);
  };

  const clearNewCardsHandler = () => {
    setNewCards([]);
  };

  const addNewCardsHandler = () => {
    newCards.forEach(card => {
      createCardReq(card);
    });
    setNewCards([]);
    refresh(prev => !prev);
  };

  // TODO: move to component
  const listNewCards = cards => {
    return (
      <div className="dashboard__csv__cardlist__container">
        <h3>Cards from CSV</h3>
        <ol className="dashboard__csv__cardlist">
          {cards.map(card => (
            <li key={card.front}>
              {card.front} : {card.back}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div className="dashboard__container">
      <h2 className="dashboard__header">Flashcards total: {cards.length} </h2>

      <div className="dashboard__addcard">
        <h2>Add card</h2>
        <form
          className="dashboard__addcard_form"
          onSubmit={addCardHandler}
          autoComplete="off"
        >
          <div className="dashboard__addcard__input">
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
          <div className="dashboard__addcard__input">
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

      <div className="dashboard__csv">
        <h2>Add cards from CSV</h2>
        <p>Format is lang1,lang2,front,back</p>
        <p>This is default CSV file from google translate</p>
        <CSVReader
          onUploadAccepted={results => {
            exstractCSV(results);
          }}
        >
          {({ getRootProps, acceptedFile, ProgressBar }) => (
            <>
              {newCards.length > 0 && (
                <div className="dashboard__csv__filename">
                  {acceptedFile && acceptedFile.name}
                </div>
              )}
              <div className="dashboard__csv__card">
                <button className="btn" type="button" {...getRootProps()}>
                  Browse file
                </button>
                <button className="btn" onClick={clearNewCardsHandler}>
                  Remove
                </button>
                <button className="btn" onClick={addNewCardsHandler}>
                  Add cards
                </button>
              </div>
              <ProgressBar />
            </>
          )}
        </CSVReader>
      </div>
      {newCards.length > 0 && listNewCards(newCards)}
    </div>
  );
};

export default Dashboard;
