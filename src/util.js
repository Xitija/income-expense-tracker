const sortByAmount = (selectedSort, transactions) => {
    if (selectedSort === 'LOW_TO_HIGH') {
        return transactions.sort((a, b) => a.amount - b.amount);
    } else if (selectedSort === 'HIGH_TO_LOW') {
        return transactions.sort((a, b) => b.amount - a.amount);
    } else {
        return transactions;
    }
};

const filterByCategory = (category, transactions) => {
    return transactions.filter((transaction) => transaction.category === category || category === "")
};

export const getTransactions = (selectedSort, category, transactions) => {
    return sortByAmount(selectedSort, (filterByCategory(category, transactions)));
}

export const categories = [
    'Rent',
    'Recharge',
    'EMI',
    'Shopping',
    'Bills',
    'Salary',
    'Investment',
    'Interest',
    'Investment Return',
    'Other'
];
