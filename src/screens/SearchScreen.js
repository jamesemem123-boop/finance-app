import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React from 'react'
import BranchImage from "../../assets/images/branch.svg";
import InterestRateImage from "../../assets/images/interestRate.svg";
import ExchangeRateImage from "../../assets/images/exchangeRate.svg";
import ExchangeImage from "../../assets/images/exchange.svg";
import { useNavigation } from "@react-navigation/native";
const SettingsScreen = () => {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Search</Text>
      </View>

      {/* search cards */}
      <TouchableOpacity style={styles.searchCard} onPress={() => 
        navigation.navigate("Branch")}>
      <View style={styles.cardTextContainer}>
    <Text style={styles.cardTitle}>
      Branch
    </Text>

    <Text style={styles.cardDescription}>
      Search for branch
    </Text>
  </View>
  <BranchImage style={styles.branchImage} />
  </TouchableOpacity>

  {/* second search card */}
  <TouchableOpacity style={styles.searchCard} onPress={() => 
    navigation.navigate("InterestRate")}>
      <View style={styles.cardTextContainer}>
    <Text style={styles.cardTitle}>
      Interest Rate
    </Text>

    <Text style={styles.cardDescription}>
      Search for interest rate
    </Text>
  </View>

  <InterestRateImage style={styles.branchImage} />
  </TouchableOpacity>

  {/* third search card */}
  <TouchableOpacity style={styles.searchCard} onPress={() => 
    navigation.navigate("ExchangeRate")}>
      <View style={styles.cardTextContainer}>
    <Text style={styles.cardTitle}>
      Exchange Rate
    </Text>

    <Text style={styles.cardDescription}>
      Search for exchange rate
    </Text>
  </View>

  <ExchangeRateImage style={styles.branchImage} />
  </TouchableOpacity>

  {/* fourth search card */}
  <TouchableOpacity style={styles.searchCard} onPress={() => 
    navigation.navigate("Exchange")}>
      <View style={styles.cardTextContainer}>
    <Text style={styles.cardTitle}>
      Exchange
    </Text>

    <Text style={styles.cardDescription}>
      Search for exchange
    </Text>
  </View>

  <ExchangeImage style={styles.branchImage} />
  </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 65,
    paddingBottom: 20,
  },
  title:{
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 10,
  },
  searchCard: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",

  backgroundColor: "#FFFFFF",

  marginHorizontal: 20,
  marginTop: 20,

  padding: 16,

  borderRadius: 16,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 6,

  elevation: 5,
},

cardTextContainer: {
  flex: 1,
  marginRight: 10,
},

cardTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#000",
},

cardDescription: {
  marginTop: 6,

  fontSize: 14,
  color: "#666",

  lineHeight: 20,
},
})

export default SettingsScreen