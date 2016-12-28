'use strict';

import React, { Component } from 'react';
import { View, ListView, StatusBar, StyleSheet } from 'react-native';
import { List, Button } from 'react-native-elements'

import ExpenseListItem from '../components/ExpenseListItem';
import PhoneStatusBar from '../components/PhoneStatusBar';
import colors from '../config/colors'

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

  _onPressAdd() {
      this.props.navigator.push({
          name: "EnterExpense",
          leftButton: "Back"
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
            renderRow={ this._renderExpenseRow }
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
    return (
      <ExpenseListItem expense={expense} onPress={(evt) => console.log(evt, expense)} />
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
