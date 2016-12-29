'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, TextInput, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

import PhoneStatusBar from '../components/PhoneStatusBar';
import ListSelector from '../components/ListSelector';
import colors from '../config/colors'
import { storeExpense } from '../actions/storage'

const NULL_ENVELOPE = { id: 0, name: '' };
const NULL_PAYEE  = { id: 0, name: '' };
const NULL_ACCOUNT = { id: 0, name: '' };

class ExpenseEntryScreen extends Component {

  constructor(props) {
    super(props)
    if ( this.props.expense ) {
        this.state = this.props.expense
    } else {
        this.state = {
          amount: 0,
          envelope: NULL_ENVELOPE,
          payee: NULL_PAYEE,
          account: NULL_ACCOUNT,
          date: new Date().toString(),
          memo: ''
        }
    }
  }

  onDateChange = (date) => {
    this.setState({date: date.toString()});
  };

  onPressSave() {
      // TODO validate amount > 0 and account id not 0

      this.props.storeExpense( this.state );
      this.props.navigator.pop();
  }

  /* Event handlers for selections in ListSelector  */

  onEnvelopeSelected( envelope ) {
      if ( envelope.id === this.state.envelope.id ) {
          this.setState( {envelope: NULL_ENVELOPE } );
          return;
      }
      this.setState( { envelope } );
  }

  onPayeeSelected( payee ) {
      if ( payee.id === this.state.payee.id ) {
          this.setState( {payee: NULL_PAYEE } );
          return;
      }
      // TODO: Select last envelope and account for this payee from transaction history, if possible
      this.setState( { payee } );
  }

  onAccountSelected( account ) {
      if ( account.id === this.state.account.id ) {
          this.setState( {account: NULL_ACCOUNT } );
          return;
      }
      this.setState( { account } );
  }

  /* Event handlers for ListSelector presses */

  _onSelectEnvelope() {
      this.props.navigator.push({
          name: "SelectEnvelope",
          callback: this.onEnvelopeSelected.bind(this),
          selectedId: this.state.envelope.id,
          title: "Select Payee",
          leftButton: "Back"
      })
  }

  _onSelectPayee() {
      this.props.navigator.push({
          name: "SelectPayee",
          callback: this.onPayeeSelected.bind(this),
          selectedId: this.state.payee.id,
          title: "Select Payee",
          leftButton: "Back"
      })
  }

  _onSelectAccount() {
      this.props.navigator.push({
          name: "SelectAccount",
          callback: this.onAccountSelected.bind(this),
          selectedId: this.state.account.id,
          title: "Select Payee",
          leftButton: "Back"
      })
  }

    render() {
        return (
            <View style={ styles.expenseEntry }>
              <StatusBar />
              <PhoneStatusBar />
              <ScrollView>
                <View style={ styles.container }>
                    <TextInput
                        style={[styles.amountInput]}
                        keyboardType={'decimal-pad'}
                        onChangeText={ (amount) => {
                            this.setState( { amount: amount * 100 } )
                        } }
                        returnKeyType={'next'}
                        value={ (this.state.amount / 100 ).toString() }
                        placeholder='0.00'
                    />
                </View>
                <ListSelector
                    onPress={ this._onSelectPayee.bind(this) }
                    itemSelected={ this.state.payee.id != NULL_PAYEE.id }
                    text={ this.state.payee.name }
                    placeholderText={ 'Select Payee' }
                />
                <ListSelector
                  onPress={ this._onSelectEnvelope.bind(this) }
                  itemSelected={ this.state.envelope.id != NULL_ENVELOPE.id }
                  text={ this.state.envelope.name }
                  placeholderText={ 'Select envelope' }
               />
               <ListSelector
                   onPress={ this._onSelectAccount.bind(this) }
                   itemSelected={ this.state.account.id != NULL_ACCOUNT.id }
                   text={ this.state.account.name }
                   placeholderText={ 'Select Account' }
               />
                <TextInput
                    placeholder="Memo"
                    onChangeText={(memo) => this.setState({memo})}
                    value={this.state.memo}
                    multiline={true}
                    style={[styles.memoInput, styles.container]}
                />
                <DatePickerIOS mode="date" date={new Date(this.state.date)} onDateChange={this.onDateChange} />
                <Button
                  onPress={ this.onPressSave.bind(this) }
                  title="Save"
                  large
                  accessibilityLabel="Save the expense in database"
                  backgroundColor={colors.action}
                />
              </ScrollView>
            </View>
        )
    }

}

ExpenseEntryScreen.propTypes = {
    expense: PropTypes.object,
    onStoreExpense: PropTypes.func
}

const styles = StyleSheet.create({

  container: {
    padding: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },

  expenseEntry: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },

  amountInput: {
      height:40
  },

  memoInput: {
      height: 120
  },

})

const mapDispatchToProps = (dispatch) => {
  return {
    storeExpense: ( expense ) => {
      dispatch(storeExpense( expense) )
    }
  }
}

module.exports = connect(null, mapDispatchToProps)(ExpenseEntryScreen)
