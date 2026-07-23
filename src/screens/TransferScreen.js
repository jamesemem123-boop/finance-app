import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { fetchTransferContacts } from '../services/financeService';

export default function TransferScreen({ onBack, onNavigateHome, onSelectRecipient }) {
    const [contacts, setContacts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadContacts() {
        setLoading(true);
        const data = await fetchTransferContacts();
        setContacts(data || []);
        setLoading(false);
        }
        loadContacts();
    }, []);

    const filteredContacts = contacts.filter((c) =>
        c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone?.includes(searchQuery) ||
        c.cardNumber?.includes(searchQuery)
    );

    const renderContactItem = ({ item }) => (
        <TouchableOpacity
        style={styles.contactCard}
        activeOpacity={0.6}
        onPress={() => onSelectRecipient && onSelectRecipient(item)}
        >
        <View style={styles.leftRow}>
            {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarInitials}>
                {item.name ? item.name.charAt(0).toUpperCase() : '?'}
                </Text>
            </View>
            )}
            <Text style={styles.contactName}>{item.name}</Text>
        </View>
        <Feather name="chevron-right" size={22} color="#C4C4C4" />
        </TouchableOpacity>
    );

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

        {/* Search Bar */}
        <View style={styles.searchContainer}>
            <Feather name="search" size={18} color="#94A3B8" style={styles.searchIcon} />
            <TextInput
            style={styles.searchInput}
            placeholder="Write name, phone or card number"
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            />
        </View>

        {/* Contact List / Empty State */}
        <View style={styles.listContainer}>
            {loading ? (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No contacts</Text>
            </View>
            ) : filteredContacts.length > 0 ? (
            <FlatList
                data={filteredContacts}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={renderContactItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            />
            ) : (
            <View style={styles.emptyContainer}>
                <Ionicons name="people-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyText}>No contacts found</Text>
                <Text style={styles.emptySubtext}>
                When data is added to the database, recipient contacts will appear here.
                </Text>
            </View>
            )}
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F3F9',
        borderRadius: 14,
        marginHorizontal: 20,
        paddingHorizontal: 14,
        height: 48,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#0F172A',
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 90,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        marginRight: 16,
    },
    avatarPlaceholder: {
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInitials: {
        fontSize: 18,
        fontWeight: '600',
        color: '#64748B',
    },
    contactName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: 60,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#64748B',
        marginTop: 12,
    },
    emptySubtext: {
        fontSize: 13,
        color: '#94A3B8',
        textAlign: 'center',
        marginTop: 6,
        lineHeight: 18,
    },
});