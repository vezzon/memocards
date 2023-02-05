import { useCSVReader } from 'react-papaparse';
import { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import useCards from '../hooks/useCards';
import EditCards from './EditCards';
import Button from './Button';

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

  const deleteCardHandler = cardToDelete => {
    const removedArr = [...newCards].filter(card => card !== cardToDelete);

    setNewCards(removedArr);
  };

  const editCardHandler = cardToEdit => {};

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
      <div className="mx-auto mt-4 flex flex-col items-center rounded-md border border-gray-600 bg-slate-700 p-4">
        <h2 className="p-2 font-bold text-indigo-300">Add cards from CSV</h2>
        <p className="text-sm">Format is lang1,lang2,front,back</p>
        <p className="text-sm">
          This is default CSV file from google translate
        </p>
        <CSVReader
          onUploadAccepted={results => {
            exstractCSV(results);
          }}
        >
          {({ getRootProps, acceptedFile, ProgressBar }) => (
            <>
              {newCards.length > 0 && (
                <div className="my-2 rounded-lg bg-slate-900 py-1 px-4 text-slate-300">
                  {acceptedFile && acceptedFile.name}
                </div>
              )}
              <div>
                {/* <Button {...getRootProps()} text="Browse file" type="button" /> // TODO: why this won't work */}
                <button
                  className="m-4 rounded-md bg-indigo-500 py-2 px-4 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none"
                  type="button"
                  {...getRootProps()}
                >
                  Browse file
                </button>
                {newCards.length > 0 && (
                  <Button clickHandler={clearNewCardsHandler}>
                    Remove file
                  </Button>
                )}
                {newCards.length > 0 && (
                  <Button clickHandler={addNewCardsHandler}>Add cards</Button>
                )}
              </div>
              <ProgressBar />
            </>
          )}
        </CSVReader>
      </div>
      {newCards.length > 0 && (
        <EditCards
          cards={newCards}
          deleteCardHandler={deleteCardHandler}
          editCardHandler={editCardHandler}
        />
      )}
    </>
  );
};

export default AddCardsCsv;
