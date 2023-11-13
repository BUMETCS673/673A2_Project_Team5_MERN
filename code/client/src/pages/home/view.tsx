import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteCard from '../../components/NoteCard';
import Header from '../../components/Header';
import '../../components/view.css';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { NoteCardType } from '../../constants/cardData';
import { AuthContext } from '../../hooks/authContext';
import { UserDocument } from '../../models/user';

interface HomeViewProps {
  getUserData?: UserDocument;
  getUserLoading: boolean;
  getUserError: boolean;
  createCardError: boolean;
  deleteCardLoading: boolean;
  deleteCardError: boolean;
  createNote: (userId: string, title: string) => void;
  handleDelete: (docId: string) => void;
}

export default function HomeView({
  getUserData,
  getUserLoading,
  getUserError,
  createCardError,
  deleteCardLoading,
  deleteCardError,
  createNote,
  handleDelete,
}: HomeViewProps) {
  const { user } = useContext(AuthContext);

  const inputRef = useRef<HTMLInputElement>(null); // for focus on input text box
  const [modalOpened, { open, close }] = useDisclosure(false); //for modal
  const [title, setNoteTitle] = useState(''); // store note

  //focus on input box
  useEffect(() => {
    if (modalOpened && inputRef.current) {
      console.log('Modal is opened, setting focus.'); //test
      inputRef.current.focus();
    }
  }, [modalOpened]); //When modal open again, run use effect

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setNoteTitle(event.target.value);
  };

  // handle form
  const handleFormSubmit = async () => {
    if (title.trim() === '') {
      // empty title
      console.log('Title is required');
      return;
    }
    // create note     userData.id,
    createNote(user?.user_id, title);
    close();
  };

  //keypress enter for create new note
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  // render
  const noteCardList = () => {
    // loading state
    if (getUserLoading) {
      return <p>Loading...</p>;
    }

    // error state
    if (getUserError) {
      return <p>An error occurred while fetching data</p>;
    }

    // data is fetched
    if (getUserData?.docs) {
      const { docs } = getUserData;

      if (docs.length >= 1) {
        return docs.map((card, index) => (
          <NoteCard
            key={index}
            title={card.title}
            imageSrc={card.imageSrc}
            summary={card.summary}
            document_id={card.document_id}
            onCardDelete={() => handleDelete(card.document_id)}
          />
        ));
      }

      return <p>No Documents Found</p>;
    }
  };

  return (
    //whole page // Then here we return content in Burger, navLink
    <div>
      <Header />
      <div id="three-content-area">
        <div id="left-side"></div>
        {/* //this is for the left side space, to make page looks more
        beautiful */}
        <div id="doc-list">
          {/* //It is the big div for all document cards */}
          <div id="doc-container">
            {/* // for every card */}
            {noteCardList()}
          </div>
        </div>
        <div id="create-note">
          <Button id="big-button" onClick={open}>
            + Create New
          </Button>
          <Modal opened={modalOpened} onClose={close} title={<h2>Create New Note</h2>} centered>
            <div>
              <form>
                <h3>Title</h3>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  ref={inputRef}
                ></input>
                <div id="button-father">
                  <Button id="big-button-modal" onClick={handleFormSubmit}>
                    + Create New
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
