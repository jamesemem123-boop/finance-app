import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Linking } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

const SupportModal = ({ visible, onClose }) => {

  const openWhatsApp = () => {
    const phoneNumber = '+2348107181148'; 
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent('Hello, I need help with the BigVa app.')}`;
    Linking.openURL(url).catch(() => alert('WhatsApp not installed'));
    onClose();
  };

  const openEmail = () => {
    Linking.openURL('mailto:obiagbasigreat@gmail.com?subject=BigVa Support Inquiry');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>

          {/* Header */}
          <Text style={styles.modalTitle}>Customer Care</Text>

          {/* WhatsApp Option */}
          <TouchableOpacity style={styles.optionContainer} onPress={openWhatsApp}>
            <Text style={styles.optionText}>Chat on WhatsApp</Text>
            <Icon name="logo-whatsapp" size={24} color="#25D366" />
          </TouchableOpacity>

          {/* Email Option */}
          <TouchableOpacity style={styles.optionContainer} onPress={openEmail}>
            <Text style={styles.optionText}>Send an Email</Text>
            <Icon name="mail-outline" size={24} color="#4B0082" />
          </TouchableOpacity>

          {/* Cancel/Close Button */}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const SettingsScreen = ({ navigation }) => {
  const [isAppInfoModalVisible, setIsAppInfoModalVisible] = useState(false);
  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const userProfileImage = "https://picsum.photos/200";
  const userName = "Push Puttichai";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Setting</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userProfileImage }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{userName}</Text>
        </View>

        {/* Settings Options */}
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Text style={styles.itemText}>Password</Text>
          <Icon name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('AppInfo')} // Directly navigate to the screen
        >
          <Text style={styles.itemText}>App Information</Text>
          <Icon name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => setIsSupportVisible(true)}
        >
          <View style={styles.itemLabelContainer}>
            <Text style={styles.itemText}>Customer Care</Text>
          </View>
          <Icon name="chevron-forward-outline" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Put the modal component at the bottom of your render function */}
        <SupportModal visible={isSupportVisible} onClose={() => setIsSupportVisible(false)} />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  scrollContent: {
    paddingBottom: 20
  }, // Adds a little breathing room at the bottom

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 20
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10
  },

  profileContainer: {
    alignItems: 'center',
    marginVertical: 30
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd'
  },

  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#4B0082'
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Added for better vertical alignment
    paddingVertical: 20,
    paddingHorizontal: 20, // This gives the text/icon breathing room inside
    marginHorizontal: 20,  // This pulls the whole row in from the edges
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },

  itemText: {
    fontSize: 16
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 20,
    // Add a max height so it scrolls if the list gets too long
    maxHeight: '80%',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    marginTop: 25,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4757',
  },

  section: { 
    marginTop: 30, 
    paddingHorizontal: 20 
  },
  sectionHeader: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 10 
  },
});

export default SettingsScreen;