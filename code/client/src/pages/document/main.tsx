import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DocumentView from './view';
import { useParams } from 'react-router-dom';
import { Document } from '@/models/document';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export default function DocumentPage() {
  const { docId } = useParams();

  const [updateContentSuccess, setUpdateContentSuccess] = useState<boolean>(false);
  const [updateSummarySuccess, setUpdateSummarySuccess] = useState<boolean>(false);

  const getDocument = async (): Promise<{ docs: Document }> =>
    axios.get(`http://localhost:8000/document/${docId}`).then((response) => response.data); // from where

  const updateContent = async ({ contentData }: { contentData: string }) =>
    axios.post(`http://localhost:8000/document/${docId}/update-content`, {
      docId: docId,
      content: contentData,
    });

  const updateSummary = async () =>
    axios
      .post(`http://localhost:8000/document/${docId}/update-summary`, {
        documentId: docId,
      })
      .then((response) => response.data);

  const {
    data: getDocumentData,
    isError: getDocumentError,
    isPending: getDocumentLoading,
    refetch: getDocumentRefetch,
  } = useQuery({ queryKey: ['getDocument', docId], queryFn: getDocument });

  const {
    mutate: mutateUpdateContent,
    isPending: updateContentLoading,
    isError: updateContentError,
  } = useMutation({
    mutationFn: updateContent,
    onSuccess: () => {
      // The mutation was successful
      setUpdateContentSuccess(true);

      setTimeout(() => {
        // Reset the state here
        setUpdateContentSuccess(false);
      }, 2000);
    },
  });

  const {
    mutate: mutateUpdateSummary,
    data: updateSummaryData,
    isPending: updateSummaryLoading,
    isError: updateSummaryError,
  } = useMutation({
    mutationFn: updateSummary,
    onSuccess: () => {
      // getDocumentRefetch();
      // The mutation was successful
      setUpdateSummarySuccess(true);

      setTimeout(() => {
        // Reset the state here
        setUpdateSummarySuccess(false);
      }, 2000);
    },
  });

  const handleSave = async (contentData: string) => {
    mutateUpdateContent({ contentData });
  };

  const handleSummary = async () => {
    mutateUpdateSummary();
  };

  console.log('updateSummaryData', updateSummaryData);

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
      updateSummaryLoading={updateSummaryLoading}
      updateSummaryError={updateSummaryError}
      updateSummarySuccess={updateSummarySuccess}
      // functions
      onSaveClick={handleSave}
      onGenerateClick={handleSummary}
    />
  );
}
