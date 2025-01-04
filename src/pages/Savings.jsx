import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavings } from '../actions';
import { categories, getTransactions } from '../util';

function Savings() {
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.savings);
  const selectedSortSavingsByAmount = useSelector(
    (state) => state.sortSavingsByAmount
  );
  const loading = useSelector((state) => state.loading);
  const savingsCategory = useSelector((state) => state.savingsCategory);
  const totalSavings = savings.reduce((acc, curr) => acc + curr.amount, 0);

  const savingsTransactions = getTransactions(
    selectedSortSavingsByAmount,
    savingsCategory,
    savings
  );

  useEffect(() => {
    dispatch(fetchSavings());
  }, [dispatch]);

  return (
    <div>
      <h1>Savings Page</h1>
      <div>
        <h3>Sort Amount:</h3>
        <div>
          <input
            id="LOW_TO_HIGH"
            type="checkbox"
            value="LOW_TO_HIGH"
            name="SORT"
            checked={selectedSortSavingsByAmount === 'LOW_TO_HIGH'}
            onChange={(e) =>
              dispatch({
                type: 'SELECT_SAVINGS_SORT',
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
            checked={selectedSortSavingsByAmount === 'HIGH_TO_LOW'}
            onChange={(e) =>
              dispatch({
                type: 'SELECT_SAVINGS_SORT',
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
          value={savingsCategory}
          onChange={(e) =>
            dispatch({
              type: 'SET_SAVINGS_CATEGORY',
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
              <b>Description</b>
            </td>
            <td>
              <b>Amount</b>
            </td>
            <td>
              <b>Category</b>
            </td>
            <td>
              <b>Created Date</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {savingsTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                <b>{transaction.description}</b>
              </td>
              <td>
                <b>₹{transaction.amount}</b>
              </td>
              <td>
                <b>{transaction.category}</b>
              </td>
              <td>
                <b>{transaction.createdAt}</b>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {savingsTransactions.length === 0 && !loading && (
        <p>No Transactions Available</p>
      )}
      {loading ? 'Loading ... ' : ''}
      <h2>Summary</h2>
      <div>Total Savings: ₹{totalSavings}</div>
    </div>
  );
}

export default Savings;
