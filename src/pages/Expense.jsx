import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../actions';
import { categories, getTransactions } from '../util';

function Expense() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);
  const selectedSortExpenseByAmount = useSelector(
    (state) => state.sortExpenseByAmount
  );
  const expenseCategory = useSelector((state) => state.expenseCategory);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const loading = useSelector((state) => state.loading);

  const expenseTransactions = getTransactions(
    selectedSortExpenseByAmount,
    expenseCategory,
    expenses
  );

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <div>
      <h1>Expense Page</h1>
      <div>
        <h3>Sort Amount:</h3>
        <div>
          <input
            id="LOW_TO_HIGH"
            type="checkbox"
            value="LOW_TO_HIGH"
            name="SORT"
            checked={selectedSortExpenseByAmount === 'LOW_TO_HIGH'}
            onChange={(e) =>
              dispatch({
                type: 'SELECT_EXPENSE_SORT',
                payload: e.target.value
              })
            }
          />
          <label className="accessiblity" htmlFor={'LOW_TO_HIGH'}>
            {'Low to High'}
          </label>
        </div>
        <div>
          <input
            id="HIGH_TO_LOW"
            type="checkbox"
            value="HIGH_TO_LOW"
            name="SORT"
            checked={selectedSortExpenseByAmount === 'HIGH_TO_LOW'}
            onChange={(e) =>
              dispatch({
                type: 'SELECT_EXPENSE_SORT',
                payload: e.target.value
              })
            }
          />
          <label className="accessiblity" htmlFor={'HIGH_TO_LOW'}>
            {'High to Low'}
          </label>
        </div>
      </div>
      <div>
        <h3>Select Category:</h3>
        <select
          value={expenseCategory}
          onChange={(e) =>
            dispatch({
              type: 'SET_EXPENSE_CATEGORY',
              payload: e.target.value
            })
          }
        >
          <option value={''}>Select Category</option>
          {categories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <table>
        <thead>
          <tr>
            <td>
              <b>Transaction Description</b>
            </td>
            <td>
              <b>Amount</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {expenseTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                <b>{transaction.description}</b>
              </td>
              <td>
                <b> ₹{transaction.amount}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {expenseTransactions.length === 0 && !loading && (
        <p>No Transactions Available</p>
      )}
      {loading ? 'Loading ... ' : ''}
      <h2>Summary</h2>
      <div>Total Expenses: ₹{totalExpenses}</div>
    </div>
  );
}

export default Expense;
