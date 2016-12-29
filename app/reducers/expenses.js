import { LOAD_EXPENSES_SUCCESS } from '../actions/storage'

export default function expenses(state, action) {
  if (typeof state === 'undefined') {
    return [];
  }

  switch (action.type) {
      case LOAD_EXPENSES_SUCCESS:
          return action.payload
  }

  return state
}
