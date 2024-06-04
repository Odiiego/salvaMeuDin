import React from 'react';
import { ListContext } from '../context/ListContext';

export const useListContext = () => {
  const context = React.useContext(ListContext);
  if (context === null) throw new Error('Invalid Context');
  return context;
};
