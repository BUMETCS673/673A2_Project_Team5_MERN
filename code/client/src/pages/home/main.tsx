import React, { useEffect, useState } from 'react';
import HomeView from './view';
import { NoteCardType } from '../../constants/cardData';
import { user } from '../../constants/user';
import axios from 'axios';

export default function Home() {
  // card data from backend is saved in this state
  const [cardData, setCardData] = useState<NoteCardType[]>([]); // init to empty, use api data to fill
  const [getCardLoading, setGetCardLoading] = useState(true); // for loading state
  const [getCardError, setGetCardError] = useState(false); //for error state
  const [createCardError, setCreateCardError] = useState(false); //for post create note
  const [deleteCardLoading, setDeleteCardLoading] = useState(false);
  const [deleteCardError, setDeleteCardError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user`); // from where
      setCardData(response.data.docs);
      setGetCardLoading(false); // false, because data is already load
    } catch (err) {
      console.error('An error occurred while fetching data:', err);
      setGetCardError(true); // if error occur, state is true
      setGetCardLoading(false); // error loading process over
    }
  };

  // get request, get document data
  //useeffect, fetchData first and then show my
  useEffect(() => {
    fetchData();
  }, []); // run once when cardData changes

  //create a new note
  const createNote = async (userId: string, title: string) => {
    try {
      // POST
      await axios.post(`http://localhost:8000/user/create-new-doc`, {
        userId: userId,
        title: title,
      });
      setCreateCardError(false); //if already load successful
    } catch (err) {
      console.error('An error occurred while posting data:', err);
      setCreateCardError(true);
    }
  };

  //delete card
  const deleteNote = async (docId: number) => {
    console.log(docId);
    setDeleteCardLoading(true);
    await axios
      .delete(`http://localhost:8000/user/delete-doc/${docId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('delete successful', response);
          // delete successful 200
          //update list docs
          // fetchData();
          setCardData(response.data.docs);
        } else {
          const errormessage = response.data?.message || 'error occur';
          setDeleteCardError(errormessage);
        }
      })
      .catch((err) => {
        // delete
        const errormessage2 = err.message || 'error occur';
        setDeleteCardError(errormessage2);
      })
      .finally(() => {
        setDeleteCardLoading(false);
      });
  };

  return (
    <HomeView
      userData={user}
      cardData={cardData}
      getCardLoading={getCardLoading}
      getCardError={getCardError}
      createNote={createNote}
      createCardError={createCardError}
      deleteCardLoading={deleteCardLoading}
      deleteCardError={deleteCardError}
      deleteNote={deleteNote}
    />
  );
}
