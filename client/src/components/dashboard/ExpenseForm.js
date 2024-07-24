import React, { useState, useContext } from 'react';
import ExpenseContext from '../../context/expense/expenseContext';

const ExpenseForm = ({ categories }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const expenseContext = useContext(ExpenseContext);
  const { addExpense } = expenseContext;

  const onSubmit = (e) => {
    e.preventDefault();
    addExpense({ date, amount, category, description });
    setDate('');
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
