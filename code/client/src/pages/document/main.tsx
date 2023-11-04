import React, { useEffect, useState } from 'react';
import { NoteCardType } from '../../constants/cardData';
import { user } from '../../constants/user';
import axios from 'axios';
import DocumentView from './view';
import { useParams } from 'react-router-dom';

export default function Document() {
  const { docId } = useParams();

  // card data from backend is saved in this state
  // On page load's states (data, loading, error)
  const [contentData, setContentData] = useState<string>(''); // init to empty, use api data to fill
  const [summaryData, setSummaryData] = useState<string>(''); // init to empty, use api data to fill
  const [onPageLoading, setOnPageLoading] = useState(true); // for loading state
  const [onPageError, setOnPageError] = useState(false); //for error state

  // Updating content's states (loading, error, finished updating)
  const [updateContentLoading, setUpdateContentLoading] = useState(false); // for loading state
  const [updateContentError, setUpdateContentError] = useState(false); //for error state
  const [updateContentFinished, setUpdateContentFinished] = useState(false); //for error state

  const [updateSummaryLoading, setUpdateSummaryLoading] = useState(false); // for loading state
  const [updateSummaryError, setUpdateSummaryError] = useState(false); //for error state
  const [updateSummaryFinished, setUpdateSummaryFinished] = useState(false); //for error state

  const getDocument = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/document/${docId}`); // from where
      setContentData(response.data.docs.content);
      setSummaryData(response.data.docs.summary);
      setOnPageLoading(false); // false, because data is already load
    } catch (err) {
      console.error('An error occurred while fetching data:', err);
      setOnPageError(true); // if error occur, state is true
      setOnPageLoading(false); // error loading process over
    }
  };

  // get request
  useEffect(() => {
    getDocument();
  }, []); // run only one time

  const updateContent = async ({
    userId,
    documentId,
    contentData,
  }: {
    userId: string;
    documentId: string;
    contentData: string;
  }) => {
    setUpdateContentLoading(true);
    try {
      // POST
      await axios.post('http://localhost:8000/user/save-note', {
        documentId: documentId,
        contentData: contentData,
      });

      // On method Success
      setUpdateContentError(false); //if already load successful
      setUpdateContentLoading(false);
      setUpdateContentFinished(true);
    } catch (err) {
      console.error('An error occurred while posting data:', err);
      setUpdateContentLoading(false);
      setUpdateContentError(true);
    }
  };

  const updateSummary = async ({ userId, documentId }: { userId: string; documentId: string }) => {
    setUpdateSummaryLoading(true);
    try {
      // GET
      await axios.post('http://localhost:8000/user/generate-summary', {
        documentId: documentId,
      });
      setUpdateSummaryError(false); //if already load successful
      setUpdateSummaryLoading(false);
      setUpdateSummaryFinished(false);
    } catch (err) {
      console.error('An error occurred while posting data:', err);
      setUpdateSummaryLoading(false);
      setUpdateSummaryError(true);
    }
  };

  return (
    <DocumentView
      // on page load params
      contentData={contentData}
      summaryData={summaryData}
      onPageLoading={onPageLoading}
      onPageError={onPageError}
      // update content params
      updateContentLoading={updateContentLoading}
      updateContentError={updateContentError}
      updateContentFinished={updateContentFinished}
      // update summary params
      updateSummaryLoading={updateSummaryLoading}
      updateSummaryError={updateSummaryError}
      updateSummaryFinished={updateSummaryFinished}
      // functions
      onSaveClick={updateContent}
      onGenerateClick={updateSummary}
    />
  );
}
