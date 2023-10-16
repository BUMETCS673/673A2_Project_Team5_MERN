import React from 'react';
import HomeView from './view';
import { cardData } from '../../constants/cardData';

export default function Home() {
  return <HomeView cardData={cardData} />;
}
