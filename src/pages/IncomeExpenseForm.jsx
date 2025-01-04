import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntry } from '../actions';
import { categories } from '../util';

const IncomeExpenseForm = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [entryType, setEntryType] = useState('income');

  const handleAddEntry = (e) => {
    e.preventDefault();
    console.log(entryType, 'entryType');
    dispatch(
      addEntry({
        description,
        amount: parseFloat(amount),
        type: entryType,
        category
      })
    );
    setDescription('');
    setAmount('');
    setEntryType('income');
  };

  return (
    <div>
      <h1>New Entry Page</h1>
      <fieldset>
        <form>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label>Entry Type: </label>
            <select
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="saving">Saving</option>
            </select>
          </div>
          <div>
            <label>Select Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={''}>Select Category</option>
              {categories.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddEntry}> Add Entry</button>
        </form>
      </fieldset>
    </div>
  );
};

export default IncomeExpenseForm;
