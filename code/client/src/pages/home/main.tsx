import React from 'react';
import HomeView from './view';
import { cardData } from '../../constants/cardData';
import { user } from '../../constants/user';

export default function Home() {
  return <HomeView cardData={cardData} userData={user} />;
}
