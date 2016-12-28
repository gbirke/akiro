'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { List, Text } from 'react-native-elements'

import PhoneStatusBar from '../components/PhoneStatusBar';
import SelectListElement from '../components/SelectListElement'

const dummyAccounts = [
  { name: 'Bargeld', id: 1 },
  { name: 'Girokonto', id: 2 },
  { name: 'Kreditkarte', id: 3 },
  { name: 'Coinbase', id: 4 },
];

class AccountSelectScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
    })
    this.state = {
      accountsDataSource: ds.cloneWithRows( dummyAccounts ),
    }
  }

  _onSelectAccount( envelope ) {
      this.props.onSelect( envelope );
      this.props.navigator.pop();
  }

  render() {
    return (
      <View style={ styles.listContainer }>
        <StatusBar />
        <PhoneStatusBar />
        <List>
          <ListView
            dataSource={ this.state.accountsDataSource }
            renderRow={ this._renderAccountRow.bind( this ) }
            renderSeparator={ this._renderSeparator }
          />
        </List>
      </View>
    )
  }

  _renderAccountRow( account ) {
    return (
        <SelectListElement
          onSelect={ () => { this._onSelectAccount( account ) } }
          text={account.name}
      />
    )
  }

  _renderSeparator( sectionId, rowId, adjacentRowHighlighted ) {
      return ( <View style={ styles.rowSeparator } key={`sep:${sectionId}:${rowId}`} /> )
  }

}

AccountSelectScreen.defaultProps = {
  onSelect: () => { console.log("No selection callback specified!") }
}

AccountSelectScreen.propTypes = {
  onSelect: PropTypes.func
}


const styles = StyleSheet.create({

  listContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
},

rowSeparator: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
}

})

module.exports = AccountSelectScreen
