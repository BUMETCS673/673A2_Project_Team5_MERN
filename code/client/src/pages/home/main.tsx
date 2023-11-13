import React, { useContext, useEffect, useState } from 'react';
import HomeView from './view';
import { NoteCardType } from '../../constants/cardData';
import { user } from '../../constants/user';
import axios from 'axios';
import { AuthContext } from '../../hooks/authContext';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User, UserDocument } from '../../models/user';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // card data from backend is saved in this state
  const [cardData, setCardData] = useState<NoteCardType[]>([]); // init to empty, use api data to fill
  const [getCardLoading, setGetCardLoading] = useState(false); // for loading state
  const [getCardError, setGetCardError] = useState(false); //for error state
  const [createCardError, setCreateCardError] = useState(false); //for post create note
  const [deleteCardLoading, setDeleteCardLoading] = useState(false);
  const [deleteCardError, setDeleteCardError] = useState(false);

  const getUser = async (): Promise<UserDocument> =>
    axios.get(`http://localhost:8000/user/${user?.user_id}`).then((response) => response.data);

  // {
  //   try {
  //     console.log('user', user)
  //     const response = await axios.get(`http://localhost:8000/user`, {params: { user_id: user?.user_id }}); // from where
  //     // setCardData(response.data.docs);
  //     // setGetCardLoading(false); // false, because data is already load
  //     return response.data
  //   } catch (err) {
  //     console.error('An error occurred while fetching data:', err);
  //     // setGetCardError(true); // if error occur, state is true
  //     // setGetCardLoading(false); // error loading process over
  //   }
  // };

  const {
    data: userData,
    isError: getUserError,
    isPending: getUserLoading,
  } = useQuery({ queryKey: ['getUser'], queryFn: getUser });
  console.log('userData', userData);

  //create a new note
  // const createNote = async (userId: string, title: string) => {
  //   try {
  //     // POST
  //     const response = await axios.post(`http://localhost:8000/user/create-new-doc`, {
  //       userId: userId,
  //       title: title,
  //     });
  //     setCreateCardError(false); //if already load successful
  //     navigate(`/document/${response.data.docId}`);
  //   } catch (err) {
  //     console.error('An error occurred while posting data:', err);
  //     setCreateCardError(true);
  //   }
  // };

  //delete card
  // const deleteNote = async (docId: number) => {
  //   console.log(docId);
  //   setDeleteCardLoading(true);
  //   await axios
  //     .delete(`http://localhost:8000/user/delete-doc/${docId}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log('delete successful', response);
  //         // delete successful 200
  //         //update list docs
  //         // fetchData();
  //         setCardData(response.data.docs);
  //       } else {
  //         const errormessage = response.data?.message || 'error occur';
  //         setDeleteCardError(errormessage);
  //       }
  //     })
  //     .catch((err) => {
  //       // delete
  //       const errormessage2 = err.message || 'error occur';
  //       setDeleteCardError(errormessage2);
  //     })
  //     .finally(() => {
  //       setDeleteCardLoading(false);
  //     });
  // };

  return (
    <HomeView
      // userData={userData}
      cardData={userData?.docs}
      getCardLoading={getUserLoading}
      getCardError={getUserError}
      // createNote={createNote}
      // createCardError={createCardError}
      // deleteCardLoading={deleteCardLoading}
      // deleteCardError={deleteCardError}
      // deleteNote={deleteNote}
    />
  );
}
