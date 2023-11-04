import React, { useEffect, useState } from 'react';
import { IconAlertTriangleFilled } from '@tabler/icons-react';
import NoteCard from '../../components/NoteCard';
import Header from '../../components/Header';
import '../../components/view.css';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { NoteCardType } from '../../constants/cardData';
import { userType } from '@/constants/user';
interface HomeViewProps {
  userData: userType;
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
  const [modalOpened, { open, close }] = useDisclosure(false); //for modal
  const [title, setNoteTitle] = useState(''); // store note
  // const [modalOpenedDelete, control2] = useDisclosure(false); //this modal is for delete

  // handle form
  const handleFormSubmit = async () => {
    if (title.trim() === '') {
      // empty title
      console.log('Title is required');
      return;
    }
    // create note     userData.id,
    createNote('siyuan', title); //
    // setNoteTitle('');
    if (!createCardError) {
      close();
    }
  };

  // handle form
  const handleDelete = async (docId: number) => {
    // create note     userData.id,
    deleteNote(docId); //
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setNoteTitle(event.target.value);
  };

  // render
  const noteCardList = () => {
    if (getCardLoading) {
      return <p>Loading...</p>;
    }

    if (getCardError) {
      return <p>An error occurred while fetching data</p>;
    }

    if (cardData.length === 0) {
      return <p>No Documents Found</p>;
    }

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
    ));
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
                <input type="text" name="title" onChange={handleChange}></input>
                {/* <h3>Tags</h3>
                <input type="text" name="tag"></input> */}
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
