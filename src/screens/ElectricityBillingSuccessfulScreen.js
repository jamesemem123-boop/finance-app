import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Adjust this path to wherever "Illustration 2.svg" actually lives in your assets folder
import SuccessIllustration from '../../assets/icons/Illustration 2.svg';

export default function ElectricityBillingSuccessfulScreen({ navigation }) {
  const handleConfirm = () => {
    // Goes back to the main tabs (Home) after a successful payment
    navigation.navigate('Tabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Electric bill</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationWrapper}>
          <SuccessIllustration width={280} height={220} />
        </View>

        <Text style={styles.successTitle}>Transaction successfully!</Text>
        <Text style={styles.successSubtitle}>You've pay your electric bill!</Text>

        <TouchableOpacity activeOpacity={0.85} onPress={handleConfirm} style={styles.confirmWrapper}>
          <LinearGradient
            colors={['#6D5EF5', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  illustrationWrapper: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#1A1A2E',
    marginBottom: 32,
    textAlign: 'center',
  },
  confirmWrapper: {
    width: '100%',
  },
  confirmButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});