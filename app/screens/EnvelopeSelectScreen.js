'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StatusBar, Navigator, StyleSheet, TouchableHighlight } from 'react-native';
import { List, Text } from 'react-native-elements'

import PhoneStatusBar from '../components/PhoneStatusBar';

const dummyEnvelopes = [
  { name: 'Auswärts essen', id: 1 },
  { name: 'Supermarkt', id: 2 },
  { name: 'Naturkost', id: 3 },
];

class EnvelopeSelectScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      envelopesDataSource: ds.cloneWithRows( dummyEnvelopes )
    }
  }

  _onSelectEnvelope( envelope ) {
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
            dataSource={ this.state.envelopesDataSource }
            renderRow={ this._renderEnvelopeRow.bind( this ) }
            renderSeparator={ this._renderSeparator }
          />
        </List>
      </View>
    )
  }

  _renderEnvelopeRow( envelope ) {
    return (
        <TouchableHighlight
          onPress={ () => { this._onSelectEnvelope( envelope ) } }
          style={styles.rowItem}>
          <View><Text>{envelope.name}</Text></View>
      </TouchableHighlight>
    )
  }

  _renderSeparator( sectionId, rowId, adjacentRowHighlighted ) {
      return ( <View style={ styles.rowSeparator } key={`sep:${sectionId}:${rowId}`} /> )
  }

}

EnvelopeSelectScreen.defaultProps = {
  onSelect: () => { console.log("No selection callback specified!") }
}

EnvelopeSelectScreen.propTypes = {
  onSelect: PropTypes.func
}


const styles = StyleSheet.create({

  listContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
},

rowItem: {
  padding: 10,
  backgroundColor: 'white'
},

rowSeparator: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
}

})

module.exports = EnvelopeSelectScreen
