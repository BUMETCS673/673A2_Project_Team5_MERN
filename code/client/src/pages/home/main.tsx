import React, { useEffect, useState } from 'react';
import HomeView from './view';
import { NoteCardType } from '../../constants/cardData';
import { user } from '../../constants/user';
import axios from 'axios';

export default function Home() {
  // card data from backend is saved in this state
  const [cardData, setCardData] = useState<NoteCardType[]>([]); // init to empty, use api data to fill
  const [loading, setLoading] = useState(true); // for loading state
  const [error, setError] = useState(false); //for error state
  const [postError, setPostError] = useState(false); //for post create note

  // get request
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user'); // from where
        setCardData(response.data.docs);
        setLoading(false); // false, because data is already load
      } catch (err) {
        console.error('An error occurred while fetching data:', err);
        setError(true); // if error occur, state is true
        setLoading(false); // error loading process over
      }
    };

    fetchData();
  }, []); // run only one time

  const createNote = async (userId: string, title: string) => {
    try {
      // POST
      await axios.post('http://localhost:8000/user/create-new-doc', {
        userId: userId,
        title: title,
      });
      setPostError(false); //if already load successful
    } catch (err) {
      console.error('An error occurred while posting data:', err);
      setPostError(true);
    }
  };

  return (
    <HomeView
      userData={user}
      cardData={cardData}
      loading={loading}
      error={error}
      createNote={createNote}
      postError={postError}
    />
  );
}
