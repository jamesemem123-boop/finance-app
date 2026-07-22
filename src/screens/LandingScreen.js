import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import colors from '../constant/colors'

const LandingScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.illustrationWrap}>
        {/* TODO: swap for final illustration asset once design team provides it */}
        <Ionicons name="card" size={120} color={colors.white} style={{ opacity: 0.9 }} />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.name}>Jane Cooper</Text>
        <Text style={styles.description}>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
        </Text>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-forward" size={22} color={colors.gradientEnd} />
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40 },
  illustrationWrap: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  textBlock: { marginBottom: 20 },
  name: { color: colors.white, fontSize: 22, fontWeight: '700', marginBottom: 8 },
  description: { color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 20 },
  nextButton: {
    position: 'absolute',
    right: 24,
    bottom: 40,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LandingScreen