import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function TransferDetailsScreen({ recipient, onBack, onNavigateHome, onSend }) {
    // Fallback recipient info if no data is passed yet
    const targetRecipient = {
        name: recipient?.name || 'Jane Cooper',
        cardNumber: recipient?.cardNumber || '3246 •••• •••• 3422',
        avatar: recipient?.avatar || null,
    };

    const [amount, setAmount] = useState('320.00');

    const handleSend = () => {
        if (onSend) {
        onSend({
            amount: amount || '320',
            recipientName: targetRecipient.name ? targetRecipient.name.split(' ')[0] : 'Jane',
            recipientFullName: targetRecipient.name,
            id: 'TXN-' + Math.floor(10000000 + Math.random() * 90000000),
            date: new Date().toLocaleDateString(),
        });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transfer money to</Text>
            <View style={{ width: 24 }} />
        </View>

        {/* Recipient Profile */}
        <View style={styles.profileSection}>
            {targetRecipient.avatar ? (
            <Image source={{ uri: targetRecipient.avatar }} style={styles.avatar} />
            ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarInitials}>
                {targetRecipient.name ? targetRecipient.name.charAt(0).toUpperCase() : '?'}
                </Text>
            </View>
            )}
            <Text style={styles.recipientName}>{targetRecipient.name}</Text>
            <Text style={styles.recipientCard}>{targetRecipient.cardNumber}</Text>
        </View>

        {/* Amount Input */}
        <View style={styles.amountSection}>
            <View style={styles.amountRow}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
            />
            </View>
            <Text style={styles.feeText}>No fee</Text>
        </View>

        {/* Select Account Selector */}
        <View style={styles.accountSection}>
            <Text style={styles.accountLabel}>Select your account</Text>
            
            <TouchableOpacity style={styles.accountCard} activeOpacity={0.8}>
            <View style={styles.accountLeft}>
                {/* Mastercard overlapping circles badge */}
                <View style={styles.mcBadge}>
                <View style={[styles.mcCircle, { backgroundColor: '#EB001B' }]} />
                <View style={[styles.mcCircle, { backgroundColor: '#F79E1B', marginLeft: -10 }]} />
                </View>
                <View style={styles.accountDetails}>
                <Text style={styles.accountCardNumber}>•••• 2236</Text>
                <Text style={styles.accountBalance}>Balance: $ 5300.00</Text>
                </View>
            </View>
            <Feather name="chevron-down" size={20} color="#64748B" />
            </TouchableOpacity>
        </View>

        {/* Send Button */}
        <View style={styles.footer}>
            <TouchableOpacity style={styles.sendButton} activeOpacity={0.8} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 16,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginBottom: 12,
    },
    avatarPlaceholder: {
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitials: {
        fontSize: 28,
        fontWeight: '600',
        color: '#64748B',
    },
    recipientName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    recipientCard: {
        fontSize: 13,
        color: '#94A3B8',
        letterSpacing: 0.5,
    },
    amountSection: {
        alignItems: 'center',
        marginVertical: 32,
    },
    amountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    currencySymbol: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0F172A',
        marginRight: 6,
    },
    amountInput: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0F172A',
        minWidth: 100,
    },
    feeText: {
        fontSize: 13,
        color: '#94A3B8',
        marginTop: 6,
    },
    accountSection: {
        paddingHorizontal: 20,
    },
    accountLabel: {
        fontSize: 14,
        color: '#94A3B8',
        textAlign: 'center',
        marginBottom: 12,
    },
    accountCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
    },
    accountLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mcBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    mcCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    accountDetails: {
        justifyContent: 'center',
    },
    accountCardNumber: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    accountBalance: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 90,
        left: 20,
        right: 20,
    },
    sendButton: {
        backgroundColor: '#6C5CE7',
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});