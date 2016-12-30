'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StatusBar, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import ExpenseListItem from '../components/ExpenseListItem';
import PhoneStatusBar from '../components/PhoneStatusBar';
import colors from '../config/colors'

class ExpensesListScreen extends Component {
    static defaultProps = {
      expenses: []
    };

  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      expensesDataSource: ds.cloneWithRows( props.expenses )
    }
  }

  componentWillReceiveProps( newProps ) {
      if ( newProps.expenses !== this.props.expenses ) {
          this.setState({
            expensesDataSource: this.state.expensesDataSource.cloneWithRows(newProps.expenses)
          });
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
        <ListView
            dataSource={ this.state.expensesDataSource }
            renderRow={ this._renderExpenseRow.bind(this) }
            enableEmptySections={true}
        />
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

ExpensesListScreen.propTypes = {
    expenses: PropTypes.array,
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses
  }
}

export default connect(mapStateToProps)(ExpensesListScreen)
