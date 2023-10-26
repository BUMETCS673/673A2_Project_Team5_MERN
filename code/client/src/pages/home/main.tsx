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

  //for create note
  const postData = {
    userId,
    title,
  };

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

  return <HomeView userData={user} cardData={cardData} loading={loading} error={error} />;
}
