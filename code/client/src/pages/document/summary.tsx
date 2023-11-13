import React, { useEffect, useState } from 'react';
import { Card, Text, Button, rem, List, ScrollArea } from '@mantine/core';

interface SummaryGenerateProps {
  summary: string;
}

export const SummaryGenerate = ({ summary }: SummaryGenerateProps) => {
  return (
    <>
      <Card className="summary-card" padding="lg" radius="sm" withBorder>
        {summary ? (
          <div>
            <ScrollArea h={700}>
              <List size="md">{summary}</List>
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
        {/* <Button
                className="generate-button"
                variant="light"
                color="blue"
                loading={updateSummaryLoading}
                disabled={docContent === ''}
                fullWidth
                mt="md"
                radius="md"
                onClick={() => onGenerateClick({ userId: '', documentId: '' })}
              >
                {updateSummaryFinished === false ? 'Generate New!' : 'Generate'}
              </Button> */}
      </Card>
    </>
  );
};
