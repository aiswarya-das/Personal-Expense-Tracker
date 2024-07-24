import React, { useContext } from 'react';
import ExpenseContext from '../../context/expense/expenseContext';

const ExpenseItem = ({ expense }) => {
  const expenseContext = useContext(ExpenseContext);
  const { deleteExpense } = expenseContext;

  return (
    <li>
      <span>{expense.date} - </span>
      <span>${expense.amount} - </span>
      <span>{expense.category} - </span>
      <span>{expense.description}</span>
      <button onClick={() => deleteExpense(expense._id)}>Delete</button>
    </li>
  );
};

export default ExpenseItem;
