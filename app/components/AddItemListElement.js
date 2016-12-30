'use strict';

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Icon } from 'react-native-elements'

import colors from '../config/colors'

class AddItemListElement extends Component {
    render() {
        return (
            <TouchableHighlight
              onPress={ this.props.onAdd }
              underlayColor={ 'white' }
              style={[ styles.container, { paddingLeft: this.props.indent } ] }>
              <View style={ styles.wrapper }>
                  <Icon
                    size={14}
                    name={'add-circle-outline'}
                    color={colors.action}  />
                  <Text style={styles.label}>{this.props.text}</Text>
              </View>
          </TouchableHighlight>
        )
    }
}

AddItemListElement.defaultProps = {
    indent: 10
}

AddItemListElement.propTypes = {
     onAdd: PropTypes.func,
     text: PropTypes.string,
     indent: PropTypes.number
}

const styles = StyleSheet.create({

container: {
  padding: 10,
  backgroundColor: 'white',
  borderBottomColor: colors.rowSeparator,
  borderBottomWidth: StyleSheet.hairlineWidth
},

wrapper: {
    flexDirection: 'row'
},

label: {
    color: colors.action,
    paddingLeft: 2
}

})


module.exports = AddItemListElement
