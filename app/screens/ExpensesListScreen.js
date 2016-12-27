'use strict';

import React, { Component } from 'react';
import { View, ListView, StatusBar, Navigator, StyleSheet } from 'react-native';
import { List } from 'react-native-elements'

import ExpenseListItem from '../components/ExpenseListItem';

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
        <List>
          <ListView
            dataSource={ this.state.expensesDataSource }
            renderRow={ this._renderExpenseRow }
          />
        </List>
      </View>
    )
  }

  _renderExpenseRow( expense ) {
    return (
      <ExpenseListItem expense={expense} onPress={(evt) => console.log(evt, expense)} />
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
  }

})

module.exports = ExpensesListScreen
