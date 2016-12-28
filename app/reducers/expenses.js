// TODO Remove this when application is finished
const initialState = [
    { id: 1, date: '2016-10-24', amount: '5.00', payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
    { id: 2, date: '2016-10-22', amount: '10.00', payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
    { id: 3, date: '2016-10-22', amount: '12.97', payee: { name: 'Edeka', id: 2 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Supermarkt', id: 2 } },
];

export default function expenses(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
