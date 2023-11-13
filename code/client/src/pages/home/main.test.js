import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { createNote } from '../noteService'; // Replace with the actual path to your service

// Create the mock for axios
const mock = new AxiosMockAdapter(axios);

// Test suite for createNote function
describe('createNote', () => {
  it('successfully creates a note', async () => {
    // Set up the mock response
    mock.onPost('http://localhost:8000/user/create-new-doc').reply(200);

    const userId = 'user123';
    const title = 'My New Note';

    // Act
    const creatingNote = createNote(userId, title);

    // Assert
    await expect(creatingNote).resolves.toBeUndefined();
    expect(mock.history.post[0].data).toEqual(JSON.stringify({ userId, title }));
  });

  // other tests can be added here for failure cases
});

// noteService.js
import axios from 'axios';

// Your actual implementation of createNote function
export const createNote = async (userId, title) => {
  // ... your existing implementation
};
