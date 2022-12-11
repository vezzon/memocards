import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useCards from '../../hooks/useCards';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useCSVReader } from 'react-papaparse';
import CardsList from '../CardsList';
import './Dashboard.css';
import AddCard from '../AddCard';

const Dashboard = () => {
  const { cards, refresh } = useCards();
  const { userId } = useAuth();
  const [newCards, setNewCards] = useState([]);
  const { CSVReader } = useCSVReader();
  const axiosPrivate = useAxiosPrivate();

  const createCardReq = async card => {
    try {
      await axiosPrivate.post(`cards`, card);
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className="dashboard__container">
      <h2 className="dashboard__header">Flashcards total: {cards.length} </h2>

      <AddCard />

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
      {newCards.length > 0 && <CardsList cards={newCards} />}
    </div>
  );
};

export default Dashboard;
