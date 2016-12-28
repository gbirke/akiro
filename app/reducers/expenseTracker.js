import { combineReducers } from 'redux'

import expenses from './expenses'

const expenseTracker = combineReducers({
    expenses
})

export default expenseTracker;
