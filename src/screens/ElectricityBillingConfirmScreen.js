import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import dayjs from 'dayjs';

const TAX_RATE = 0.1; // 10%

// TODO (Firebase/Backend): replace this hardcoded list with the user's saved cards
// fetched from Firestore/backend — each doc: { id, last4, label }
const CARDS = [
  { id: '1', label: '4411 0000 1234' },
  { id: '2', label: '5241 8800 5678' },
  { id: '3', label: '6011 4321 9087' },
];

export default function ElectricityBillingConfirmScreen({ route, navigation }) {
  const { company, meterNumber, amount } = route.params;

  const [selectedCard, setSelectedCard] = useState(CARDS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tax = amount * TAX_RATE;
  const total = amount + tax;
  const paymentDate = dayjs().format('DD/MM/YYYY');

  const handlePay = () => {
    // TODO (Firebase/Backend): process payment using selectedCard here
    navigation.navigate('ElectricityBillingSuccessful', {
      company,
      meterNumber,
      amount,
      tax,
      total,
    });
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

      <ScrollView contentContainerStyle={styles.content}>
        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>All the Bills</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Company name</Text>
            <Text style={styles.rowValue}>{company}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Meter number</Text>
            <Text style={styles.rowValue}>{meterNumber}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Amount</Text>
            <Text style={styles.rowValueBlue}>₦{amount.toLocaleString()}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Date</Text>
            <Text style={styles.rowValue}>{paymentDate}</Text>
          </View>

          <View style={styles.dashedLine} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Tax</Text>
            <Text style={styles.rowValueBlue}>₦{tax.toLocaleString()}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>₦{total.toLocaleString()}</Text>
          </View>
        </View>

        {/* Card number dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.7}
          onPress={() => setDropdownOpen(true)}
        >
          <Text style={styles.dropdownText}>{selectedCard.label}</Text>
          <Feather name="chevron-down" size={20} color="#9A9AA5" />
        </TouchableOpacity>

        {/* Pay the bill button */}
        <TouchableOpacity activeOpacity={0.85} onPress={handlePay}>
          <LinearGradient
            colors={['#6D5EF5', '#2563EB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.payButton}
          >
            <Text style={styles.payButtonText}>Pay the bill</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Card selection modal */}
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
              data={CARDS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedCard(item);
                    setDropdownOpen(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  rowLabel: {
    fontSize: 13,
    color: '#9A9AA5',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  rowValueBlue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },
  dashedLine: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E4E4EC',
    marginBottom: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#EF4444',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4EC',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 20,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  payButton: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#FFFFFF',
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