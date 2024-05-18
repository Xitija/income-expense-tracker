import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses, fetchIncome } from '../actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [reportType, setReportType] = useState('');
  const [report, setReport] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    savings: 0,
    expenseBreakdown: {}
  });

  const income = useSelector((state) => state.income);
  const expenses = useSelector((state) => state.expenses);
  const savings = useSelector((state) => state.savings);

  console.log(income);
  console.log(expenses);

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchIncome());
  }, [dispatch]);

  const generateReport = () => {
    console.log(reportType);
    if (reportType === 'incomeVsExpenses') {
      const totalIncome = income.reduce(
        (acc, transaction) => transaction.amount + acc,
        0
      );
      const totalExpenses = expenses.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      const totalSavings = savings.reduce((acc, curr) => acc + curr.amount, 0);
      console.log(totalIncome, totalExpenses, savings, 'savings');
      setReport((oldReport) => ({
        ...oldReport,
        totalIncome,
        totalExpenses,
        totalSavings
      }));
    } else if (reportType === 'expenseBreakdown') {
      const expenseBreakdown = {};
      expenses.forEach((transaction) => {
        const { amount, category } = transaction;
        if (expenseBreakdown[category]) {
          expenseBreakdown[category] += amount;
        } else {
          expenseBreakdown[category] = amount;
        }
      });

      setReport((oldReport) => ({
        ...oldReport,
        expenseBreakdown
      }));
    }
  };

  return (
    <div className="report">
      <h2>Financial Reports</h2>
      <div>
        <label>Select Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">Select a report type</option>
          <option value="incomeVsExpenses">Income vs. Expenses</option>
          <option value="expenseBreakdown">Expense Breakdown</option>
        </select>
      </div>

      <button onClick={generateReport}>Generate Report</button>

      {report.totalIncome > 0 && reportType === 'incomeVsExpenses' && (
        <div>
          <h3>Report</h3>
          <div>
            <p>Total Income: ₹{report.totalIncome}</p>
            <p>Total Expenses: ₹{report.totalExpenses}</p>
            <p>Savings: ₹{report.totalSavings}</p>
          </div>
        </div>
      )}

      {Object.keys(report.expenseBreakdown).length > 0 &&
        reportType === 'expenseBreakdown' && (
          <div>
            <h4>Expense Breakdown:</h4>
            <ul>
              {Object.keys(report.expenseBreakdown).map(
                (description, index) => (
                  <li key={index}>
                    {description}: ₹{report.expenseBreakdown[description]}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
