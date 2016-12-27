'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { List, Text } from 'react-native-elements'

import PhoneStatusBar from '../components/PhoneStatusBar';
import SelectListElement from '../components/SelectListElement'

const dummyPayees = [
  { name: 'Restaurant', id: 1 },
  { name: 'Edeka', id: 2 },
  { name: 'Biosphäre', id: 3 },
  { name: 'Vermieter', id: 4 },
  { name: 'Stadtwerke', id: 5 },
  { name: 'Krankenkasse', id: 6 },
  { name: 'Rudi\'s Resterampe', id: 7 }
];

function compareSectionKeys( sectionA, sectionB ) {
    // TODO: special cases for geolocated "around you" section
    return sectionA[0].localeCompare( sectionB[0] );
}

function prepareData( payeeRows ) {
    const dataBlob = {
        sections: {},
        rows: []
    };
    const rowSectionMap = new Map();

    for ( let rowId = 0; rowId < payeeRows.length; rowId++ ) {
        const sectionId = payeeRows[rowId].name.substr( 0, 1 );

        if ( rowSectionMap.has( sectionId ) ) {
            rowSectionMap.get( sectionId ).push( rowId )
        } else {
            rowSectionMap.set( sectionId, [ rowId ] )
        }
        dataBlob.sections[sectionId] = { name: sectionId }
        dataBlob.rows[rowId] = payeeRows[rowId]
    }
    const sortedSectionMap = new Map( [...rowSectionMap.entries()].sort( compareSectionKeys ) )
    return { dataBlob, sectionIds: Array.from(sortedSectionMap.keys()), rowIds: Array.from(sortedSectionMap.values()) }

}

class PayeeSelectScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2,
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
        getSectionHeaderData: (dataBlob, sectionId) => dataBlob.sections[sectionId],
        getRowData: (dataBlob, sectionId, rowId) => dataBlob.rows[rowId],
    })
    const { dataBlob, sectionIds, rowIds } = prepareData( dummyPayees );
    this.state = {
      payeesDataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
    }
  }

  _onSelectPayee( envelope ) {
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
            dataSource={ this.state.payeesDataSource }
            renderRow={ this._renderPayeeRow.bind( this ) }
            renderSeparator={ this._renderSeparator }
            renderSectionHeader={ this._renderSectionHeader }
          />
        </List>
      </View>
    )
  }

  _renderPayeeRow( payee ) {
    return (
        <SelectListElement
          onSelect={ () => { this._onSelectPayee( payee ) } }
          text={payee.name}
          indent={5}
      />
    )
  }

  _renderSectionHeader( section ) {
      return (
          <View style={ styles.rowHeader }>
              <Text style={ styles.rowHeaderText}>{section.name}</Text>
          </View>
      )
  }

  _renderSeparator( sectionId, rowId, adjacentRowHighlighted ) {
      return ( <View style={ styles.rowSeparator } key={`sep:${sectionId}:${rowId}`} /> )
  }

}

PayeeSelectScreen.defaultProps = {
  onSelect: () => { console.log("No selection callback specified!") }
}

PayeeSelectScreen.propTypes = {
  onSelect: PropTypes.func
}


const styles = StyleSheet.create({

  listContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
},

rowHeader: {
  backgroundColor: '#3366ed',
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 5
},

rowHeaderText: {
    fontWeight: 'bold',
    color: 'white'
},

rowSeparator: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
}

})

module.exports = PayeeSelectScreen
