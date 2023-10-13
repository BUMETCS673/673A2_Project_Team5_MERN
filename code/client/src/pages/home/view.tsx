import React from 'react';
import NoteCard, { NoteCardProps } from '../../components/NoteCard';
import Header from '../../components/Header';
import './view.css';
import { useDisclosure } from '@mantine/hooks';
import { NavLink, Modal, Button } from '@mantine/core';
import {
  IconHome2,
  IconTrash,
  IconGauge,
  IconActivity,
  IconChevronRight,
  IconTag,
} from '@tabler/icons-react';

interface HomeViewProps {
  cardData: NoteCardProps[];
  burgerOpened: boolean;
  toggleBurger: () => void;
}

export default function HomeView({ cardData, burgerOpened, toggleBurger }: HomeViewProps) {
  const [modalOpened, { open, close }] = useDisclosure(false); //for modal

  return (
    //whole page // Then here we return content in Burger, navLink
    <div>
      <Header burgerOpened={burgerOpened} toggleBurger={toggleBurger} />
      <div id="three-content-area">
        <div id="bbb">
          {burgerOpened && (
            <div className="left-sidebar">
              <div id="Nav">
                <NavLink
                  className="nav-link"
                  label="Note"
                  leftSection={<IconHome2 size="1rem" stroke={1.5} />}
                  rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                />
                <NavLink
                  className="nav-link"
                  label="Reminder"
                  leftSection={<IconGauge size="1rem" stroke={1.5} />}
                  rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                />
                <NavLink
                  className="nav-link"
                  label="Tags"
                  leftSection={<IconTag size="1rem" stroke={1.5} />}
                  rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                />
                <NavLink
                  className="nav-link"
                  label="Archive"
                  leftSection={<IconActivity size="1rem" stroke={1.5} />}
                  rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                />
                <NavLink
                  className="nav-link"
                  label="Trash"
                  leftSection={<IconTrash size="1rem" stroke={1.5} />}
                  rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
                />
              </div>
            </div>
          )}
        </div>

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
                {/* <h3>Date</h3>
                <input type="date" name="date"></input> <br></br> */}
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
