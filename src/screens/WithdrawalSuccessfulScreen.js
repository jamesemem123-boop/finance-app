import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

const WithdrawalSuccessfulScreen = ({ navigation }) => {
  const handleConfirm = () => {
    // ===========================================
    // TODO:
    // Backend Placeholder
    //
    // - Refresh user's wallet/card balance
    // - Refresh transaction history
    // - Fetch latest account details
    // ===========================================

    navigation.navigate("Tabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Illustration */}
        <Image
          source={require("../../assets/images/withdraw.png")}
          resizeMode="contain"
          style={styles.image}
        />

        {/* Title */}
        <Text style={styles.title}>
          Successful withdrawal!
        </Text>

        {/* Message */}
        <Text style={styles.description}>
          You have successfully withdrawn money!
        </Text>

        <Text style={styles.description}>
          Please check the balance in the card
        </Text>

        <Text style={styles.description}>
          management section.
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleConfirm}
        >
          <Text style={styles.buttonText}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WithdrawalSuccessfulScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FB",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    paddingTop: 90,
  },

  image: {
    width: 310,
    height: 220,
    marginBottom: 45,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4338CA",
    marginBottom: 28,
    textAlign: "center",
  },

  description: {
    fontSize: 17,
    color: "#3F3F46",
    textAlign: "center",
    lineHeight: 30,
  },

  button: {
    width: "100%",
    height: 58,
    marginTop: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#5B5FEF",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
});