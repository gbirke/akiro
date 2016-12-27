/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ExpenseEntryScreen from './app/screens/ExpenseEntryScreen';
import { FormattedWrapper } from 'react-native-globalize';

export default class Akiro extends Component {
  render() {
    return (
        <FormattedWrapper locale="de" currency="EUR">
          <ExpenseEntryScreen />
        </FormattedWrapper>
    );
  }
}



AppRegistry.registerComponent('Akiro', () => Akiro);
