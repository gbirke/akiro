'use strict';

import React, { Component, PropTypes } from 'react';
import { View, ListView, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'

import PhoneStatusBar from '../components/PhoneStatusBar';
import SelectListElement from '../components/SelectListElement'
import AddItemListElement from '../components/AddItemListElement'
import colors from '../config/colors'

// TODO Don't use store directly, move all handlers to Redux
import { store } from '../store/SQLiteStore'

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

// Conditional add item element
const AddItem = ( props ) => {
    if ( !props.text ) {
        return null;
    }
    return (
        <AddItemListElement
            text={ `Add new payee '${props.text}'` }
            indent={ 5 }
            onAdd={ props.onAdd }
        />
    )
}

class PayeeSelectScreen extends Component {
  constructor(props) {
    super(props)
    const allPayees = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2,
            sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
            getSectionHeaderData: (dataBlob, sectionId) => dataBlob.sections[sectionId],
            getRowData: (dataBlob, sectionId, rowId) => dataBlob.rows[rowId],
        }),
        filteredPayees = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
    const { dataBlob, sectionIds, rowIds } = prepareData( props.payees );
    this.state = {
      payeesDataSource: allPayees.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
      searchDataSource: filteredPayees.cloneWithRows( props.payees ),
      searchText: ''
    }
  }

  componentWillReceiveProps( newProps ) {
      if ( newProps.payees !== this.props.payees ) {
          const { dataBlob, sectionIds, rowIds } = prepareData( newProps.payees );
          this.setState({
              payeesDataSource: this.state.payeesDataSource.cloneWithRowsAndSections( dataBlob, sectionIds, rowIds ),
              searchDataSource: this.state.searchDataSource.cloneWithRows( newProps.payees ),
          });
      }
  }

  _onAddPayee() {
      store.storePayee( { name: this.state.searchText } )
        .then( ( payee ) => { this._onSelectPayee(payee) } );
  }

  _onSelectPayee( payee ) {
      this.props.onSelect( payee );
      this.props.navigator.pop();
  }

  _onSearch( searchText ) {
      this.setState( { searchText } );
      this._updateSearchDataSource( searchText );
  }

  _updateSearchDataSource( searchText ) {
      let rx;
      try {
          rx = new RegExp( searchText, 'i' );
      } catch ( e ) {
          rx = new RegExp( searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i')
      }
      const filteredData = this.props.payees.filter( (p) => { return p.name.match( rx ) } );
      this.setState( { searchDataSource: this.state.searchDataSource.cloneWithRows( filteredData ) } );
  }

  render() {
    const dataSource = this.state.searchText ? this.state.searchDataSource : this.state.payeesDataSource;
    return (
      <View style={ styles.listContainer }>
        <StatusBar />
        <PhoneStatusBar />
        <SearchBar
            lightTheme
            onChangeText={ this._onSearch.bind(this) }
            placeholder={'Find a Payee'}
            autoCapitalize={'none'}
            clearButtonMode={'while-editing'}
        />
        <AddItem text={this.state.searchText} onAdd={ this._onAddPayee.bind(this) } />
        <ListView
            dataSource={ dataSource }
            renderRow={ this._renderPayeeRow.bind( this ) }
            renderSeparator={ this._renderSeparator }
            renderSectionHeader={ this._renderSectionHeader.bind( this ) }
            enableEmptySections={true}
        />
      </View>
    )
  }

  _renderPayeeRow( payee ) {
    return (
        <SelectListElement
          onSelect={ () => { this._onSelectPayee( payee ) } }
          text={ payee.name }
          checked={ this.props.selectedId == payee.id }
          indent={5}
      />
    )
  }

  _renderSectionHeader( section ) {
      if ( this.state.searchText ) {
          return null;
      }
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
  onSelect: ( payee ) => { console.log("No selection callback specified!\nPayee:", payee) }
}

PayeeSelectScreen.propTypes = {
  onSelect: PropTypes.func,
  selectedId: PropTypes.number,
  payees: PropTypes.array
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
    payees: state.payees
  }
}

module.exports = connect(mapStateToProps)(PayeeSelectScreen)
