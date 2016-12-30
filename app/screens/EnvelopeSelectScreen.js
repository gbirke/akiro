'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'

import PhoneStatusBar from '../components/PhoneStatusBar';
import SelectListElement from '../components/SelectListElement'
import colors from '../config/colors'

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
    const { dataBlob, sectionIds, rowIds } = prepareData( props.envelopes );
    this.state = {
      envelopesDataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
    }
  }

  componentWillReceiveProps( newProps ) {
      if ( newProps.envelopes !== this.props.envelopes ) {
          this.setState({
            envelopesDataSource: this.state.envelopesDataSource.cloneWithRows(newProps.envelopes)
          });
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
        <ListView
            dataSource={ this.state.envelopesDataSource }
            renderRow={ this._renderEnvelopeRow.bind( this ) }
            renderSeparator={ this._renderSeparator }
            renderSectionHeader={ this._renderSectionHeader }
            enableEmptySections={true}
        />
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
  selectedId: PropTypes.number,
  envelopes: PropTypes.array
}


const styles = StyleSheet.create({

  listContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
},

rowHeader: {
  backgroundColor: colors.darkest,
  paddingTop: 3,
  paddingBottom: 3,
  paddingLeft: 5
},

rowHeaderText: {
    fontWeight: 'bold',
    color: colors.darkestContrast
},

rowSeparator: {
    borderBottomColor: colors.rowSeparator,
    borderBottomWidth: StyleSheet.hairlineWidth,
}

})

const mapStateToProps = (state) => {
  return {
    envelopes: state.envelopes
  }
}

module.exports = connect(mapStateToProps)(EnvelopeSelectScreen)
