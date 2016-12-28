'use strict';

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Text, Icon } from 'react-native-elements'

class SelectListElement extends Component {
    render() {
        return (
            <TouchableHighlight
              onPress={ this.props.onSelect }
              underlayColor={ 'white' }
              style={[ styles.container, { paddingLeft: this.props.indent } ] }>
              <View style={ styles.wrapper }>
                  <View style={ styles.labelContainer }>
                      <Text>{this.props.text}</Text>
                  </View>
                  { this.props.checked && (
                      <View style={styles.checkContainer}>
                          <Icon
                            size={28}
                            name={'done'}
                            color={'#009900'} />
                     </View>
                  )}
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
     indent: PropTypes.number,
     checked: PropTypes.bool
}

const styles = StyleSheet.create({

container: {
  padding: 10,
  backgroundColor: 'white',
},

wrapper: {
    flexDirection: 'row'
},

labelContainer: {
    flex: 1
},

checkContainer: {

}

})


module.exports = SelectListElement
