'use strict';

import React, { Component } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, TextInput, DatePickerIOS, Button, TouchableHighlight } from 'react-native';
import { Icon, Text } from 'react-native-elements'

import PhoneStatusBar from '../components/PhoneStatusBar';

class ExpenseEntryScreen extends Component {
    static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    envelope: { id: 0, name: ''},
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  };

  onDateChange = (date) => {
    this.setState({date: date});
  };

  onPressSave() {
      // TODO
  }

  onEnvelopeSelected( envelope ) {
      this.setState( { envelope: envelope } );
  }

  _onSelectEnvelope() {
      this.props.navigator.push({
          name: "SelectEnvelope",
          callback: this.onEnvelopeSelected.bind(this)
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
                <View style={[styles.wrapper, styles.container]}>
                    <Text>Payee placeholder</Text>
                    <View style={styles.chevronContainer}>
                      <Icon
                        size={28}
                        name={"chevron-right"}
                        />
                    </View>
                </View>
                <TouchableHighlight
                  onPress={this._onSelectEnvelope.bind(this)}
                  style={styles.container}>
                    <View style={[styles.wrapper]}>
                        <Text>Envelope placeholder</Text>
                        <View style={styles.chevronContainer}>
                          <Icon
                            size={28}
                            name={"chevron-right"}
                            />
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={[styles.wrapper, styles.container]}>
                    <Text>Account placeholder</Text>
                    <View style={styles.chevronContainer}>
                      <Icon
                        size={28}
                        name={"chevron-right"}
                        />
                    </View>
                </View>
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

  wrapper: {
      flexDirection: 'row',
      padding: 10
  },

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

  chevronContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  }

})

module.exports = ExpenseEntryScreen
