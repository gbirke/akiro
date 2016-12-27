'use strict';

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text } from 'react-native-elements'

class SelectListElement extends Component {
    render() {
        return (
            <TouchableHighlight
              onPress={ this.props.onSelect }
              underlayColor={ 'white' }
              style={[ styles.container, { paddingLeft: this.props.indent } ] }>
              <View>
                  <Text>{this.props.text}</Text>
              </View>
          </TouchableHighlight>
        )
    }
}

SelectListElement.defaultProps = {
    indent: 10
}

SelectListElement.propTypes = {
     onSelect: PropTypes.func,
     text: PropTypes.string,
     indent: PropTypes.number
}

const styles = StyleSheet.create({

container: {
  padding: 10,
  backgroundColor: 'white',
}

})


module.exports = SelectListElement
