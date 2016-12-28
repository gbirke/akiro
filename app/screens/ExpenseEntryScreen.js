'use strict';

import React, { Component } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, TextInput, DatePickerIOS, Button } from 'react-native';

import PhoneStatusBar from '../components/PhoneStatusBar';
import ListSelector from '../components/ListSelector';

class ExpenseEntryScreen extends Component {
    static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    envelope: { id: 0, name: ''},
    payee: { id: 0, name: ''},
    account: { id: 0, name: ''},
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
      this.setState( { envelope } );
  }

  onPayeeSelected( payee ) {
      // TODO: Select last envelope and account for this payee from transaction history, if possible
      this.setState( { payee } );
  }

  onAccountSelected( account ) {
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
                <TextInput
                    style={[styles.amountInput, styles.container]}
                    keyboardType={'decimal-pad'}
                    value="0.00"
                />
                <ListSelector
                    onPress={ this._onSelectPayee.bind(this) }
                    itemSelected={ this.state.payee.id > 0}
                    text={ this.state.payee.name }
                    placeholderText={ 'Select Payee' }
                />
                <ListSelector
                  onPress={ this._onSelectEnvelope.bind(this) }
                  itemSelected={ this.state.envelope.id > 0 }
                  text={ this.state.envelope.name }
                  placeholderText={ 'Select envelope' }
               />
               <ListSelector
                   onPress={ this._onSelectAccount.bind(this) }
                   itemSelected={ this.state.account.id > 0 }
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

  },

  memoInput: {
      height: 150
  },

})

module.exports = ExpenseEntryScreen
