export class InMemoryStore {
    expenses = [];
    payees = [];
    envelopes = [];
    accounts = [];

    storeExpense( expense ) {
        this.expenses.push( expense );
        return Promise.resolve( expense );
    }

    storeEnvelope( envelope ) {
        this.envelopes.push( envelope );
        return Promise.resolve( envelope );
    }

    storeAccount( account ) {
        this.accounts.push( account );
        return Promise.resolve( account );
    }

    storePayee( payee ) {
        this.payees.push( payee );
        return Promise.resolve( payee );
    }

    loadExpenses() {
        return Promise.resolve( this.expenses.slice(0) );
    }

    loadPayees() {
        return Promise.resolve( this.payees.slice(0) );
    }

    loadEnvelopes() {
        return Promise.resolve( this.envelopes.slice(0) );
    }

    loadAccounts() {
        return Promise.resolve( this.accounts.slice(0) );
    }
}

export let store = new InMemoryStore();
