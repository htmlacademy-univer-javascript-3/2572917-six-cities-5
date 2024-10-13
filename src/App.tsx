import React from 'react';
import { Main } from './pages/Main';
import {IPlaceCard} from './types';

type AppScreenProps = {
  places: IPlaceCard[];
}

export const App: React.FC<AppScreenProps> = ({places}) => (
  <Main places={places}/>
);
