export class InMemoryStore {
    // TODO Remove contents when application is finished
    expenses = [
        { id: 1, date: '2016-10-24', amount: '5.00', payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
        { id: 2, date: '2016-10-22', amount: '10.00', payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
        { id: 3, date: '2016-10-22', amount: '12.97', payee: { name: 'Edeka', id: 2 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Supermarkt', id: 2 } },
    ];

    payees = [
        { name: 'Restaurant', id: 1 },
        { name: 'Edeka', id: 2 },
        { name: 'Biosphäre', id: 3 },
        { name: 'Vermieter', id: 4 },
        { name: 'Stadtwerke', id: 5 },
        { name: 'Krankenkasse', id: 6 },
        { name: 'Rudi\'s Resterampe', id: 7 }
    ];

    envelopes = [
        { name: 'Auswärts essen', id: 1, category: 'Allgemeine Ausgaben' },
        { name: 'Supermarkt', id: 2, category: 'Allgemeine Ausgaben' },
        { name: 'Naturkost', id: 3, category: 'Allgemeine Ausgaben' },
        { name: 'Miete', id: 4, category: 'Wohnen' },
        { name: 'Strom', id: 5, category: 'Wohnen' },
        { name: 'Zahnzusatzversicherung', id: 6, category: 'Finanzen' },
    ]

    storeExpense( expense ) {
        this.expenses.push( expense );
        return Promise.resolve( expense );
    }

    loadExpenses() {
        return Promise.resolve( this.expenses );
    }

    loadPayees() {
        return Promise.resolve( this.payees );
    }

    loadEnvelopes() {
        return Promise.resolve( this.envelopes );
    }
}

let store;

export default function getStore() {
    if ( !store ) {
        store = new InMemoryStore();
    }
    return store;
}
