import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../components/ThemeContext';
import { SafeAreaView } from "react-native-safe-area-context";


const ChangePassword = ({ navigation }) => {
  const { theme } = useTheme();
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const isFormValid = passwords.current && passwords.new && passwords.confirm;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: theme.background }]}>


      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back-outline" size={28} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Change password</Text>
        </View>

        {/* Form Card */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          {['Recent password', 'New password', 'Confirm password'].map((label, index) => (
            <View key={index} style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.text }]}
                placeholder={label}
                placeholderTextColor="#999"
                secureTextEntry
                onChangeText={(text) => {
                  const key = Object.keys(passwords)[index];
                  setPasswords({ ...passwords, [key]: text });
                }}
              />
            </View>
          ))}

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isFormValid ? theme.primary : '#ccc' }
            ]}
            disabled={!isFormValid}
            onPress={() => console.log('Password Changed!')}
          >
            <Text style={styles.buttonText}>Change password</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 75,
    paddingBottom: 40,
  },
  backButton: {
    marginRight: 10
  },

  title: {
    fontSize: 22,
    fontWeight: '700'
  },

  card: {
    marginHorizontal: 20,
    padding: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 13,
    marginBottom: 8,
    opacity: 0.7
  },
  input: {
    borderWidth: 1.2,
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#FAFAFA'
  },
  button: {
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }

});

export default ChangePassword;