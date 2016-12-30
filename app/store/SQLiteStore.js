import SQLite from 'react-native-sqlite-storage';

export class SQLiteStore {

    constructor() {
        this.db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, this.openCB, this.errorCB);
        this.createStructure();
    }

    errorCB(err) {
        console.log("error: ", err);
        return false;
    }

    successCB() {
        // console.log("SQL executed ...");
    }

    openCB() {
        // console.log("db opened")
    }

    createStructure() {
        const sql = [
            'CREATE TABLE IF NOT EXISTS schema_versions ( version INTEGER NOT NULL ) ',
            'CREATE TABLE IF NOT EXISTS expenses (' +
                'id INTEGER PRIMARY KEY NOT NULL, ' +
                'amount INTEGER NOT NULL, ' +
                'memo TEXT, ' +
                'payee INTEGER, ' +
                'envelope INTEGER NOT NULL, ' +
                'account INTEGER NOT NULL, ' +
                'date INTEGER NOT NULL ' +
            ')',
            'CREATE TABLE IF NOT EXISTS envelopes (' +
                'id INTEGER PRIMARY KEY NOT NULL, ' +
                'name VARCHAR(255), ' +
                'category VARCHAR(255) ' +
            ')',
            'CREATE TABLE IF NOT EXISTS payees (' +
                'id INTEGER PRIMARY KEY NOT NULL, ' +
                'name VARCHAR(255)' +
            ')',
            'CREATE TABLE IF NOT EXISTS accounts (' +
                'id INTEGER PRIMARY KEY NOT NULL, ' +
                'name VARCHAR(255)' +
            ')'
        ];
        sql.map( this._executeSQL.bind(this) );
    }

    _executeSQL( sql ) {
        this.db.transaction( tx => tx.executeSql(
            sql,
            [],
            this.successCB,
            this.errorCB
        ))
    }

    storeExpense( expense ) {
        const db = this.db;
        return new Promise( ( resolve, reject ) => {
            const values = [
                expense.id,
                expense.amount,
                expense.memo,
                expense.payee.id,
                expense.envelope.id,
                expense.account.id,
                Math.round( new Date(expense.date).getTime() / 1000 )
            ]
            db.transaction( tx => tx.executeSql(
                'INSERT OR REPLACE INTO expenses ( id, amount, memo, payee, envelope, account, date ) VALUES (?,?,?,?,?,?,?)',
                values,
                (tx, result) => {
                    expense.id = result.insertId;
                    resolve( expense )
                },
                reject
         ) )
        } );
    }

    storeEnvelope( envelope ) {
        const db = this.db;
        return new Promise( ( resolve, reject ) => {
            const values = [
                envelope.id,
                envelope.name,
                envelope.category
            ]
            db.transaction( tx => tx.executeSql(
                'INSERT OR REPLACE INTO envelopes ( id, name, category ) VALUES (?,?,?)',
                values,
                (tx, result) => {
                    envelope.id = result.insertId;
                    resolve( envelope );
                },
                reject
         ) )
        } );
    }

    storeAccount( account ) {
        const db = this.db;
        return new Promise( ( resolve, reject ) => {
            const values = [
                account.id,
                account.name
            ]
            db.transaction( tx => tx.executeSql(
                'INSERT OR REPLACE INTO accounts ( id, name ) VALUES (?,?)',
                values,
                (tx, result) => {
                    account.id = result.insertId;
                    resolve( account );
                },
                reject
         ) )
        } );
    }

    storePayee( payee ) {
        const db = this.db;
        console.log("storing payee");
        return new Promise( ( resolve, reject ) => {
            const values = [
                payee.id,
                payee.name
            ]
            db.transaction( tx => tx.executeSql(
                'INSERT OR REPLACE INTO payees ( id, name ) VALUES (?,?)',
                values,
                (tx, result) => {
                    payee.id = result.insertId;
                    resolve( payee );
                },
                reject
         ) )
        } );
    }

    loadExpenses() {
        return new Promise( ( resolve, reject ) => {
            const sql = 'SELECT e1.id as expense_id, e1.amount, e1.date, e1.memo, ' +
                'e2.id as envelope_id, e2.name as envelope_name, e2.category as envelope_category, ' +
                'p.id as payee_id, p.name as payee_name, ' +
                'a.id as account_id, a.name as account_name ' +
                'FROM expenses e1 ' +
                'LEFT JOIN envelopes e2 ON e1.envelope = e2.id ' +
                'LEFT JOIN payees p ON e1.payee = p.id ' +
                'LEFT JOIN accounts a ON e1.account = a.id ' +
                'ORDER BY e1.date, e1.id'
            this.db.transaction( tx =>
                tx.executeSql( sql, [], (tx,results) => {
                    let len = results.rows.length;
                    const expenses = [];
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        let expense = {
                            id: row.expense_id,
                            amount: row.amount,
                            date: new Date( row.date * 1000 ).toString(),
                            memo: row.memo,
                            payee: { id: row.payee_id, name: row.payee_name },
                            envelope: {
                                id: row.envelope_id,
                                name: row.envelope_name,
                                category: row.envelope_category
                            },
                            account: { id: row.account_id, name: row.account_name }
                        }

                        expenses.push( expense );
                    }
                    resolve( expenses );
                }, reject )
            )
        } )
    }

    loadPayees() {
        return new Promise( ( resolve, reject ) => {
            this.db.transaction( tx =>
                tx.executeSql( 'SELECT id, name FROM payees ORDER BY name', [], (tx,results) => {
                    let len = results.rows.length;
                    const payees = [];
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        payees.push( row );
                    }
                    resolve( payees );
                }, reject )
            )
        } );
    }

    loadEnvelopes() {
        return new Promise( ( resolve, reject ) => {
            this.db.transaction( tx =>
                tx.executeSql( 'SELECT id, name, category FROM envelopes ORDER BY category, name', [], (tx,results) => {
                    let len = results.rows.length;
                    const envelopes = [];
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        envelopes.push( row );
                    }
                    resolve( envelopes );
                }, reject )
            )
        } );
    }

    loadAccounts() {
        return new Promise( ( resolve, reject ) => {
            this.db.transaction( tx =>
                tx.executeSql( 'SELECT id, name FROM accounts ORDER BY name', [], (tx,results) => {
                    let len = results.rows.length;
                    const accounts = [];
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        accounts.push( row );
                    }
                    resolve( accounts );
                }, reject )
            )
        } );
    }
}

export let store = new SQLiteStore();
