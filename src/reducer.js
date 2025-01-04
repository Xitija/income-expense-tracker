const initialState = {
  income: [],
  expenses: [],
  savings: [],
  sortIncomeByAmount: "",
  sortExpenseByAmount: "",
  sortSavingsByAmount: "",
  incomeCategory: "",
  savingsCategory: "",
  expenseCategory: "",
  loading: false,
  error: null,
};

const financeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_INCOME_SUCCESS":
      return {
        ...state,
        income: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_INCOME_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error fetching income data",
      };
    case "FETCH_EXPENSES_SUCCESS":
      return {
        ...state,
        expenses: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_EXPENSES_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error fetching expense data",
      };
    case "FETCH_SAVINGS_SUCCESS":
      return {
        ...state,
        savings: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_SAVINGS_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error fetching savings data",
      };
    case "ADD_ENTRY_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error Fetching or Adding data",
      };
    case "ADD_INCOME_SUCCESS":
      return {
        ...state,
        income: [...state.income, action.payload],
        loading: false,
        error: null,
      };
    case "ADD_EXPENSE_SUCCESS":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        loading: false,
        error: null,
      };
    case "SELECT_INCOME_SORT":
      return {
        ...state,
        sortIncomeByAmount: action.payload,
        loading: false,
        error: null
      }
    case "SELECT_EXPENSE_SORT":
      return {
        ...state,
        sortExpenseByAmount: action.payload,
        loading: false,
        error: null
      }
    case "SELECT_SAVINGS_SORT":
      return {
        ...state,
        sortSavingsByAmount: action.payload,
        loading: false,
        error: null
      }
    case "SET_INCOME_CATEGORY":
      return {
        ...state,
        incomeCategory: action.payload,
        loading: false,
        error: null
      }
    case "SET_EXPENSE_CATEGORY":
      return {
        ...state,
        expenseCategory: action.payload,
        loading: false,
        error: null
      }
    case "SET_SAVINGS_CATEGORY":
      return {
        ...state,
        savingsCategory: action.payload,
        loading: false,
        error: null
      }
    default:
      return state;
  }
};

export default financeReducer;
