import React from 'react';
import NoteCard from '../../components/NoteCard';
import Header from '../../components/Header';
import './view.css';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { NoteCardType } from '../../constants/cardData';

interface HomeViewProps {
  cardData: NoteCardType[];
}

export default function HomeView({ cardData }: HomeViewProps) {
  const [modalOpened, { open, close }] = useDisclosure(false); //for modal

  return (
    //whole page // Then here we return content in Burger, navLink
    <div>
      <Header />
      <div id="three-content-area">
        <div id="bbb"></div>

        <div id="doc-dad">
          {cardData.length === 0 ? (
            <p>No Documents Found</p>
          ) : (
            <div id="doc-container">
              {cardData.map((card, index) => {
                return (
                  <NoteCard
                    key={index}
                    title={card.title}
                    imageSrc={card.imageSrc}
                    description={card.description}
                    linkURL={card.linkURL}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div id="create_note">
          <Button id="big-button" onClick={open}>
            + Create New
          </Button>
          <Modal opened={modalOpened} onClose={close} title={<h2>Create New Note</h2>} centered>
            <div>
              <form action="">
                <h3>Title</h3>
                <input type="text" name="title"></input> <br></br>
                <h3>Tags</h3>
                <input type="text" name="tag"></input> <br></br>
                <div id="button_father">
                  <button className="button-in-modal" name="submit" type="submit">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
