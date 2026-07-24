import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';

// Swap these three imports for whichever SVGs actually belong to each bill
import ElectricIcon from '../../assets/icons/Group 547.svg';
import WaterIcon from '../../assets/icons/Group 553.svg';
import InternetIcon from '../../assets/icons/Group 551.svg';

const bills = [
  {
    key: 'electric',
    title: 'Electric bill',
    subtitle: 'Pay electric bill this month',
    Icon: ElectricIcon,
    screen: 'ElectricityBilling',
  },
  {
    key: 'water',
    title: 'Water bill',
    subtitle: 'Pay water bill this month',
    Icon: WaterIcon,
    screen: 'WaterBilling',
  },
  {
    key: 'internet',
    title: 'Internet bill',
    subtitle: 'Pay internet bill this month',
    Icon: InternetIcon,
    screen: 'InternetBilling',
  },
];

export default function PayBillScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={28} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay the bill</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {bills.map(({ key, title, subtitle, Icon, screen }) => (
          <TouchableOpacity
            key={key}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(screen)}
          >
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardSubtitle}>{subtitle}</Text>
            </View>
            <Icon width={70} height={70} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => navigation.navigate('PaymentHistory')}>
          <Text style={styles.historyLink}>Check Payment history</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginLeft: 12,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardText: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#9A9AA5',
  },
  historyLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    marginTop: 4,
  },
});