import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Modal,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TransferSuccessScreen({ transferData, onClose, onNavigateHome }) {
    const [receiptVisible, setReceiptVisible] = useState(false);

    const amount = transferData?.amount || '320';
    const recipientName = transferData?.recipientName || 'Jane';
    const transactionId = transferData?.id || 'TXN-98420183';
    const date = transferData?.date || new Date().toLocaleDateString();

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Success Content */}
        <View style={styles.content}>
            {/* Animated/Celebration Checkmark Icon */}
            <View style={styles.iconContainer}>
            <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={40} color="#FFFFFF" />
            </View>
            </View>

            {/* Success Message */}
            <Text style={styles.successText}>
            ${amount} has been{'\n'}sent to {recipientName}!
            </Text>

            {/* View Receipt Link */}
            <TouchableOpacity 
            style={styles.receiptButton} 
            onPress={() => setReceiptVisible(true)}
            >
            <Text style={styles.receiptButtonText}>View receipt</Text>
            </TouchableOpacity>

            {/* Close Button */}
            <TouchableOpacity 
            style={styles.closeButton} 
            onPress={onClose || onNavigateHome} 
            activeOpacity={0.8}
            >
            <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>

        {/* Receipt Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={receiptVisible}
            onRequestClose={() => setReceiptVisible(false)}
        >
            <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                {/* Modal Header */}
                <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Transaction Receipt</Text>
                <TouchableOpacity onPress={() => setReceiptVisible(false)}>
                    <Feather name="x" size={24} color="#0F172A" />
                </TouchableOpacity>
                </View>

                {/* Receipt Card Body */}
                <View style={styles.receiptCard}>
                <MaterialCommunityIcons name="check-decagram" size={48} color="#6C5CE7" style={{ alignSelf: 'center', marginBottom: 8 }} />
                <Text style={styles.receiptAmount}>${amount}.00</Text>
                <Text style={styles.receiptStatus}>Completed</Text>

                <View style={styles.divider} />

                <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Recipient</Text>
                    <Text style={styles.receiptValue}>{recipientName}</Text>
                </View>

                <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Transaction ID</Text>
                    <Text style={styles.receiptValue}>{transactionId}</Text>
                </View>

                <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Date & Time</Text>
                    <Text style={styles.receiptValue}>{date}</Text>
                </View>

                <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Payment Method</Text>
                    <Text style={styles.receiptValue}>Mastercard (••2236)</Text>
                </View>

                <View style={styles.receiptRow}>
                    <Text style={styles.receiptLabel}>Transfer Fee</Text>
                    <Text style={styles.receiptValue}>$0.00</Text>
                </View>
                </View>

                {/* Done Button in Modal */}
                <TouchableOpacity 
                style={styles.modalCloseButton} 
                onPress={() => setReceiptVisible(false)}
                >
                <Text style={styles.modalCloseButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
        </SafeAreaView>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingBottom: 75,
    },
    iconContainer: {
        marginBottom: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#6C5CE7',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#6C5CE7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    successText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0F172A',
        textAlign: 'center',
        lineHeight: 32,
        marginBottom: 40,
    },
    receiptButton: {
        marginBottom: 20,
        paddingVertical: 10,
    },
    receiptButtonText: {
        color: '#6C5CE7',
        fontSize: 16,
        fontWeight: '600',
    },
    closeButton: {
        backgroundColor: '#6C5CE7',
        width: '100%',
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    /* Modal Styles */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    receiptCard: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    receiptAmount: {
        fontSize: 28,
        fontWeight: '700',
        color: '#0F172A',
        textAlign: 'center',
    },
    receiptStatus: {
        fontSize: 13,
        color: '#10B981',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 16,
    },
    receiptRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    receiptLabel: {
        fontSize: 14,
        color: '#64748B',
    },
    receiptValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    modalCloseButton: {
        backgroundColor: '#6C5CE7',
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});