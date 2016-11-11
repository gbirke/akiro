import React, { PropTypes } from 'react'
import { View, StyleSheet, TouchableHighlight, Image, Platform } from 'react-native'
import { Icon, Text } from 'react-native-elements'
import colors from 'react-native-elements/src/config/colors'
import fonts from 'react-native-elements/src/config/fonts'
import normalize from 'react-native-elements/src/helpers/normalizeText'

import { FormattedCurrency } from 'react-native-globalize';

let styles

const ExpenseListItem = ({
  onPress,
  underlayColor,
  containerStyle,
  wrapperStyle,
  fontFamily,
  rightIcon,
  expense,
  chevronColor,
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={underlayColor}
      style={[styles.container, containerStyle && containerStyle]}>
      <View style={[styles.wrapper, wrapperStyle && wrapperStyle]}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              fontFamily && {fontFamily}
            ]}>{expense.payee.name}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.title,
              fontFamily && {fontFamily},
              {textAlign:'right'}
            ]}>
              <FormattedCurrency currency="EUR" value={ expense.amount/100 } />
            </Text>
        </View>

        <View style={styles.chevronContainer}>
          <Icon
            type={rightIcon.type}
            style={styles.chevron}
            size={28}
            name={rightIcon.name}
            color={rightIcon.color || chevronColor} />
        </View>


      </View>
    </TouchableHighlight>
  )
}

ExpenseListItem.defaultProps = {
  underlayColor: 'white',
  chevronColor: colors.grey4,
  rightIcon: {name: 'chevron-right'}
}

ExpenseListItem.propTypes = {
  expense: PropTypes.object,
  onPress: PropTypes.func,
  rightIcon: PropTypes.object,
  underlayColor: PropTypes.string,
  containerStyle: PropTypes.any,
  wrapperStyle: PropTypes.any,
  chevronColor: PropTypes.string,
}

styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  wrapper: {
    flexDirection: 'row'
  },
  title: {
    fontSize: normalize(14),
    color: colors.grey1
  },
  titleContainer: {
    justifyContent: 'center'
  },
  amountContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  chevronContainer: {

    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  chevron: {
  }
})

export default ExpenseListItem
