import React, { useEffect, useState } from 'react';
import { Card, Text, Button, rem, List, ScrollArea } from '@mantine/core';
import { listSummary } from '../../functions/parsers';

interface SummaryGenerateProps {
  summary: string;
  updateSummaryLoading: boolean;
  updateSummaryError: boolean;
  updateSummarySuccess: boolean;
  onGenerateClick: () => void;
}

export const SummaryGenerate = ({
  summary,
  updateSummaryLoading,
  updateSummaryError,
  updateSummarySuccess,
  onGenerateClick,
}: SummaryGenerateProps) => {
  const summaryList = listSummary(summary);

  return (
    <>
      <Card className="summary-card" padding="lg" radius="sm" withBorder>
        {summary ? (
          <div>
            <ScrollArea h={700}>
              <List size="md">
                {summaryList.map((summary) => (
                  <List.Item>{summary}</List.Item>
                ))}
              </List>
            </ScrollArea>
          </div>
        ) : (
          <div>
            <Text className="tip-head" fw={500}>
              Tips to generate your summary!
            </Text>
            <Text size="sm" c="dimmed">
              Use AI to boost your study!
            </Text>
          </div>
        )}
        <Button
          className="generate-button"
          variant="light"
          color="blue"
          loading={updateSummaryLoading}
          // disabled={docContent === ''}
          fullWidth
          mt="md"
          radius="md"
          onClick={() => onGenerateClick()}
        >
          {/* {updateSummaryFinished === false ? 'Generate New!' : 'Generate'} */}
          Generate Summary
        </Button>
      </Card>
    </>
  );
};
