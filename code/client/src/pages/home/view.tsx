import React, { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard';
import Header from '../../components/Header';
import '../../components/view.css';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { NoteCardType } from '../../constants/cardData';
import { userType } from '@/constants/user';
import axios from 'axios';

interface HomeViewProps {
  userData: userType;
  // cardData: NoteCardType[];
}

export default function HomeView({ userData }: HomeViewProps) {
  // dummy data
  const [cardData, setCardData] = useState<NoteCardType[]>([]); // init to empty, use api data to fill
  const [loading, setLoading] = useState(true); // for loading state
  const [error, setError] = useState(false); //for error state

  const [modalOpened, { open, close }] = useDisclosure(false); //for modal

  // get request
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user'); // from where
        setCardData(response.data);
        setLoading(false); // false, because data is already load
      } catch (err) {
        console.error('An error occurred while fetching data:', err);
        setError(true); // if error occur, state is true
        setLoading(false); // error loading process over
      }
    };

    fetchData();
  }, []); // run only one time

  // render
  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>An error occurred while fetching data.</p>;
    }

    if (cardData.length === 0) {
      return <p>No Documents Found</p>;
    }

    return (
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
    );
  };

  return (
    //whole page // Then here we return content in Burger, navLink
    <div>
      <Header />
      <div id="three-content-area">
        <div id="left-side"></div>

        <div id="doc-list">{renderContent()}</div>

        <div id="create-note">
          <Button id="big-button" onClick={open}>
            + Create New
          </Button>
          <Modal opened={modalOpened} onClose={close} title={<h2>Create New Note</h2>} centered>
            <div>
              <form action="">
                <h3>Title</h3>
                <input type="text" name="title"></input>
                {/* <h3>Tags</h3>
                <input type="text" name="tag"></input> */}
                <div id="button-father">
                  <Button id="big-button-modal" onClick={open}>
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
