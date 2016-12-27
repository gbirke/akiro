'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * An empty view to make room for the iOS status bar
 */
class PhoneStatusBar extends Component {
    render() {
        return ( <View style={ styles.statusBarBackground } /> )
    }
}

const styles = StyleSheet.create({

  statusBarBackground: {
    height: 20,
  }

})

module.exports = PhoneStatusBar;
