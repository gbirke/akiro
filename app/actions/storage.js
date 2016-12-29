export const STORE_EXPENSE = 'STORE_EXPENSE';
export const LOAD_EXPENSES = 'LOAD_EXPENSES'
export const LOAD_EXPENSES_SUCCESS = 'LOAD_EXPENSES_SUCCESS'
export const LOAD_ALL = 'LOAD_ALL';

// TODO add flux annotations for type checking
export function storeExpense( expense ) {
    return {
        type: STORE_EXPENSE,
        payload: expense
    }
}

export function loadExpenses() {
    return { type: LOAD_EXPENSES }
}

export function loadExpensesSuccess( expenses ) {
    return { type: LOAD_EXPENSES_SUCCESS, payload: expenses };
}

export function loadAll() {
    return { type: LOAD_ALL }
}
