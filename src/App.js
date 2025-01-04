import IncomeExpenseForm from "./pages/IncomeExpenseForm";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { FaGithubSquare } from "react-icons/fa";
import { FaServer } from "react-icons/fa6";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Savings from "./pages/Savings";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <div className="logo">Income Expense Tracker</div>
          <nav>
            <Link className="link" to="/dashboard">Dashboard</Link>
            <Link className="link" to="/income">Income</Link>
            <Link className="link" to="/expenses">Expense</Link>
            <Link className="link" to="/savings">Savings</Link>
            <Link className="link" to="/">New Entries</Link>
            <a className="link" target="_blank" href="https://github.com/Xitija/income-expense-tracker"><FaGithubSquare size={30} /></a>
            <a className="link" target="_blank" href="https://replit.com/@xitija/IncomeExpenseTracker?v=1"><FaServer size={30} /></a>
          </nav>
        </div>
        <div className="container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expense />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/" element={<IncomeExpenseForm />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
