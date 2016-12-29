export class InMemoryStore {
    // TODO Remove contents when application is finished
    expenses = [
        { id: 1, date: '2016-10-24', amount: '5.00', payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
        { id: 2, date: '2016-10-22', amount: '10.00', payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
        { id: 3, date: '2016-10-22', amount: '12.97', payee: { name: 'Edeka', id: 2 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Supermarkt', id: 2 } },
    ];

    storeExpense( expense ) {
        this.expenses.push( expense );
        return Promise.resolve( expense );
    }

    loadExpenses() {
        console.log("loading expenses", this, this.expenses );
        return Promise.resolve( this.expenses );
    }
}

let store;

export default function getStore() {
    if ( !store ) {
        store = new InMemoryStore();
    }
    return store;
}
