// TODO Remove this when application is finished
const initialState  = [
  { name: 'Bargeld', id: 1 },
  { name: 'Girokonto', id: 2 },
  { name: 'Kreditkarte', id: 3 },
  { name: 'Coinbase', id: 4 },
];

export default function accounts(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
