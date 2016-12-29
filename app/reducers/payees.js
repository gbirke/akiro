import { LOAD_PAYEES_SUCCESS } from '../actions/storage';

export default function payees(state, action) {
  if (typeof state === 'undefined') {
    return [];
  }

  switch (action.type) {
      case LOAD_PAYEES_SUCCESS:
          return action.payload
  }
  
  return state
}
