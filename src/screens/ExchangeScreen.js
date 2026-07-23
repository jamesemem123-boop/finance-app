import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";

import { currencyMap } from "../services/currencyMap";
import { getExchangeRates } from "../services/api";

const MAX_CARDS = 6;

const ExchangeScreen = ({ navigation }) => {

  const [cards, setCards] = useState([
    {
      id: "1",
      code: "USD",
      amount: "139.46",
      active: true,
    },
    {
      id: "2",
      code: "NGN",
      amount: "",
      active: false,
    },
  ]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [rates, setRates] = useState({});

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");

  const [lastUpdated, setLastUpdated] = useState(null);




  useEffect(() => {

      console.log("Rates:", rates);


    const loadRates = async () => {

      try {

        const data = await getExchangeRates();

        if (data?.conversion_rates) {

          setRates(data.conversion_rates);
          setLastUpdated(new Date());
          setError(false);

        }

      } catch (err) {

        console.log(err);
        setError(true);

      }

      setLoading(false);

    };

    loadRates();

  }, [rates]);

  const refreshRates = async () => {

    try {

      setRefreshing(true);

      const data = await getExchangeRates();

      if (data?.conversion_rates) {

        setRates(data.conversion_rates);
        setLastUpdated(new Date());
        setError(false);

      }

    } catch (err) {

      console.log(err);
      setError(true);

    }

    setRefreshing(false);

  };

  const sortedCurrencies = Object.keys(currencyMap).sort((a, b) =>
    currencyMap[a].country.localeCompare(currencyMap[b].country)
  );

  const filteredCurrencies = sortedCurrencies.filter((code) => {
    const currency = currencyMap[code];

    if (!currency) return false;

    const country = currency.country.toLowerCase();

    return (
      country.includes(search.toLowerCase()) ||
      code.toLowerCase().includes(search.toLowerCase())
    );
  });

  const parseNumber = (value) => {

    return Number(value.replace(/,/g, "")) || 0;

  };

  const formatNumber = (value) => {

    if (!value) return "";

    const number = parseFloat(value.toString().replace(/,/g, ""));

    if (isNaN(number)) return "";

    return number.toLocaleString("en-US", {

      maximumFractionDigits: 2,

    });

  };

  const activeCard = cards.find(card => card.active);

  const convertAmount = (sourceCard, targetCode) => {

    if (!rates[sourceCard.code]) return "";

    if (!rates[targetCode]) return "";

    const amount = parseNumber(sourceCard.amount);

    return (
      amount *
      rates[targetCode] /
      rates[sourceCard.code]
    ).toFixed(2);

  };

  const getCardAmount = (card) => {

    if (card.active) {
      return card.amount;
    }

    const source = cards.find(c => c.active);

    if (!source) return "";

    return convertAmount(source, card.code);

  };

  const updateAmount = (id, text) => {
    const clean = text.replace(/[^0-9.]/g, "");

    setCards(previous =>
      previous.map(card => ({
        ...card,
        active: card.id === id,
        amount: card.id === id ? clean : card.amount,
      }))
    );
  };

  const setActiveCard = (id) => {

    setCards(previous =>

      previous.map(card => ({

        ...card,

        active: card.id === id,

      }))

    );

  };

  const addCurrency = (code) => {

    if (cards.length >= MAX_CARDS) return;

    const exists = cards.some(card => card.code === code);

    if (exists) return;

    setCards(previous => [

      ...previous,

      {

        id: Date.now().toString(),

        code,

        amount: "",

        active: false,

      },

    ]);

    setSelectedCard(null);
    setSearch("");
    setModalVisible(false);

  };

  const removeCurrency = (id) => {

    if (cards.length <= 2) return;

    setCards(previous => {

      const updated = previous.filter(card => card.id !== id);

      if (updated.some(card => card.active)) {

        return updated;

      }

      updated[0].active = true;

      return [...updated];

    });

  };

  const openCurrencyPicker = (cardId) => {

    setSelectedCard(cardId);

    setModalVisible(true);

  };

  const changeCurrency = (code) => {

    const exists = cards.some(

      card =>

        card.code === code &&

        card.id !== selectedCard

    );

    if (exists) return;

    setCards(previous =>

      previous.map(card =>

        card.id === selectedCard

          ? {

            ...card,

            code,

          }

          : card

      )

    );

    setSelectedCard(null);
    setSearch("");
    setModalVisible(false);

  };

  const swapCurrencies = () => {

    if (cards.length < 2) return;

    setCards(previous => {

      const updated = [...previous];

      const first = updated[0];

      const second = updated[1];

      updated[0] = {

        ...second,

        id: first.id,

        active: true,

      };

      updated[1] = {

        ...first,

        id: second.id,

        active: false,

      };

      return updated;

    });

  };


  const exchangeRate = () => {

    if (cards.length < 2) return "";

    const first = cards[0];

    const second = cards[1];

    if (!rates[first.code] || !rates[second.code]) return "";

    const rate = rates[second.code] / rates[first.code];

    return `1 ${first.code} = ${rate.toFixed(4)} ${second.code}`;

  };

  if (loading) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>

    );

  }

  if (error) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <Text>Couldn't load exchange rates.</Text>

        <TouchableOpacity onPress={refreshRates}>

          <Text>Retry</Text>

        </TouchableOpacity>

      </View>

    );

  }




  const renderCard = ({ item }) => {

    return (

      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => setActiveCard(item.id)}
        style={[
          styles.card,
          item.active && styles.activeCard,
        ]}
      >

        {/* Left Side */}
        <View style={styles.cardLeft}>

          <TouchableOpacity
            style={styles.currencyButton}
            onPress={() => {

              setActiveCard(item.id);
              openCurrencyPicker(item.id);

            }}
          >

            <CountryFlag
              isoCode={
                currencyMap[item.code]?.countryCode || "US"
              }
              size={26}
            />

            <View style={styles.currencyInfo}>

              <Text style={styles.currencyCode}>

                {item.code}

              </Text>

              <Text style={styles.countryName}>

                {currencyMap[item.code]?.country}

              </Text>

            </View>

            {item.active && (

              <Ionicons
                name="chevron-down"
                size={18}
                color="#007AFF"
              />

            )}

          </TouchableOpacity>

        </View>

        {/* Right Side */}
        <View style={styles.cardRight}>

          <TextInput
            style={styles.amountInput}
            value={formatNumber(getCardAmount(item))}
            editable={item.active}
            keyboardType="decimal-pad"
            onChangeText={(text) => updateAmount(item.id, text)}
            textAlign="right"
            selectTextOnFocus
          />

          {item.active && (

            <MaterialCommunityIcons
              name="calculator"
              size={22}
              color="#777"
              style={{ marginLeft: 8 }}
            />

          )}

        </View>

      </TouchableOpacity>

    );

  };

  const renderHiddenItem = ({ item, index }) => {

    if (index < 2) return null;

    return (
      <View style={styles.hiddenRow}>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeCurrency(item.id)}
        >
          <Ionicons
            name="trash"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>

      </View>
    );

  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Exchange</Text>
      </View>

      {/* Last Updated */}
      <Text style={styles.dateStamp}>
        Last updated: {lastUpdated ? lastUpdated.toLocaleString() : "Loading..."}
      </Text>

      {/* Currency Cards */}
      <SwipeListView
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-80}
        leftOpenValue={0}
        disableLeftSwipe={false}
        disableRightSwipe={true}
        previewRowKey={"3"}
        previewOpenValue={-40}
        previewOpenDelay={1500}
        closeOnRowPress
        closeOnScroll
        closeOnRowOpen
        refreshing={refreshing}
        onRefresh={refreshRates}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        ListFooterComponent={
          cards.length < MAX_CARDS ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setSelectedCard(null);
                setSearch("");
                setModalVisible(true);
              }}
            >
              <Text style={styles.addText}>
                + Add Currency
              </Text>
            </TouchableOpacity>
          ) : null
        }
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      />

      {/* Swap Button */}
      {cards.length >= 2 && (
        <View style={styles.swapContainer}>
          <TouchableOpacity
            style={styles.swapButton}
            onPress={swapCurrencies}
          >
            <Ionicons
              name="swap-vertical"
              size={24}
              color="#007AFF"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Exchange Rate */}
      <Text style={styles.rateText}>
        {exchangeRate()}
      </Text>

      {/* Currency Picker */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setSelectedCard(null);
          setSearch("");
          setModalVisible(false);
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          {/* Modal Header */}
          <View style={styles.modalHeader}>

            <Text style={styles.modalTitle}>
              Choose Currency
            </Text>

            <TouchableOpacity
              onPress={() => {
                setSelectedCard(null);
                setSearch("");
                setModalVisible(false);
              }}
            >
              <Ionicons
                name="close"
                size={28}
                color="#000"
              />
            </TouchableOpacity>

          </View>

          {/* Search */}
          <View style={styles.searchContainer}>

            <Ionicons
              name="search"
              size={20}
              color="#888"
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search currencies"
              value={search}
              onChangeText={setSearch}
              autoFocus
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
            />

          </View>

          {/* Currency List */}
          <FlatList
            data={filteredCurrencies}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {

              const alreadyExists = cards.some(
                card =>
                  card.code === item &&
                  card.id !== selectedCard
              );

              const isCurrent =
                cards.find(card => card.id === selectedCard)?.code === item;

              return (

                <TouchableOpacity
                  disabled={alreadyExists}
                  style={[
                    styles.modalItem,
                    alreadyExists && styles.disabledCurrency,
                    isCurrent && styles.selectedCurrency,
                  ]}
                  onPress={() => {

                    if (selectedCard) {

                      changeCurrency(item);

                    } else {

                      addCurrency(item);

                    }

                  }}
                >

                  <CountryFlag
                    isoCode={
                      currencyMap[item]?.countryCode || "US"
                    }
                    size={24}
                  />

                  <View style={styles.modalContent}>

                    <View>

                      <Text style={styles.modalCountry}>
                        {currencyMap[item]?.country}
                      </Text>

                      <Text style={styles.modalCode}>
                        {item}
                      </Text>

                    </View>

                    {isCurrent && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#007AFF"
                      />
                    )}

                  </View>

                </TouchableOpacity>

              );

            }}
          />

        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
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
    fontWeight: "700",
    marginLeft: 15,
    color: "#111",
  },

  dateStamp: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
    marginBottom: 18,
    marginHorizontal: 20,
  },

  rateText: {
    textAlign: "center",
    color: "#777",
    fontSize: 14,
    marginVertical: 12,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderWidth: 2,
    borderColor: "transparent",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  activeCard: {
    borderColor: "#007AFF",
  },

  cardLeft: {
    flex: 1,
    justifyContent: "center",
  },

  currencyButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  currencyInfo: {
    marginLeft: 12,
    flex: 1,
  },

  currencyCode: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
  },

  countryName: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },

  cardRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  amountInput: {
    minWidth: 140,
    textAlign: "right",
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    padding: 0,
  },

  swapContainer: {
    alignItems: "center",
    marginVertical: 10,
  },

  swapButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  deleteBtn: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 18,
  },

  addButton: {
    paddingVertical: 20,
    marginHorizontal: 20,
  },

  addText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#007AFF",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#F2F2F7",
    borderRadius: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#111",
  },

  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },

  modalContent: {
    flex: 1,
    marginLeft: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalCountry: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },

  modalCode: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  selectedCurrency: {
    backgroundColor: "#EEF6FF",
  },

  disabledCurrency: {
    opacity: 0.35,
  },

  hiddenRow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    marginHorizontal: 20,
    marginBottom: 14,
  },

  deleteBtn: {
    width: 80,
    height: "100%",
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
});

export default ExchangeScreen;