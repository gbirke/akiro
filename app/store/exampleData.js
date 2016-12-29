
export const expenses = [
    { id: 1, date: '2016-10-24', amount: 500, payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
    { id: 2, date: '2016-10-22', amount: 1000, payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
    { id: 3, date: '2016-10-22', amount: 1297, payee: { name: 'Edeka', id: 2 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Supermarkt', id: 2 } },
];

export const payees = [
    { name: 'Restaurant', id: 1 },
    { name: 'Edeka', id: 2 },
    { name: 'Biosphäre', id: 3 },
    { name: 'Vermieter', id: 4 },
    { name: 'Stadtwerke', id: 5 },
    { name: 'Krankenkasse', id: 6 },
    { name: 'Rudi\'s Resterampe', id: 7 }
];

export const envelopes = [
    { name: 'Auswärts essen', id: 1, category: 'Allgemeine Ausgaben' },
    { name: 'Supermarkt', id: 2, category: 'Allgemeine Ausgaben' },
    { name: 'Naturkost', id: 3, category: 'Allgemeine Ausgaben' },
    { name: 'Miete', id: 4, category: 'Wohnen' },
    { name: 'Strom', id: 5, category: 'Wohnen' },
    { name: 'Zahnzusatzversicherung', id: 6, category: 'Finanzen' },
];

export const  accounts = [
    { name: 'Bargeld', id: 1 },
    { name: 'Girokonto', id: 2 },
    { name: 'Kreditkarte', id: 3 },
    { name: 'Coinbase', id: 4 },
];

export function loadExampleData( store ) {
    return Promise.all( [
        Promise.all( accounts.map( store.storeAccount.bind( store ) ) ),
        Promise.all( envelopes.map( store.storeEnvelope.bind( store ) ) ),
        Promise.all( payees.map( store.storePayee.bind( store ) ) ),
        Promise.all( expenses.map( store.storeExpense.bind( store ) ) ),
    ]);
}
