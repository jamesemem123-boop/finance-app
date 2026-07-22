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

const MobileConfirmScreen = ({
  navigation,
  route,
}) => {
  const {
    phone = "",
    amount = "$10",
    account = "",
  } = route.params || {};

  // =====================================
  // TODO:
  // Backend Placeholder
  //
  // Validate recharge request
  //
  // Verify account balance
  //
  // Calculate charges
  // =====================================

  const handleConfirm = () => {
    // =====================================
    // TODO:
    // Backend Placeholder
    //
    // Submit recharge transaction
    // =====================================

    navigation.navigate("MobileSuccessful", {
      phone,
      amount,
    });
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
          source={require("../../assets/images/mobile-confirm.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.heading}>
          Confirm Recharge
        </Text>

        <Text style={styles.subText}>
          Please confirm the recharge
          details before proceeding.
        </Text>

        {/* Details Card */}

        <View style={styles.card}>
          {/* temporarily remove this to match the figma design */}
          {/* <View style={styles.row}>
            <Text style={styles.left}>Account</Text>
            <Text style={styles.right}>{account}</Text>
          </View>

          <View style={styles.divider} /> */}

          <View style={styles.row}>
            <Text style={styles.left}>
              Phone Number
            </Text>

            <Text style={styles.right}>
              {phone}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.left}>
              Recharge
            </Text>

            <Text style={styles.amount}>
              {amount}
            </Text>
          </View>

                    <View style={styles.divider} />
        </View>

        {/* Confirm Button */}

        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>
            Confirm
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default MobileConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FB",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
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
    width: "100%",
    height: 220,
    marginBottom: 25,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4F46E5",
    textAlign: "center",
    marginBottom: 12,
  },

  subText: {
    textAlign: "center",
    color: "#777",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 35,
    paddingHorizontal: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
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

  left: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },

  right: {
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

  confirmButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#5B5FEF",
    justifyContent: "center",
    alignItems: "center",
  },

  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});