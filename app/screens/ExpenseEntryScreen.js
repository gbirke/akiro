'use strict';

import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Navigator, StyleSheet, TextInput, DatePickerIOS, Button } from 'react-native';
import { Icon, Text } from 'react-native-elements'

class ExpenseEntryScreen extends Component {
    static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  };

  onDateChange = (date) => {
    this.setState({date: date});
  };

  onPressSave() {
      // TODO
  }


    render() {
        return (
            <View style={ styles.expenseEntry }>
              <StatusBar />
              <View style={ styles.statusBarBackground } />
              <ScrollView>
                <TextInput
                    style={[styles.amountInput, styles.container]}
                    keyboardType={'decimal-pad'}
                    selectTextOnFocus={true}
                    value="0,00"
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
                <View style={[styles.wrapper, styles.container]}>
                    <Text>Envelope placeholder</Text>
                    <View style={styles.chevronContainer}>
                      <Icon
                        size={28}
                        name={"chevron-right"}
                        />
                    </View>
                </View>
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

  statusBarBackground: {
    height: 20,
  },

  chevronContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  }

})

module.exports = ExpenseEntryScreen
