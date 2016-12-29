/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  TouchableHighlight
} from 'react-native';
import { FormattedWrapper } from 'react-native-globalize';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import ExpensesListScreen from './app/screens/ExpensesListScreen'
import ExpenseEntryScreen from './app/screens/ExpenseEntryScreen';
import EnvelopeSelectScreen from './app/screens/EnvelopeSelectScreen';
import PayeeSelectScreen from './app/screens/PayeeSelectScreen';
import AccountSelectScreen from './app/screens/AccountSelectScreen';

import colors from './app/config/colors';

import rootSaga from './app/sagas'

import { loadAll } from './app/actions/storage'

import expenseTracker from './app/reducers/expenseTracker';

import { loadExampleData } from './app/store/exampleData';
import { store as repository } from './app/store/InMemoryStore';

const NavigationBarRouteMapper = {
  LeftButton: function( route, navigator, index, navState ){
    if (route.index === 0) {
        // TODO Show Hamburger menu
      return null;
    } else {
      return (
        <TouchableHighlight onPress={() => navigator.pop()} style={{paddingLeft:8}}>
          <Text>{ route.leftButton }</Text>
        </TouchableHighlight>
      );
    }
  },
  Title: function( route, navigator, index, navState ){
    return(
      <Text>{ route.title }</Text>
    )
  },
  RightButton: function( route, navigator, index, navState ){
    return(
      <Text>{ route.rightButton }</Text>
    )
  }
}

const sagaMiddleware = createSagaMiddleware();
let store = createStore( expenseTracker, applyMiddleware(sagaMiddleware) );
sagaMiddleware.run( rootSaga );

// TODO remove this when app is finished
loadExampleData( repository ).then( () => {
    store.dispatch( loadAll() )
}) ;

export default class Akiro extends Component {
  _renderScene( route, navigator ) {
      const globalNavigatorProps = { navigator }

      switch( route.name ) {
          case "ListExpenses":
          // TODO remove FormattedWrapper, use getChildContext instead
          return (
              <FormattedWrapper locale="de" currency="EUR">
                  <ExpensesListScreen {...globalNavigatorProps} />
              </FormattedWrapper>
          )
          case "EnterExpense":
            // TODO remove FormattedWrapper, use getChildContext instead
            return (
                <FormattedWrapper locale="de" currency="EUR">
                    <ExpenseEntryScreen
                        expense={route.expense}
                        {...globalNavigatorProps} />
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
                title={"Select Payee"}
                leftButton={"Back"}
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
        <Provider store={store}>
            <Navigator
                initialRoute={{ name: "ListExpenses" }}
                renderScene={this._renderScene}
                navigationBar={
                  <Navigator.NavigationBar
                    routeMapper={ NavigationBarRouteMapper }
                    style={{backgroundColor:colors.lightShade, height:40}}
                  />
                }
            />
        </Provider>

    );
  }
}

AppRegistry.registerComponent('Akiro', () => Akiro);
