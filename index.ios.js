/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import ExpenseEntryScreen from './app/screens/ExpenseEntryScreen';
import EnvelopeSelectScreen from './app/screens/EnvelopeSelectScreen';
import PayeeSelectScreen from './app/screens/PayeeSelectScreen';
import AccountSelectScreen from './app/screens/AccountSelectScreen';

import { FormattedWrapper } from 'react-native-globalize';

export default class Akiro extends Component {
  _renderScene( route, navigator ) {
      const globalNavigatorProps = { navigator }

      switch( route.name ) {
          case "ExpenseEntry":
            // TODO remove FormattedWrapper, use getChildContext instead
            return (
                <FormattedWrapper locale="de" currency="EUR">
                    <ExpenseEntryScreen {...globalNavigatorProps} />
                </FormattedWrapper>
            )
        case "SelectEnvelope":
            return (<EnvelopeSelectScreen
                onSelect={ route.callback }
                selectedId={ route.selectedId }
                {...globalNavigatorProps}
            />)
        case "SelectPayee":
            return ( <PayeeSelectScreen
                onSelect={ route.callback }
                selectedId={ route.selectedId }
                {...globalNavigatorProps}
            />)
        case "SelectAccount":
        return (<AccountSelectScreen
                onSelect={ route.callback }
                selectedId={ route.selectedId }
                {...globalNavigatorProps}
            />)
      }
  }
  render() {
    return (
        <Navigator
            initialRoute={{ name: "ExpenseEntry" }}
            renderScene={this._renderScene}
        />
    );
  }
}



AppRegistry.registerComponent('Akiro', () => Akiro);
