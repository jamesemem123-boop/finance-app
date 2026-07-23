import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// TODO (Firebase): replace this hardcoded list with networks fetched from Firestore
// e.g. a "networks" collection — each doc: { id, name }
const NETWORKS = [
  { id: '1', name: 'Airtel' },
  { id: '2', name: 'MTN' },
  { id: '3', name: 'Glo' },
  { id: '4', name: 'T-mobile' },
  { id: '5', name: 'Vitel' },
];

const PHONE_NUMBER_LENGTH = 11;
const AMOUNTS = [100, 200, 500];

export default function InternetBillingScreen({ navigation }) {
  const [network, setNetwork] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isOthersSelected, setIsOthersSelected] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const isPhoneValid = phoneNumber.length === PHONE_NUMBER_LENGTH;

  const finalAmount = isOthersSelected ? Number(customAmount) : selectedAmount;
  const isAmountValid = isOthersSelected
    ? customAmount.length > 0 && Number(customAmount) > 0
    : selectedAmount !== null;

  const isFormValid = network !== null && isPhoneValid && isAmountValid;

  const handlePhoneChange = (text) => {
    const digitsOnly = text.replace(/[^0-9]/g, '').slice(0, PHONE_NUMBER_LENGTH);
    setPhoneNumber(digitsOnly);
  };

  const handleCustomAmountChange = (text) => {
    const digitsOnly = text.replace(/[^0-9]/g, '');
    setCustomAmount(digitsOnly);
  };

  const handleSelectPreset = (amount) => {
    setSelectedAmount(amount);
    setIsOthersSelected(false);
    setCustomAmount('');
  };

  const handleSelectOthers = () => {
    setIsOthersSelected(true);
    setSelectedAmount(null);
  };

  const handleCheck = () => {
    if (!isFormValid) return;

    // TODO (Firebase): verify phone number / process data bundle purchase against Firestore/backend here,
    // then navigate on success (or show an error if invalid)
    navigation.navigate('InternetBillingConfirm', {
      network: network.name,
      phoneNumber,
      amount: finalAmount,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="chevron-left" size={28} color="#1A1A2E" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pay the bill</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* Network dropdown */}
            <TouchableOpacity
              style={styles.dropdown}
              activeOpacity={0.7}
              onPress={() => setDropdownOpen(true)}
            >
              <Text style={network ? styles.dropdownTextFilled : styles.dropdownTextPlaceholder}>
                {network ? network.name : 'Select network'}
              </Text>
              <Feather name="chevron-down" size={20} color="#9A9AA5" />
            </TouchableOpacity>

            {/* Phone number */}
            <Text style={styles.label}>
              Enter <Text style={styles.labelBold}>phone number</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="phone number"
              placeholderTextColor="#B3B3BD"
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              maxLength={PHONE_NUMBER_LENGTH}
            />

            {/* Quick amount select */}
            <Text style={styles.label}>
              Choose <Text style={styles.labelBold}>amount</Text>
            </Text>
            <View style={styles.amountRow}>
              {AMOUNTS.map((amount) => {
                const isSelected = !isOthersSelected && selectedAmount === amount;
                return (
                  <TouchableOpacity
                    key={amount}
                    style={[styles.amountChip, isSelected && styles.amountChipSelected]}
                    activeOpacity={0.8}
                    onPress={() => handleSelectPreset(amount)}
                  >
                    <Text
                      style={[
                        styles.amountChipText,
                        isSelected && styles.amountChipTextSelected,
                      ]}
                    >
                      ₦{amount.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                style={[styles.amountChip, isOthersSelected && styles.amountChipSelected]}
                activeOpacity={0.8}
                onPress={handleSelectOthers}
              >
                <Text
                  style={[
                    styles.amountChipText,
                    isOthersSelected && styles.amountChipTextSelected,
                  ]}
                >
                  Others
                </Text>
              </TouchableOpacity>
            </View>

            {/* Custom amount input — only shows when "Others" is selected */}
            {isOthersSelected && (
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor="#B3B3BD"
                keyboardType="number-pad"
                value={customAmount}
                onChangeText={handleCustomAmountChange}
                autoFocus
              />
            )}

            <Text style={styles.helperText}>
              Please enter the correct bill code to check information.
            </Text>

            {/* Check button */}
            <TouchableOpacity
              activeOpacity={isFormValid ? 0.8 : 1}
              disabled={!isFormValid}
              onPress={handleCheck}
            >
              {isFormValid ? (
                <LinearGradient
                  colors={['#6D5EF5', '#2563EB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.checkButton}
                >
                  <Text style={styles.checkButtonText}>Check</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.checkButton, styles.checkButtonDisabled]}>
                  <Text style={styles.checkButtonTextDisabled}>Check</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Dropdown modal */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={NETWORKS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setNetwork(item);
                    setDropdownOpen(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
  card: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4EC',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 28,
  },
  dropdownTextPlaceholder: {
    fontSize: 14,
    color: '#B3B3BD',
  },
  dropdownTextFilled: {
    fontSize: 14,
    color: '#1A1A2E',
    fontWeight: '600',
  },
  label: {
    fontSize: 13,
    color: '#1A1A2E',
    marginBottom: 10,
  },
  labelBold: {
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E4E4EC',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 14,
    color: '#1A1A2E',
    marginBottom: 20,
  },
  amountRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginHorizontal: -4,
  },
  amountChip: {
    flexGrow: 1,
    flexBasis: '45%',
    borderWidth: 1,
    borderColor: '#E4E4EC',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    marginHorizontal: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  amountChipSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  amountChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  amountChipTextSelected: {
    color: '#FFFFFF',
  },
  helperText: {
    fontSize: 12,
    color: '#9A9AA5',
    marginBottom: 28,
    lineHeight: 18,
  },
  checkButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonDisabled: {
    backgroundColor: '#E4E4F0',
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  checkButtonTextDisabled: {
    color: '#B3B3C2',
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    maxHeight: 260,
  },
  modalItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modalItemText: {
    fontSize: 15,
    color: '#1A1A2E',
  },
  modalSeparator: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginHorizontal: 20,
  },
});