import { LOAD_ACCOUNTS_SUCCESS } from '../actions/storage'

export default function accounts( state, action ) {
  if (typeof state === 'undefined') {
    return []
  }

  switch (action.type) {
      case LOAD_ACCOUNTS_SUCCESS:
          return action.payload
  }

  return state
}
