'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * An empty view to make room for the iOS status bar and nav bar
 */
class PhoneStatusBar extends Component {
    render() {
        return ( <View style={ styles.statusBarBackground } /> )
    }
}

const styles = StyleSheet.create({

  statusBarBackground: {
    /* TODO make this platorm-specific and dependent on navigation bar height */
    height: 40,
  }

})

module.exports = PhoneStatusBar;
