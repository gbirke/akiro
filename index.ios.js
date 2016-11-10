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

import ExpensesListScreen from './app/screens/ExpensesListScreen';
import { FormattedWrapper } from 'react-native-globalize';

export default class Akiro extends Component {
  render() {
    return (
        <FormattedWrapper locale="de" currency="EUR">
          <ExpensesListScreen />
        </FormattedWrapper>
    );
  }
}



AppRegistry.registerComponent('Akiro', () => Akiro);
