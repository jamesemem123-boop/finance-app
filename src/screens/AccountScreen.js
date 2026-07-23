import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../config/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const AccountScreen = ({ navigation }) => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // State initialized with mock data
  const [accountData, setAccountData] = useState({
    cardNumber: "12345678912356",
    cardHolderName: "Gega Lee",
    expiryDate: "02/30",
    name: "Gega Lee",
    phoneNumber: "+62 85944123550",
    email: "yourmail@mail.com",
    homeAddress: "Thamrin Ave 17, Bali, Korea"
  });

  // Firestore Database Integration
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        // FIREBASE PLACEHOLDER: Replace 'users' with your collection name and 'mockUserId' with your dynamic document ID
        const docRef = doc(db, "users", "mockUserId");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAccountData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching account data from Firestore: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  // Helper function to mask card number when hidden
  const displayCardNumber = showCardNumber 
    ? accountData.cardNumber 
    : accountData.cardNumber.replace(/\d(?=\d{4})/g, "*");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header with Back Icon matching the design pattern */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        {/* Virtual Card Component */}
        <View style={styles.cardContainer}>
          <View style={styles.cardNumberRow}>
            <Text style={styles.cardNumberText}>{displayCardNumber}</Text>
            <TouchableOpacity onPress={() => setShowCardNumber(!showCardNumber)}>
              <Ionicons 
                name={showCardNumber ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#FFFFFF" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardLabel}>Card Holder Name</Text>
              <Text style={styles.cardValue}>{accountData.cardHolderName}</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expiry date</Text>
              <Text style={styles.cardValue}>{accountData.expiryDate}</Text>
            </View>
          </View>
        </View>

        {/* Detail Information Section */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>DETAIL INFORMATION</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput 
            style={styles.textInput}
            value={accountData.name}
            editable={false} 
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput 
            style={styles.textInput}
            value={accountData.phoneNumber}
            editable={false} 
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput 
            style={styles.textInput}
            value={accountData.email}
            editable={false} 
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Home Address</Text>
          <TextInput 
            style={styles.textInput}
            value={accountData.homeAddress}
            editable={false} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 75,
    paddingBottom: 30
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 10,
  },
  cardContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    height: 190,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: '#4F46E5',
  },
  cardNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardNumberText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  cardValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeaderContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1.2,
  },
  formGroup: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#374151',
  },
});

export default AccountScreen;