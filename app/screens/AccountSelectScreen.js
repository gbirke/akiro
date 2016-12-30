'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'

import PhoneStatusBar from '../components/PhoneStatusBar';
import SelectListElement from '../components/SelectListElement'

class AccountSelectScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2
    })
    this.state = {
      accountsDataSource: ds.cloneWithRows( props.accounts ),
    }
  }

  componentWillReceiveProps( newProps ) {
      if ( newProps.accounts !== this.props.accounts ) {
          this.setState({
            accountsDataSource: this.state.accountsDataSource.cloneWithRows(newProps.accounts)
          });
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
        <ListView
            dataSource={ this.state.accountsDataSource }
            renderRow={ this._renderAccountRow.bind( this ) }
            renderSeparator={ this._renderSeparator }
            enableEmptySections={true}
        />

      </View>
    )
  }

  _renderAccountRow( account ) {
    return (
        <SelectListElement
          onSelect={ () => { this._onSelectAccount( account ) } }
          text={account.name}
          checked={this.props.selectedId == account.id}
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
  onSelect: PropTypes.func,
  selectedId: PropTypes.number,
  accounts: PropTypes.array
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

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts
  }
}

module.exports = connect(mapStateToProps)(AccountSelectScreen)
