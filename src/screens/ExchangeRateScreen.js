import React, { useEffect, useState, useCallback, memo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CountryFlag from "react-native-country-flag";
import { currencyMap } from '../services/currencyMap';
import { SafeAreaView } from "react-native-safe-area-context";
import { getExchangeRates } from '../services/api';

const ExchangeRateItem = memo(({ item }) => (
  <View style={styles.row}>
    <View style={styles.countryCell}>
      <CountryFlag isoCode={item.countryCode} size={18} style={styles.flag} />
      <Text style={styles.countryName}>{item.country}</Text>
    </View>
    <Text style={styles.rateCell}>{item.rate}</Text>
    <Text style={styles.rateCell}>{item.rate}</Text>
  </View>
));

const ExchangeRateScreen = ({ navigation }) => {
  const [formattedData, setFormattedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ITEM_HEIGHT = 50;

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getExchangeRates();
        if (result?.conversion_rates) {
          const rates = result.conversion_rates;
          const dataArray = Object.keys(rates).map((currency) => ({
            currency: currency,
            rate: rates[currency],
            countryCode: currencyMap[currency]?.countryCode || 'US',
            country: currencyMap[currency]?.country || 'Unknown'
          }));
          setFormattedData(dataArray);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderItem = useCallback(({ item }) => <ExchangeRateItem item={item} />, []);

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.headerLabelCountry}>Country</Text>
      <Text style={styles.headerLabel}>Buy</Text>
      <Text style={styles.headerLabel}>Sell</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Exchange rate</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={formattedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.currency}
          ListHeaderComponent={renderTableHeader}
          contentContainerStyle={styles.list}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 75,
    paddingBottom: 30
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 10
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },

  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },

  headerLabel: {
    flex: 1,
    color: '#888',
    fontWeight: '600',
    textAlign: 'right'
  },

  headerLabelCountry: {
    flex: 2,
    color: '#888',
    fontWeight: '600'
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9'
  },

  countryCell: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },

  flag: {
    marginRight: 10,
    borderRadius: 3
  },

  countryName: {
    fontSize: 16,
    color: '#333'
  },

  rateCell: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'right'
  },
});

export default ExchangeRateScreen;