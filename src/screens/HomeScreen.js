import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from '@expo/vector-icons';
import { fetchUserData } from '../services/financeService';

export default function HomeScreen({ onNavigate }) {
    const [userData, setUserData] = useState({
        greetingName: null,
        cardHolder: null,
        tier: null,
        cardNumber: null,
        balance: null,
    });
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        const data = await fetchUserData();
        if (data) {
        setUserData(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    // Quick action buttons list - updated action key for Report
    const actions = [
        { id: '1', title: 'Account\nand Card', icon: 'wallet-outline', color: '#5B37B7', action: 'Account' },
        { id: '2', title: 'Transfer', icon: 'swap-horizontal', color: '#FF4267', action: 'Transfer' },
        { id: '3', title: 'Withdraw', icon: 'cash-outline', color: '#007AFF', action: 'Withdraw' },
        { id: '4', title: 'Mobile\nrecharge', icon: 'phone-portrait-outline', color: '#FFA800', action: 'Recharge' },
        { id: '5', title: 'Pay the\nbill', icon: 'receipt-outline', color: '#20C997', action: 'Bill' },
        { id: '6', title: 'Credit\ncard', icon: 'card-outline', color: '#FF6B00', action: 'CreditCard' },
        { id: '7', title: 'Transaction\nreport', icon: 'newspaper-outline', color: '#5B37B7', action: 'TransactionReport' },
    ];

    const handleActionPress = (actionName) => {
        if (onNavigate && actionName) {
        onNavigate(actionName);
        }
    };

    const handleHomeTap = () => {
        // If already on Home, trigger a fresh data reload
        loadData();
    };

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Dynamic Greeting */}
            <View style={styles.header}>
            <Text style={styles.greetingTitle}>Welcome,</Text>
            <Text style={styles.greetingName}>
                {loading ? '--' : (userData.greetingName ?? '--')}!
            </Text>
            </View>

            {/* Credit Card Container */}
            <View style={styles.cardContainer}>
            <View style={[styles.cardStack, styles.cardStackBottom]} />
            <View style={[styles.cardStack, styles.cardStackMiddle]} />

            <View style={styles.card}>
                <View style={styles.cardDecorativeCircle} />

                <View style={styles.cardHeader}>
                <Text style={styles.cardName}>
                    {loading ? '--' : (userData.cardHolder ?? '--')}
                </Text>
                <Text style={styles.cardTier}>
                    {loading ? '--' : (userData.tier ?? '--')}
                </Text>
                </View>

                <View style={styles.cardFooter}>
                <View>
                    <Text style={styles.cardNumber}>
                    {loading ? '•••• •••• •••• ••••' : (userData.cardNumber ?? '•••• •••• •••• ••••')}
                    </Text>
                    <Text style={styles.cardBalance}>
                    {loading
                        ? '--'
                        : userData.balance !== null
                        ? `$${userData.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                        : '--'}
                    </Text>
                </View>
                <Text style={styles.visaText}>VISA</Text>
                </View>
            </View>
            </View>

            {/* Quick Action Grid */}
            <View style={styles.grid}>
            {actions.map((item) => (
                <TouchableOpacity
                key={item.id}
                style={styles.actionCard}
                activeOpacity={0.7}
                onPress={() => handleActionPress(item.action)}
                >
                <View style={styles.iconWrapper}>
                    <Ionicons name={item.icon} size={28} color={item.color} />
                </View>
                <Text style={styles.actionTitle}>{item.title}</Text>
                </TouchableOpacity>
            ))}
            </View>

        </ScrollView>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 24,
    },
    greetingTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        lineHeight: 34,
    },
    greetingName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        lineHeight: 34,
    },
    cardContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    cardStackBottom: {
        position: 'absolute',
        bottom: -16,
        width: '85%',
        height: 40,
        backgroundColor: '#FF6B00',
        borderRadius: 20,
        opacity: 0.8,
    },
    cardStackMiddle: {
        position: 'absolute',
        bottom: -8,
        width: '92%',
        height: 40,
        backgroundColor: '#FFB800',
        borderRadius: 20,
        opacity: 0.9,
    },
    card: {
        width: '100%',
        height: 190,
        backgroundColor: '#384C66',
        borderRadius: 20,
        padding: 24,
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    cardDecorativeCircle: {
        position: 'absolute',
        right: -20,
        top: -20,
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: '#20C997',
        opacity: 0.85,
    },
    cardHeader: {
        zIndex: 1,
    },
    cardName: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '500',
    },
    cardTier: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 13,
        marginTop: 10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 1,
    },
    cardNumber: {
        color: '#FFFFFF',
        fontSize: 16,
        letterSpacing: 1.5,
        marginBottom: 6,
    },
    cardBalance: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
    },
    visaText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '900',
        fontStyle: 'italic',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionCard: {
        width: '30%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 8,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    iconWrapper: {
        marginBottom: 10,
    },
    actionTitle: {
        fontSize: 11,
        color: '#8A8A8E',
        textAlign: 'center',
        fontWeight: '500',
        lineHeight: 14,
    },
});