import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import AuthState from './context/auth/AuthState';
import ExpenseState from './context/expense/ExpenseState';
import CategoryState from './context/category/CategoryState';

const App = () => {
  return (
    <AuthState>
      <ExpenseState>
        <CategoryState>
          <Router>
            <Routes>
              <Route path="/" element={<PrivateRoute component={Dashboard} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </CategoryState>
      </ExpenseState>
    </AuthState>
  );
};

export default App;
