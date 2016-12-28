'use strict';

import React, { Component } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, TextInput, DatePickerIOS, Button } from 'react-native';

import PhoneStatusBar from '../components/PhoneStatusBar';
import ListSelector from '../components/ListSelector';

const NULL_ENVELOPE = { id: 0, name: '' };
const NULL_PAYEE  = { id: 0, name: '' };
const NULL_ACCOUNT = { id: 0, name: '' };

class ExpenseEntryScreen extends Component {
    static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    amount: '',
    envelope: NULL_ENVELOPE,
    payee: NULL_PAYEE,
    account: NULL_ACCOUNT,
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  };

  onDateChange = (date) => {
    this.setState({date: date});
  };

  onPressSave() {
      console.log("saving is not implemented", this.state);
      // TODO
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
          selectedId: this.state.envelope.id
      })
  }

  _onSelectPayee() {
      this.props.navigator.push({
          name: "SelectPayee",
          callback: this.onPayeeSelected.bind(this),
          selectedId: this.state.payee.id
      })
  }

  _onSelectAccount() {
      this.props.navigator.push({
          name: "SelectAccount",
          callback: this.onAccountSelected.bind(this),
          selectedId: this.state.account.id
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
                        onChangeText={(amount) => this.setState({amount})}
                        returnKeyType={'next'}
                        value={this.state.amount}
                        placeholder='0.00'
                        placeholderTextColor={'#ebebeb'}
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
                    style={[styles.memoInput, styles.container]}
                    multiline={true}
                />
                <DatePickerIOS mode="date" date={this.state.date} onDateChange={this.onDateChange} />
                <Button
                  onPress={this.onPressSave}
                  title="Save"
                  accessibilityLabel="Save the expense in database"
                />
              </ScrollView>
            </View>
        )
    }

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
      height: 150
  },

})

module.exports = ExpenseEntryScreen
