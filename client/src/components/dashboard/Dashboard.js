import React, { useContext, useState, useEffect } from 'react';
import ExpenseContext from '../../context/expense/expenseContext';
import CategoryContext from '../../context/category/categoryContext';
import ExpenseForm from './ExpenseForm';
import ExpenseItem from './ExpenseItem';

const Dashboard = () => {
  const expenseContext = useContext(ExpenseContext);
  const categoryContext = useContext(CategoryContext);
  const { expenses, getExpenses, addExpense } = expenseContext;
  const { categories, getCategories } = categoryContext;
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    getExpenses();
    getCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <ExpenseForm categories={categories} addExpense={addExpense} />
      <div>
        <label>Filter by category:</label>
        <select value={currentCategory} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {expenses
          .filter((exp) => (currentCategory ? exp.category === currentCategory : true))
          .map((exp) => (
            <ExpenseItem key={exp._id} expense={exp} />
          ))}
      </ul>
    </div>
  );
};

export default Dashboard;
