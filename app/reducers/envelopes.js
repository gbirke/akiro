// TODO Remove this when application is finished
const initialState  = [
    { name: 'Auswärts essen', id: 1, category: 'Allgemeine Ausgaben' },
    { name: 'Supermarkt', id: 2, category: 'Allgemeine Ausgaben' },
    { name: 'Naturkost', id: 3, category: 'Allgemeine Ausgaben' },
    { name: 'Miete', id: 4, category: 'Wohnen' },
    { name: 'Strom', id: 5, category: 'Wohnen' },
    { name: 'Zahnzusatzversicherung', id: 6, category: 'Finanzen' },
];

export default function payees(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}
