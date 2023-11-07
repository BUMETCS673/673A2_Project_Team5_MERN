import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteCard from '../../components/NoteCard';
import Header from '../../components/Header';
import '../../components/view.css';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { NoteCardType } from '../../constants/cardData';
import { AuthContext } from '../../hooks/authContext';
import { User } from '../../models/user';

interface HomeViewProps {
  userData?: User;
  cardData: NoteCardType[];
  getCardLoading: boolean;
  getCardError: boolean;
  createCardError: boolean;
  deleteCardLoading: boolean;
  deleteCardError: boolean;
  createNote: (userId: string, title: string) => void;
  deleteNote: (docId: number) => void;
}

export default function HomeView({
  userData,
  cardData,
  getCardLoading,
  getCardError,
  createNote,
  createCardError,
  deleteCardLoading,
  deleteCardError,
  deleteNote,
}: HomeViewProps) {
  const { user } = useContext(AuthContext);

  const inputRef = useRef<HTMLInputElement>(null); // for focus on input text box
  const [modalOpened, { open, close }] = useDisclosure(false); //for modal
  const [title, setNoteTitle] = useState(''); // store note
  // const [modalOpenedDelete, control2] = useDisclosure(false); //this modal is for delete

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
  };

  //keypress enter for create new note
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  // handle form
  const handleDelete = async (docId: number) => {
    // create note     userData.id,
    deleteNote(docId); //
  };

  // render
  const noteCardList = () => {
    if (getCardLoading) {
      return <p>Loading...</p>;
    }

    if (getCardError) {
      return <p>An error occurred while fetching data</p>;
    }

    if (cardData) {
      return cardData.map((card, index) => (
        <NoteCard
          key={index}
          title={card.title}
          imageSrc={card.imageSrc}
          description={card.description}
          linkURL={card.linkURL}
          _id={card._id}
          onCardDelete={() => handleDelete(card._id)}
        />
      ))
    }

    return <p>No Documents Found</p>
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
