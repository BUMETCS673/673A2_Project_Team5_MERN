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
  getDocumentLoading: boolean;
  getDocumentError: boolean;
  getDocumentRefetch: () => void;
  updateContentLoading: boolean;
  updateContentError: boolean;
  updateContentSuccess: boolean;
  updateSummaryData: { summary: string };
  updateSummaryLoading: boolean;
  updateSummaryError: boolean;
  updateSummarySuccess: boolean;
  onSaveClick: (contentData: string) => void;
  onGenerateClick: () => void;
}

export default function DocumentView({
  getDocumentData,
  getDocumentLoading,
  getDocumentError,
  getDocumentRefetch,
  updateContentLoading,
  updateContentError,
  updateContentSuccess,
  updateSummaryData,
  updateSummaryLoading,
  updateSummaryError,
  updateSummarySuccess,
  onGenerateClick,
  onSaveClick,
}: DocumentViewProps) {
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
      return (
        <DocumentEditor
          content={getDocumentData.docs.content}
          updateContentLoading={updateContentLoading}
          updateContentError={updateContentError}
          updateContentSuccess={updateContentSuccess}
          onSaveClick={onSaveClick}
        />
      );
    }
  };

  const summarySection = () => {
    if (getDocumentData) {
      return (
        <SummaryGenerate
          summary={updateSummaryData?.summary ?? getDocumentData.docs.summary}
          updateSummaryLoading={updateSummaryLoading}
          updateSummaryError={updateSummaryError}
          updateSummarySuccess={updateSummarySuccess}
          onGenerateClick={onGenerateClick}
        />
      );
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="backbutton">
        <Button
          variant="transparent"
          onClick={() => navigate('/home')}
          leftSection={<IconArrowLeft style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
          radius="xl"
          size="md"
        >
          Back
        </Button>
        <div className="doc-title">{getDocumentData?.docs.title}</div>
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
