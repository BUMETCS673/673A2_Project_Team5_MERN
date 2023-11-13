import React, { useContext, useEffect, useState } from 'react';
import HomeView from './view';
import { NoteCardType } from '../../constants/cardData';
import { user } from '../../constants/user';
import axios from 'axios';
import { AuthContext } from '../../hooks/authContext';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { User, UserDocument } from '../../models/user';
import { Document } from '../../models/document';

export default function Home() {
  const { user } = useContext(AuthContext);
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const getUser = async (): Promise<UserDocument> =>
    axios.get(`http://localhost:8000/user/${user?.user_id}`).then((response) => response.data);

  const deleteNote = async (docId: string) =>
    //remove user_id once middleware works
    // axios.delete(`http://localhost:8000/user/delete-doc/${docId}`);
    axios.delete(`http://localhost:8000/user/delete-doc/${docId}/${user?.user_id}`);

  const createNote = async ({ userId, title }: { userId: string; title: string }) =>
    axios.post(`http://localhost:8000/user/create-new-doc`, {
      userId: userId,
      title: title,
    });

  // const createNoteOld = async (userId: string, title: string) => {
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

  const {
    data: getUserData,
    isError: getUserError,
    isPending: getUserLoading,
  } = useQuery({ queryKey: ['getUser'], queryFn: getUser });

  const {
    mutate: mutateDeleteDoc,
    isPending: deleteCardLoading,
    isError: deleteCardError,
  } = useMutation({
    mutationFn: deleteNote,
  });

  const { mutate: mutateCreateDoc, isError: createCardError } = useMutation({
    mutationFn: createNote,
  });

  const handleDelete = async (docId: string) => {
    mutateDeleteDoc(docId);
  };

  const handleCreate = async (userId: string, title: string) => {
    mutateCreateDoc({ userId, title });
  };

  return (
    <HomeView
      getUserData={getUserData}
      getUserLoading={getUserLoading}
      getUserError={getUserError}
      createCardError={createCardError}
      deleteCardLoading={deleteCardLoading}
      deleteCardError={deleteCardError}
      createNote={handleCreate}
      handleDelete={handleDelete}
    />
  );
}
