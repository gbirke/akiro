import { call, apply, put, fork, takeEvery, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/storage'
import getStore from '../store/InMemoryStore';

function* storeExpense( action ) {
    const store = getStore();
    yield apply( store, store.storeExpense, action.payload );
    yield put( actions.loadExpenses() )
}

function* loadExpenses() {
    const store = getStore();
    const expenses = yield apply( store, store.loadExpenses );
    yield put( actions.loadExpensesSuccess( expenses ) );
}

export function* storeExpenseSaga() {
  yield takeEvery( actions.STORE_EXPENSE, storeExpense );
}

export function* loadExpensesSaga() {
    yield takeEvery( actions.LOAD_EXPENSES, loadExpenses );
}

export function* loadAllSaga() {
    yield fork( put, actions.loadExpenses() );
}
