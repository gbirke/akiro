export const STORE_EXPENSE = 'STORE_EXPENSE';
export const LOAD_EXPENSES = 'LOAD_EXPENSES';
export const LOAD_EXPENSES_SUCCESS = 'LOAD_EXPENSES_SUCCESS';
export const LOAD_PAYEES = 'LOAD_PAYEES';
export const LOAD_PAYEES_SUCCESS = 'LOAD_PAYEES_SUCCESS';
export const LOAD_ENVELOPES = 'LOAD_ENVELOPES';
export const LOAD_ENVELOPES_SUCCESS = 'LOAD_ENVELOPES_SUCCESS';
export const LOAD_ACCOUNTS = 'LOAD_ACCOUNTS';
export const LOAD_ACCOUNTS_SUCCESS = 'LOAD_ACCOUNTS_SUCCESS';
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

export function loadPayees() {
    return { type: LOAD_PAYEES }
}

export function loadPayeesSuccess( payees ) {
    return { type: LOAD_PAYEES_SUCCESS, payload: payees }
}

export function loadEnvelopes() {
    return { type: LOAD_ENVELOPES }
}

export function loadEnvelopesSuccess( envelopes ) {
    return { type: LOAD_ENVELOPES_SUCCESS, payload: envelopes }
}

export function loadAccounts() {
    return { type: LOAD_ACCOUNTS }
}

export function loadAccountsSuccess( accounts ) {
    return { type: LOAD_ACCOUNTS_SUCCESS, payload: accounts }
}

export function loadAll() {
    return { type: LOAD_ALL }
}
