import { combineReducers } from 'redux'

import expenses from './expenses'
import accounts from './accounts'
import payees from './payees'
import envelopes from './envelopes'

const expenseTracker = combineReducers({
    expenses,
    accounts,
    payees,
    envelopes
})

export default expenseTracker;
