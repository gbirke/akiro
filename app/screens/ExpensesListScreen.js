'use strict';

import React, { Component } from 'react';
import { Text, View, ListView, StatusBar, TouchableOpacity, Navigator, StyleSheet } from 'react-native';

import { FormattedCurrency } from 'react-native-globalize';

const dummyExpenses = [
  { date: '2016-10-24', amount: 500, payee: { name: 'Imbiss' }, account: { 'name': 'Bargeld' }, envelope: { name: 'Auswärts essen' } },
  { date: '2016-10-22', amount: 1000, payee: { name: 'Restaurant' }, account: { 'name': 'Bargeld' }, envelope: { name: 'Auswärts essen' } },
  { date: '2016-10-22', amount: 1297, payee: { name: 'Penny' }, account: { 'name': 'Bargeld' }, envelope: { name: 'Supermarkt' } },
];

class ExpensesListScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      expensesDataSource: ds.cloneWithRows( dummyExpenses )
    }
  }

  render() {
    return (
      <View style={ styles.expenseList }>
        <StatusBar />
        <View style={ styles.statusBarBackground } />
        <ListView
          dataSource={ this.state.expensesDataSource }
          renderRow={ this._renderExpenseRow }
        />
      </View>
    )
  }

  _renderExpenseRow( expense ) {
    return (
      <TouchableOpacity
        style={ styles.expenseRow }
        onPress={ ( event ) => console.log( event, expense ) }>
        <Text style={ styles.expenseRowPayee }>{ expense.payee.name }</Text>
        <FormattedCurrency
          currency="EUR" value={ expense.amount/100 }
          style={ styles.expenseRowAmount } />
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({

  expenseList: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },

  statusBarBackground: {
    height: 20,
  },

  expenseRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    height: 20,
    marginLeft: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  expenseRowPayee: {
    fontWeight: 'bold'
  },

  expenseRowAmount: {
    flex: 1,
    textAlign: "right",
    paddingRight: 8,
    fontWeight: 'bold',
  }

})

module.exports = ExpensesListScreen
