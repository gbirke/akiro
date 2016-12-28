'use strict';

import React, { Component } from 'react';
import { View, ListView, StatusBar, StyleSheet } from 'react-native';
import { List, Button } from 'react-native-elements'

import ExpenseListItem from '../components/ExpenseListItem';
import PhoneStatusBar from '../components/PhoneStatusBar';
import colors from '../config/colors'

const dummyExpenses = [
  { date: new Date('2016-10-24'), amount: '5.00', payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
  { date: new Date('2016-10-22'), amount: '10.00', payee: { name: 'Restaurant', id: 1 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Auswärts essen', id: 1 } },
  { date: new Date('2016-10-22'), amount: '12.97', payee: { name: 'Edeka', id: 2 }, account: { 'name': 'Bargeld', id: 1 }, envelope: { name: 'Supermarkt', id: 2 } },
];

class ExpensesListScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      expensesDataSource: ds.cloneWithRows( dummyExpenses )
    }
  }

  _onPressAdd() {
      this.props.navigator.push({
          name: "EnterExpense",
          leftButton: "Back"
      })
  }

  _onSelectExpense( expense ) {
      this.props.navigator.push({
          name: "EnterExpense",
          leftButton: "Back",
          expense: expense
      })
  }

  render() {
    return (
      <View style={ styles.expenseList }>
        <StatusBar />
        <PhoneStatusBar />
        <List>
          <ListView
            dataSource={ this.state.expensesDataSource }
            renderRow={ this._renderExpenseRow.bind(this) }
          />
        </List>
        <View style={styles.addEntryContainer}>
            <Button
                onPress={ this._onPressAdd.bind(this) }
                title="Add Entry"
                backgroundColor={colors.action}
            />
        </View>
      </View>
    )
  }

  _renderExpenseRow( expense ) {
    //const selectExpenseHandler = this._onSelectExpense.bind(this);
    return (
      <ExpenseListItem
          expense={ expense }
          onPress={ () => { this._onSelectExpense( expense ) } }
      />
    )
  }

}

const styles = StyleSheet.create({

  expenseList: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
},

addEntryContainer: {
    marginTop: 5
}

})

module.exports = ExpensesListScreen
