import React, { useReducer } from 'react';
import axios from 'axios';
import CategoryContext from './categoryContext';
import categoryReducer from './categoryReducer';
import { GET_CATEGORIES } from '../types';

const CategoryState = ({ children }) => {
  const initialState = {
    categories: [],
  };

  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const getCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      dispatch({ type: GET_CATEGORIES, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        getCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
