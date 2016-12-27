'use strict';

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon, Text } from 'react-native-elements'
import colors from 'react-native-elements/src/config/colors'

class ListSelector extends Component {
    render() {
        const textStyle = this.props.itemSelected ? styles.selectedItemText : styles.placeholderItemText;
        const text = this.props.itemSelected ? this.props.text : this.props.placeholderText;
        return (
            <TouchableHighlight
              onPress={ this.props.onPress }
              underlayColor={ 'white' }
              style={ styles.container }>
                <View style={styles.wrapper}>
                    <Text style={ textStyle }>{ text }</Text>
                    <View style={ styles.chevronContainer }>
                      <Icon
                        size={28}
                        name={"chevron-right"}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

ListSelector.propTypes = {
    itemSelected: PropTypes.bool,
    text: PropTypes.string,
    placeholderText: PropTypes.string,
    onPress: PropTypes.func
}

const styles = StyleSheet.create({

  container: {
      padding: 10,
      borderBottomColor: '#ededed',
      borderBottomWidth: 1,
      backgroundColor: 'white'
  },

  wrapper: {
      flexDirection: 'row',
  },

  selectedItemText: {
      flex: 1
  },

  placeholderItemText: {
      color: colors.grey2,
      fontStyle: 'italic',
      flex: 1
  },

  chevronContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  }

})

module.exports = ListSelector
