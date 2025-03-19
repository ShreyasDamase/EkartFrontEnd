import {GET_CATEGORIES} from './constants';
export const getCategory = () => {
  console.log('getCategory action dispatched'); // <-- Add this
  return {
    type: GET_CATEGORIES,
  };
};
