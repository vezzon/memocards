import './AddCardsCsv.css';
import { useCSVReader } from 'react-papaparse';
import { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import useCards from '../hooks/useCards';
import EditCards from './EditCards';

const AddCardsCsv = () => {
  const { CSVReader } = useCSVReader();
  const [newCards, setNewCards] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useAuth();
  const { refresh } = useCards();

  const createCardReq = async card => {
    try {
      await axiosPrivate.post(`cards`, card);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCardHandler = card => {
    const index = newCards.indexOf(card);
    newCards.splice(index, 1);
    setNewCards(newCards);
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
    <>
      <div className="flex__container">
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
                <div className="csv__filename">
                  {acceptedFile && acceptedFile.name}
                </div>
              )}
              <div className="csv__card">
                <button className="btn" type="button" {...getRootProps()}>
                  Browse file
                </button>
                {newCards.length > 0 && (
                  <button className="btn" onClick={clearNewCardsHandler}>
                    Remove
                  </button>
                )}
                {newCards.length > 0 && (
                  <button className="btn" onClick={addNewCardsHandler}>
                    Add cards
                  </button>
                )}
              </div>
              <ProgressBar />
            </>
          )}
        </CSVReader>
        {newCards.length > 0 && (
          <EditCards cards={newCards} deleteCardHandler={deleteCardHandler} />
        )}
      </div>
    </>
  );
};

export default AddCardsCsv;
