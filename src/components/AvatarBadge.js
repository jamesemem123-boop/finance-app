import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constant/colors'

const AvatarBadge = ({ iconName }) => {
  return (
    <View style={styles.wrap}>
      <View style={[styles.dot, styles.dotTeal]} />
      <View style={[styles.dot, styles.dotCoral]} />
      <View style={[styles.dot, styles.dotOrange]} />
      <View style={[styles.dot, styles.dotBlue]} />
      <View style={styles.circle}>
        <Ionicons name={iconName} size={40} color={colors.white} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 24,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { position: 'absolute', width: 14, height: 14, borderRadius: 7 },
  dotTeal: { backgroundColor: colors.accentTeal, top: 20, left: 10 },
  dotCoral: { backgroundColor: colors.accentCoral, top: 0, right: 20 },
  dotOrange: { backgroundColor: colors.accentOrange, bottom: 20, left: 0 },
  dotBlue: { backgroundColor: colors.accentBlue, bottom: 10, right: 10 },
})

export default AvatarBadge