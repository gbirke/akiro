import { call, apply, put, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/storage'
import { store } from '../store/SQLiteStore';

function* storeExpense( action ) {
    yield apply( store, store.storeExpense, [ action.payload ] );
    yield put( actions.loadExpenses() )
}

function* loadExpenses() {
    const expenses = yield apply( store, store.loadExpenses );
    yield put( actions.loadExpensesSuccess( expenses ) );
}

function* loadPayees() {
    const payees = yield apply( store, store.loadPayees );
    yield put( actions.loadPayeesSuccess( payees ) );
}

function* loadEnvelopes() {
    const envelopes = yield apply( store, store.loadEnvelopes );
    yield put( actions.loadEnvelopesSuccess( envelopes ) );
}

function* loadAccounts() {
    const accounts = yield apply( store, store.loadAccounts );
    yield put( actions.loadAccountsSuccess( accounts ) );
}

function* loadAll() {
    yield fork( put, actions.loadExpenses() );
    yield fork( put, actions.loadPayees() );
    yield fork( put, actions.loadEnvelopes() );
    yield fork( put, actions.loadAccounts() );
}

export function* storeExpenseSaga() {
  yield takeEvery( actions.STORE_EXPENSE, storeExpense );
}

export function* loadExpensesSaga() {
    yield takeEvery( actions.LOAD_EXPENSES, loadExpenses );
}

export function* loadPayeesSaga() {
    yield takeEvery( actions.LOAD_PAYEES, loadPayees );
}

export function* loadEnvelopesSaga() {
    yield takeEvery( actions.LOAD_ENVELOPES, loadEnvelopes );
}

export function* loadAccountsSaga() {
    yield takeEvery( actions.LOAD_ACCOUNTS, loadAccounts );
}

export function* loadAllSaga() {
    yield takeEvery( actions.LOAD_ALL, loadAll )
}
