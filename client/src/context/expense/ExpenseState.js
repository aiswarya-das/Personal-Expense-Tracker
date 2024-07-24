import React, { useReducer } from 'react';
import axios from 'axios';
import ExpenseContext from './expenseContext';
import expenseReducer from './expenseReducer';
import { GET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from '../types';

const ExpenseState = ({ children }) => {
  const initialState = {
    expenses: [],
  };

  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const getExpenses = async () => {
    try {
      const res = await axios.get('/api/expenses');
      dispatch({ type: GET_EXPENSES, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const addExpense = async (expense) => {
    try {
      const res = await axios.post('/api/expenses', expense);
      dispatch({ type: ADD_EXPENSE, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      dispatch({ type: DELETE_EXPENSE, payload: id });
    } catch (err) {
      console.error(err);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      const res = await axios.put(`/api/expenses/${id}`, updatedExpense);
      dispatch({ type: UPDATE_EXPENSE, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        getExpenses,
        addExpense,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseState;
