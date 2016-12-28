// TODO Remove this when application is finished
const initialState  = [
    { name: 'Restaurant', id: 1 },
    { name: 'Edeka', id: 2 },
    { name: 'Biosphäre', id: 3 },
    { name: 'Vermieter', id: 4 },
    { name: 'Stadtwerke', id: 5 },
    { name: 'Krankenkasse', id: 6 },
    { name: 'Rudi\'s Resterampe', id: 7 }
];

export default function payees(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
