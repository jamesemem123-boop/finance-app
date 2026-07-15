import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import all your data directly here
import { appAbout, privacyPolicy, termsOfService } from '../data/legalContents';

const AppInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>About BigVa</Text>
        <Text style={styles.sectionTitle}>Company Info</Text>
        <Text style={styles.body}>{appAbout}</Text>
        
        <Text style={styles.sectionTitle}>Privacy Policy</Text>
        <Text style={styles.body}>{privacyPolicy}</Text>
        
        <Text style={styles.sectionTitle}>Terms of Service</Text>
        <Text style={styles.body}>{termsOfService}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 25 },
  title: { fontSize: 28, fontWeight: '800', color: '#1a1a1a', marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#4B0082', marginTop: 20, marginBottom: 10 },
  body: { fontSize: 16, lineHeight: 24, color: '#444', marginBottom: 10 }
});

export default AppInfoScreen;