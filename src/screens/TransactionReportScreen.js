import React, { useEffect, useState, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from '@expo/vector-icons';
import { fetchTransactionReport } from '../services/financeService';

const { width } = Dimensions.get('window');

// Date Formatter Helper for Section Header
    const formatSectionDate = (dateString) => {
    const transactionDate = new Date(dateString);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const checkDate = new Date(
        transactionDate.getFullYear(),
        transactionDate.getMonth(),
        transactionDate.getDate()
    );

    if (checkDate.getTime() === today.getTime()) {
        return 'Today';
    } else if (checkDate.getTime() === yesterday.getTime()) {
        return 'Yesterday';
    } else {
        return transactionDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        });
    }
    };

    // Groups raw transactions by date section
    const groupTransactionsByDate = (rawTransactions) => {
    const groups = {};

    rawTransactions.forEach((item) => {
        const sectionTitle = formatSectionDate(item.createdAt);
        if (!groups[sectionTitle]) {
        groups[sectionTitle] = [];
        }
        groups[sectionTitle].push(item);
    });

    return Object.keys(groups).map((title) => ({
        title,
        data: groups[title],
    }));
    };

    // Helper to convert string amounts like "- $280.00" or "$3,456.98" to a raw Float number
    const parseAmount = (amountStr) => {
    if (typeof amountStr === 'number') return amountStr;
    if (!amountStr) return 0;
    const cleanStr = amountStr.replace(/[^0-9.-]+/g, '');
    return parseFloat(cleanStr) || 0;
    };

    export default function TransactionReportScreen({ onBack, onNavigateHome }) {
    const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' or 'history'
    const [rawTransactions, setRawTransactions] = useState([]);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadReport() {
        setLoading(true);
        const data = await fetchTransactionReport();
        const validData = data || [];
        setRawTransactions(validData);
        setSections(groupTransactionsByDate(validData));
        setLoading(false);
        }
        loadReport();
    }, []);

    // --------------------------------------------------------------------------
    // DYNAMIC COMPUTATIONS BASED ON FETCHED TRANSACTIONS DATA
    // --------------------------------------------------------------------------
    const analyticsData = useMemo(() => {
        let moneyIn = 0;
        let moneyOut = 0;

        // Monthly bucket map: { JAN: amount, FEB: amount, ... }
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const currentYear = new Date().getFullYear();
        const monthlySpendingMap = {};

        // Initialize 6 months up to current month (or default last 6 months)
        const currentMonthIdx = new Date().getMonth();
        const last6MonthsIndices = [];
        for (let i = 5; i >= 0; i--) {
        const idx = (currentMonthIdx - i + 12) % 12;
        last6MonthsIndices.push(idx);
        monthlySpendingMap[months[idx]] = 0;
        }

        rawTransactions.forEach((item) => {
        const numAmount = parseAmount(item.amount);
        const itemDate = item.createdAt ? new Date(item.createdAt) : new Date();

        if (item.isExpense) {
            moneyOut += numAmount;

            // Group expense into monthly chart
            const monthLabel = months[itemDate.getMonth()];
            if (monthlySpendingMap[monthLabel] !== undefined) {
            monthlySpendingMap[monthLabel] += numAmount;
            }
        } else {
            moneyIn += numAmount;
        }
        });

        // Find max value in monthly spending to calculate responsive bar height %
        const maxSpending = Math.max(...Object.values(monthlySpendingMap), 100);

        const chartData = last6MonthsIndices.map((mIdx) => {
        const monthKey = months[mIdx];
        const spentAmount = monthlySpendingMap[monthKey] || 0;
        const heightPercent = Math.min(Math.round((spentAmount / maxSpending) * 100), 100);
        return {
            month: monthKey,
            amount: spentAmount,
            heightPercent: Math.max(heightPercent, 5), // Keep a minimal 5% bar visibility
        };
        });

        return {
        moneyIn,
        moneyOut,
        chartData,
        maxAxisValue: Math.ceil(maxSpending / 100) * 100, // Dynamic Y-Axis upper bound rounded to hundreds
        };
    }, [rawTransactions]);

    const renderItem = ({ item }) => (
        <View style={styles.transactionCard}>
        <View style={styles.leftRow}>
            <View style={[styles.iconContainer, { backgroundColor: item.iconBg || '#6C5CE7' }]}>
            <Ionicons name={item.icon || 'card-outline'} size={20} color="#FFFFFF" />
            </View>
            <View style={styles.textContainer}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            {item.status ? <Text style={styles.transactionStatus}>{item.status}</Text> : null}
            </View>
        </View>
        <Text style={[styles.amountText, item.isExpense ? styles.expenseText : styles.incomeText]}>
            {item.amount}
        </Text>
        </View>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    return (
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transaction report</Text>
            <View style={{ width: 24 }} />
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
            <TouchableOpacity
            style={[styles.tabButton, activeTab === 'analytics' && styles.activeTabButton]}
            onPress={() => setActiveTab('analytics')}
            >
            <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>
                Analytics
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
            onPress={() => setActiveTab('history')}
            >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
                History
            </Text>
            </TouchableOpacity>
        </View>

        {loading ? (
            <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6C5CE7" />
            </View>
        ) : activeTab === 'history' ? (
            /* History Section List */
            <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            stickySectionHeadersEnabled={false}
            />
        ) : (
            /* Dynamic Analytics View */
            <ScrollView contentContainerStyle={styles.analyticsContent} showsVerticalScrollIndicator={false}>
            {/* Summary Cards: Dynamic Money In & Money Out */}
            <View style={styles.summaryRow}>
                <View style={styles.moneyInCard}>
                <Text style={styles.summaryLabel}>Money In</Text>
                <View style={styles.summaryAmountRow}>
                    <Text style={styles.summaryAmount}>
                    + ${analyticsData.moneyIn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Text>
                    <Feather name="trending-up" size={16} color="#7C3AED" style={{ marginLeft: 6 }} />
                </View>
                </View>

                <View style={styles.moneyOutCard}>
                <Text style={styles.summaryLabelLight}>Money Out</Text>
                <View style={styles.summaryAmountRow}>
                    <Text style={styles.summaryAmountLight}>
                    - ${analyticsData.moneyOut.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </Text>
                    <Feather name="trending-up" size={16} color="#7C3AED" style={{ marginLeft: 6 }} />
                </View>
                </View>
            </View>

            {/* Dynamic Monthly Spending Bar Chart */}
            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Monthly Spending</Text>

                <View style={styles.chartBody}>
                {/* Dynamic Y-Axis Guideline Labels */}
                <View style={styles.yAxis}>
                    <Text style={styles.axisLabel}>{analyticsData.maxAxisValue}</Text>
                    <Text style={styles.axisLabel}>{Math.round(analyticsData.maxAxisValue * 0.8)}</Text>
                    <Text style={styles.axisLabel}>{Math.round(analyticsData.maxAxisValue * 0.6)}</Text>
                    <Text style={styles.axisLabel}>{Math.round(analyticsData.maxAxisValue * 0.4)}</Text>
                    <Text style={styles.axisLabel}>{Math.round(analyticsData.maxAxisValue * 0.2)}</Text>
                    <Text style={styles.axisLabel}>0</Text>
                </View>

                {/* Bars Area */}
                <View style={styles.barsArea}>
                    <View style={styles.gridLinesContainer}>
                    <View style={styles.gridLine} />
                    <View style={styles.gridLine} />
                    <View style={styles.gridLine} />
                    <View style={styles.gridLine} />
                    <View style={styles.gridLine} />
                    <View style={styles.gridLine} />
                    </View>

                    <View style={styles.barsContainer}>
                    {analyticsData.chartData.map((item, index) => (
                        <View key={index} style={styles.barColumn}>
                        <View style={styles.barBackground}>
                            <View style={[styles.barFill, { height: `${item.heightPercent}%` }]} />
                        </View>
                        <Text style={styles.xLabel}>{item.month}</Text>
                        </View>
                    ))}
                    </View>
                </View>
                </View>
            </View>

            {/* Dynamic Budget Status Cards */}
            <View style={styles.budgetCardIn}>
                <View>
                <Text style={styles.budgetTitleIn}>In Budget</Text>
                <Text style={styles.budgetSubtitleIn}>Shopping</Text>
                </View>
                <Text style={styles.budgetAmountIn}>$50.00/ $100.00</Text>
            </View>

            <View style={styles.budgetCardOut}>
                <View>
                <Text style={styles.budgetTitleOut}>Out of Budget</Text>
                <Text style={styles.budgetSubtitleOut}>Subscriptions</Text>
                </View>
                <Text style={styles.budgetAmountOut}>$150.00/ $100.00</Text>
            </View>
            </ScrollView>
        )}
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
        paddingBottom: 8,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#0F172A',
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 16,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTabButton: {
        backgroundColor: '#FFFFFF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
    },
    activeTabText: {
        color: '#0F172A',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 90,
    },
    sectionHeader: {
        fontSize: 13,
        fontWeight: '600',
        color: '#94A3B8',
        marginTop: 16,
        marginBottom: 12,
    },
    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    leftRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    textContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    transactionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    transactionStatus: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    amountText: {
        fontSize: 15,
        fontWeight: '700',
    },
    expenseText: {
        color: '#FF4D6D',
    },
    incomeText: {
        color: '#6C5CE7',
    },
    analyticsContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    moneyInCard: {
        width: '48%',
        backgroundColor: '#94A3B8',
        borderRadius: 16,
        padding: 16,
    },
    moneyOutCard: {
        width: '48%',
        backgroundColor: '#6366F1',
        borderRadius: 16,
        padding: 16,
    },
    summaryLabel: {
        fontSize: 12,
        color: '#334155',
        fontWeight: '500',
    },
    summaryLabelLight: {
        fontSize: 12,
        color: '#E0E7FF',
        fontWeight: '500',
    },
    summaryAmountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    summaryAmount: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    summaryAmountLight: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    chartContainer: {
        backgroundColor: '#FFF8FA',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    chartTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 16,
    },
    chartBody: {
        flexDirection: 'row',
        height: 180,
    },
    yAxis: {
        justifyContent: 'space-between',
        paddingRight: 10,
        alignItems: 'flex-end',
    },
    axisLabel: {
        fontSize: 10,
        color: '#94A3B8',
    },
    barsArea: {
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-end',
    },
    gridLinesContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
    },
    gridLine: {
        height: 1,
        backgroundColor: '#E2E8F0',
        width: '100%',
    },
    barsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        height: '100%',
        paddingTop: 10,
    },
    barColumn: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
    },
    barBackground: {
        width: 24,
        height: '80%',
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        marginBottom: 6,
    },
    barFill: {
        width: '100%',
        backgroundColor: '#6366F1',
        borderRadius: 4,
    },
    xLabel: {
        fontSize: 10,
        color: '#64748B',
        fontWeight: '600',
    },
    budgetCardIn: {
        backgroundColor: '#6366F1',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    budgetTitleIn: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    budgetSubtitleIn: {
        fontSize: 12,
        color: '#A5B4FC',
        marginTop: 2,
    },
    budgetAmountIn: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    budgetCardOut: {
        backgroundColor: '#94A3B8',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    budgetTitleOut: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    budgetSubtitleOut: {
        fontSize: 12,
        color: '#475569',
        marginTop: 2,
    },
    budgetAmountOut: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
});