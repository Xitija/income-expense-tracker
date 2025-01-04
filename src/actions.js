const HOST_URL = `https://34e5f278-df0e-4bfd-95ea-b3adc3092944-00-2p7rksnt692ds.picard.replit.dev`;

const fetchIncome = () => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_DATA_LOADING" });
        const response = await fetch(HOST_URL + "/income");
        const data = await response.json();
        dispatch({ type: "FETCH_INCOME_SUCCESS", payload: data });
    } catch (error) {
        console.error("Error fetching income data", error);
        dispatch({ type: "FETCH_INCOME_FAILURE" });
    }
};

const fetchSavings = () => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_DATA_LOADING" });
        const response = await fetch(HOST_URL + "/savings");
        const data = await response.json();
        dispatch({ type: "FETCH_SAVINGS_SUCCESS", payload: data });
    } catch (error) {
        console.error("Error fetching savings data", error);
        dispatch({ type: "FETCH_SAVINGS_FAILURE" });
    }
};

const fetchExpenses = () => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_DATA_LOADING" });
        const response = await fetch(HOST_URL + "/expenses");
        const data = await response.json();
        dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: data });
    } catch (error) {
        console.error("Error fetching expense data", error);
        dispatch({ type: "FETCH_EXPENSES_FAILURE" });
    }
};

const addEntry = (entry) => async (dispatch) => {
    try {
        const response = await fetch(`${HOST_URL}/add-${entry.type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entry),
        });

        const data = await response.json();
        if (data.success === true) {
            if (entry.type === "income") {
                dispatch({ type: "ADD_INCOME_SUCCESS", payload: data.data });
            } else {
                dispatch({ type: "ADD_EXPENSE_SUCCESS", payload: data.data });
            }
        }
    } catch (error) {
        console.error("Error adding entry:", error);
        dispatch({ type: "ADD_ENTRY_FAILURE" });
    }
};

export { fetchIncome, fetchSavings, fetchExpenses, addEntry };
