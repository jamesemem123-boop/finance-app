import React from "react";
import {
  View,
 Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MobileSuccessfulScreen = ({
  navigation,
  route,
}) => {
  const {
    phone = "",
    amount = "$10",
  } = route.params || {};

  // =====================================
  // TODO:
  // Backend Placeholder
  //
  // Refresh wallet balance
  // Refresh transaction history
  // Update recent transactions
  // =====================================

  const handleDone = () => {
    navigation.navigate("Tabs");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color="#333"
            />
          </TouchableOpacity>

          <Text style={styles.title}>
            Mobile prepaid
          </Text>
        </View>

        {/* Illustration */}

        <Image
          source={require("../../assets/images/exchange.svg")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.successTitle}>
          Recharge Successful!
        </Text>

        <Text style={styles.message}>
          Your mobile recharge has been
        </Text>

        <Text style={styles.message}>
          completed successfully.
        </Text>

        {/* Receipt */}

        <View style={styles.receipt}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Phone Number
            </Text>

            <Text style={styles.value}>
              {phone}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Recharge Amount
            </Text>

            <Text style={styles.amount}>
              {amount}
            </Text>
          </View>

          <View style={styles.divider} />
                    <View style={styles.divider} />
        </View>

        {/* Done Button */}

        <TouchableOpacity
          style={styles.doneButton}
          activeOpacity={0.8}
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>
            Done
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default MobileSuccessfulScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FB",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginLeft: 12,
  },

  image: {
    width: 300,
    height: 220,
    marginBottom: 30,
  },

  successTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4F46E5",
    textAlign: "center",
    marginBottom: 16,
  },

  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 26,
  },

  receipt: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 35,
    marginBottom: 45,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },

  label: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },

  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "700",
    maxWidth: "60%",
    textAlign: "right",
  },

  amount: {
    fontSize: 18,
    color: "#4F46E5",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },

  doneButton: {
    width: "100%",
    height: 58,
    borderRadius: 18,
    backgroundColor: "#5B5FEF",
    justifyContent: "center",
    alignItems: "center",
  },

  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});