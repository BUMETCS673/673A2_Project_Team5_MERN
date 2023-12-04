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
import Cookies from 'universal-cookie';

export default function Home() {
  const cookies = new Cookies();
  const accessToken = cookies.get('accessToken');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const getUser = async (): Promise<UserDocument> =>
    axios
      .get(`http://localhost:8000/user/`, {
        headers: { authorization: accessToken },
      })
      .then((response) => response.data);

  const deleteNote = async (docId: string) =>
    //remove user_id once middleware works
    // axios.delete(`http://localhost:8000/user/delete-doc/${docId}`);
    axios.delete(`http://localhost:8000/user/delete-doc/${docId}/`, {
      headers: { authorization: accessToken },
    });

  const createNote = async ({ userId, title }: { userId: string; title: string }) =>
    axios
      .post(
        `http://localhost:8000/user/create-new-doc`,
        {
          userId: userId,
          title: title,
        },
        {
          headers: { authorization: accessToken },
        }
      )
      .then((response) => response.data);

  const {
    data: getUserData,
    isError: getUserError,
    isPending: getUserLoading,
    refetch: getUserRefetch,
  } = useQuery({ queryKey: ['getUser'], queryFn: getUser });

  const {
    mutate: mutateDeleteDoc,
    isPending: deleteCardLoading,
    isError: deleteCardError,
  } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      getUserRefetch();
    },
  });

  const {
    mutate: mutateCreateDoc,
    // data: createNoteData,
    isError: createCardError,
  } = useMutation({
    mutationFn: createNote,
    onSuccess: (response) => {
      getUserRefetch();
      navigate(`/document/${response.document_id}`);
    },
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
