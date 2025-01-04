import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIncome } from '../actions';
import { categories, getTransactions } from '../util';

function Income() {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income);
  const selectedSortIncomeByAmount = useSelector(
    (state) => state.sortIncomeByAmount
  );
  const incomeCategory = useSelector((state) => state.incomeCategory);
  const loading = useSelector((state) => state.loading);
  const totalIncome = income.reduce((acc, value) => value.amount + acc, 0);

  const incomeTransactions = getTransactions(
    selectedSortIncomeByAmount,
    incomeCategory,
    income
  );

  const handleSortChange = (e) => {
    console.log('val', e.target.value);
    dispatch({
      type: 'SELECT_INCOME_SORT',
      payload: e.target.value
    });
  };

  useEffect(() => {
    dispatch(fetchIncome());
  }, [dispatch]);

  return (
    <div>
      <h1>Income Page</h1>
      <div>
        <h3>Sort Amount:</h3>
        <div>
          <input
            id="LOW_TO_HIGH"
            type="checkbox"
            value="LOW_TO_HIGH"
            name="SORT"
            checked={selectedSortIncomeByAmount === 'LOW_TO_HIGH'}
            onChange={handleSortChange}
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
            checked={selectedSortIncomeByAmount === 'HIGH_TO_LOW'}
            onChange={handleSortChange}
          />
          <label className="accessiblity" htmlFor={'HIGH_TO_LOW'}>
            {'High to Low'}
          </label>
        </div>
        {/* <div>
          <input
            type="checkbox"
            value=""
            name="CLEAR"
            checked={selectSort === ''}
            onChange={handleSortChange}
          />
          <label className="accessiblity" htmlFor={'CLEAR'}>
            {'Clear'}
          </label>
        </div> */}
      </div>
      <div>
        <h3>Select Category:</h3>
        <select
          value={incomeCategory}
          onChange={(e) =>
            dispatch({
              type: 'SET_INCOME_CATEGORY',
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
          {incomeTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.description}</td>
              <td>₹{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {incomeTransactions.length === 0 && !loading && (
        <p>No Transactions Available</p>
      )}
      {loading ? 'Loading ... ' : ''}
      <h2>Summary</h2>
      <div>Total Income : ₹{totalIncome}</div>
    </div>
  );
}

export default Income;
