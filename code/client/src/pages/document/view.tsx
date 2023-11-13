import React, { useEffect, useState } from 'react';
import './view.css';
import { Card, Text, Button, rem, List, ScrollArea, Loader } from '@mantine/core';
import { IconArrowLeft, IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Document } from '@/models/document';
import { DocumentEditor } from './documentEditor';
import { SummaryGenerate } from './summary';
// import { useClipboard } from '@mantine/hooks';

interface DocumentViewProps {
  getDocumentData?: { docs: Document };
  // summaryData: string;
  getDocumentLoading: boolean;
  getDocumentError: boolean;
  getDocumentRefetch: () => void;
  // updateContentLoading: boolean;
  // updateContentError: boolean;
  // updateContentFinished: boolean;
  // updateSummaryLoading: boolean;
  // updateSummaryError: boolean;
  // updateSummaryFinished: boolean;
  // onSaveClick: ({
  //   userId,
  //   documentId,
  //   contentData,
  // }: {
  //   userId: string;
  //   documentId: string;
  //   contentData: string;
  // }) => void;
  // onGenerateClick: ({ userId, documentId }: { userId: string; documentId: string }) => void;
}

export default function DocumentView({
  getDocumentData,
  // summaryData,
  getDocumentLoading,
  getDocumentError,
  getDocumentRefetch,
}: // updateContentLoading,
// updateContentError,
// updateContentFinished,
// updateSummaryLoading,
// updateSummaryError,
// updateSummaryFinished,
// onSaveClick,
// onGenerateClick,
DocumentViewProps) {
  console.log('getDocumentData', getDocumentData);

  if (getDocumentLoading) {
    return <Loader />;
  }

  if (getDocumentError) {
    return (
      <div>
        Error, please try again
        <Button onClick={getDocumentRefetch}>Refresh</Button>
      </div>
    );
  }

  const contentSection = () => {
    if (getDocumentData) {
      return <DocumentEditor content={getDocumentData.docs.content} />;
    }
  };

  const summarySection = () => {
    if (getDocumentData) {
      return <SummaryGenerate summary={getDocumentData.docs.summary} />;
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div>
        <Button
          variant="transparent"
          onClick={() => navigate('/home')}
          leftSection={<IconArrowLeft style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
          radius="xl"
          size="md"
        >
          Back
        </Button>
        <div className="doc-title">DocumentTitle</div>
      </div>

      <ScrollArea w={1548}>
        <div className="layout">
          <div className="document-editor">{contentSection()}</div>
          <div className="summary">{summarySection()}</div>
        </div>
      </ScrollArea>
    </>
  );
}
