import React, { useEffect, useState } from 'react';
import { NoteCardType } from '../../constants/cardData';
import { user } from '../../constants/user';
import axios from 'axios';
import DocumentView from './view';
import { useParams } from 'react-router-dom';
import { Document } from '@/models/document';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export default function DocumentPage() {
  const { docId } = useParams();

  const getDocument = async (): Promise<{ docs: Document }> =>
    axios.get(`http://localhost:8000/document/${docId}`).then((response) => response.data); // from where

  const updateContent = async ({ contentData }: { contentData: string }) =>
    axios.post(`http://localhost:8000/document/${docId}/update-content`, {
      docId: docId,
      content: contentData,
    });

  const {
    data: getDocumentData,
    isError: getDocumentError,
    isPending: getDocumentLoading,
    refetch: getDocumentRefetch,
  } = useQuery({ queryKey: ['getDocument'], queryFn: getDocument });

  const {
    mutate: mutateUpdateContent,
    // data: createNoteData,
    isPending: updateContentLoading,
    isError: updateContentError,
    isSuccess: updateContentSuccess,
  } = useMutation({
    mutationFn: updateContent,
  });

  const handleSave = async (contentData: string) => {
    mutateUpdateContent({ contentData });
  };

  // const updateSummary = async ({ userId, documentId }: { userId: string; documentId: string }) => {
  //   setUpdateSummaryLoading(true);
  //   try {
  //     // GET
  //     await axios.post(`http://localhost:8000/document/${docId}/update-summary`, {
  //       documentId: docId,
  //     });
  //     setUpdateSummaryError(false); //if already load successful
  //     setUpdateSummaryLoading(false);
  //     setUpdateSummaryFinished(false);
  //   } catch (err) {
  //     console.error('An error occurred while posting data:', err);
  //     setUpdateSummaryLoading(false);
  //     setUpdateSummaryError(true);
  //   }
  // };

  return (
    <DocumentView
      // on page load params
      getDocumentData={getDocumentData}
      // summaryData={summaryData}
      getDocumentLoading={getDocumentLoading}
      getDocumentError={getDocumentError}
      getDocumentRefetch={getDocumentRefetch}
      // update content params
      updateContentLoading={updateContentLoading}
      updateContentError={updateContentError}
      updateContentSuccess={updateContentSuccess}
      // update summary params
      // updateSummaryLoading={updateSummaryLoading}
      // updateSummaryError={updateSummaryError}
      // updateSummaryFinished={updateSummaryFinished}
      // functions
      onSaveClick={handleSave}
      // onGenerateClick={updateSummary}
    />
  );
}
