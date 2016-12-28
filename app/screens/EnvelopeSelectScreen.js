'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { List, Text } from 'react-native-elements'

import PhoneStatusBar from '../components/PhoneStatusBar';
import SelectListElement from '../components/SelectListElement'

const dummyEnvelopes = [
  { name: 'Auswärts essen', id: 1, category: 'Allgemeine Ausgaben' },
  { name: 'Supermarkt', id: 2, category: 'Allgemeine Ausgaben' },
  { name: 'Naturkost', id: 3, category: 'Allgemeine Ausgaben' },
  { name: 'Miete', id: 4, category: 'Wohnen' },
  { name: 'Strom', id: 5, category: 'Wohnen' },
  { name: 'Zahnzusatzversicherung', id: 6, category: 'Finanzen' },
];

function prepareData( envelopeRows ) {
    const dataBlob = {
        sections: {},
        rows: []
    };
    const rowSectionMap = new Map();

    for ( let rowId = 0; rowId < envelopeRows.length; rowId++ ) {
        const sectionId = envelopeRows[rowId].category.toLowerCase().replace(/[^a-z]/, '_');

        if ( rowSectionMap.has( sectionId ) ) {
            rowSectionMap.get( sectionId ).push( rowId )
        } else {
            rowSectionMap.set( sectionId, [ rowId ] )
        }
        dataBlob.sections[sectionId] = { name: envelopeRows[rowId].category }
        dataBlob.rows[rowId] = envelopeRows[rowId]
    }
    return { dataBlob, sectionIds: Array.from(rowSectionMap.keys()), rowIds: Array.from(rowSectionMap.values()) }

}

class EnvelopeSelectScreen extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2,
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
        getSectionHeaderData: (dataBlob, sectionId) => dataBlob.sections[sectionId],
        getRowData: (dataBlob, sectionId, rowId) => dataBlob.rows[rowId],
    })
    const { dataBlob, sectionIds, rowIds } = prepareData( dummyEnvelopes );
    this.state = {
      envelopesDataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
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
            renderSectionHeader={ this._renderSectionHeader }
          />
        </List>
      </View>
    )
  }

  _renderEnvelopeRow( envelope ) {
    return (
        <SelectListElement
          onSelect={ () => { this._onSelectEnvelope( envelope ) } }
          text={ envelope.name }
          checked={ this.props.selectedId == envelope.id }
          indent={15}
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

EnvelopeSelectScreen.defaultProps = {
  onSelect: () => { console.log("No selection callback specified!") }
}

EnvelopeSelectScreen.propTypes = {
  onSelect: PropTypes.func,
  selectedId: PropTypes.number
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

module.exports = EnvelopeSelectScreen
