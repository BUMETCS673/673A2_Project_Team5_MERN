import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Home from './Home';

jest.mock('axios');

describe('Home Component', () => {
  // Test case for creating a note
  it('creates a new note when the user enters a title and submits the form', async () => {
    // Prepare the component for testing
    const { getByText, getByPlaceholderText } = render(<Home />);
    
    // Mock the post request for creating a new note
    const postSpy = jest.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { docId: 1 }, // Assume your API returns an object with a docId
    });

    // Simulate user input
    fireEvent.change(getByPlaceholderText('Note title'), { target: { value: 'My New Note' } });
    fireEvent.click(getByText('+ Create New')); // Simulate the button click that triggers note creation

    // Wait for the post request to be called
    await waitFor(() => expect(postSpy).toHaveBeenCalled());

    // Assert the post request was made with the correct data
    expect(postSpy).toHaveBeenCalledWith(`http://localhost:8000/user/create-new-doc`, {
      userId: 'some-user-id', // Replace with actual user ID expected
      title: 'My New Note',
    });

    // Assert that the component handles the response correctly
    // This might involve checking if the component navigates to the new note's page
    // Or if it updates the state to include the new note in the list of notes
    // The actual assertions here will depend on how your component is supposed to behave
  });
});
