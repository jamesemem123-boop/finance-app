import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const accounts = [
  "1900 8988 5456",
  "1900 8112 5222",
  "4411 0000 1234",
  "1900 8988 5456",
  "1900 8988 5456",
];

const quickAmounts = [10, 50, 100, 150, 200];

const WithdrawalScreen = ({ navigation }) => {
  const [account, setAccount] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // TODO:
  // Fetch user accounts from backend

  // TODO:
  // Fetch wallet/card balance from backend

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    setAmount(`$ ${value}`);
  };

  const handleVerify = () => {
    // TODO:
    // Validate withdrawal request

    // TODO:
    // Submit withdrawal request to backend

    navigation.navigate("WithdrawalSuccessful");
  };

  const isFormValid =
    account.trim() !== "" &&
    phone.trim() !== "" &&
    amount.trim() !== "";

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>

          <Text style={styles.title}>Withdraw</Text>
        </View>

        {/* Illustration */}
        <Image
          source={require("../../assets/images/withdraw.png")}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Account */}
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={[
              styles.inputText,
              !account && { color: "#b0b0b0" },
            ]}
          >
            {account || "Choose account / card"}
          </Text>

          <Ionicons
            name="chevron-down"
            size={22}
            color="#888"
          />
        </TouchableOpacity>

        {/* Balance */}
        {account !== "" && (
          <Text style={styles.balance}>
            Available balance : 10,000$
          </Text>
        )}

        {/* Phone */}
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* Amount Section */}
        <Text style={styles.label}>Choose amount</Text>

        {account === "" ? (
          <View style={styles.amountGrid}>
            {quickAmounts.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.amountBox,
                  selectedAmount === item &&
                    styles.selectedAmountBox,
                ]}
                onPress={() => handleAmountSelect(item)}
              >
                <Text
                  style={[
                    styles.amountText,
                    selectedAmount === item &&
                      styles.selectedAmountText,
                  ]}
                >
                  ${item}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.amountBox}
              onPress={() => {
                setSelectedAmount("other");
                setAmount("");
              }}
            >
              <Text style={styles.amountText}>Other</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        )}

        {/* Verify Button */}
        <TouchableOpacity
          disabled={!isFormValid}
          onPress={handleVerify}
          style={[
            styles.verifyButton,
            !isFormValid && styles.disabledButton,
          ]}
        >
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Account Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons
                name="close"
                size={24}
                color="#777"
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>
              Choose account:
            </Text>

            <FlatList
              data={accounts}
              keyExtractor={(item, index) =>
                index.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.accountRow}
                  onPress={() => {
                    setAccount(`VISA **** **** **** 1234`);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.accountNumber,
                      item === "4411 0000 1234" &&
                        styles.activeAccount,
                    ]}
                  >
                    {item}
                  </Text>

                  {item === "4411 0000 1234" && (
                    <Ionicons
                      name="checkmark"
                      size={22}
                      color="#5C4CF6"
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WithdrawalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8FB",
  },

  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginLeft: 10,
  },

  image: {
    width: "100%",
    height: 220,
    marginBottom: 25,
  },

  inputContainer: {
    height: 56,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  inputText: {
    fontSize: 16,
    color: "#333",
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },

  balance: {
    color: "#4036D9",
    fontWeight: "600",
    marginBottom: 15,
    marginLeft: 4,
  },

  label: {
    color: "#8A8A8A",
    fontWeight: "600",
    marginBottom: 15,
  },

  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  amountBox: {
    width: "30%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  selectedAmountBox: {
    backgroundColor: "#5C4CF6",
  },

  amountText: {
    color: "#8A8A8A",
    fontWeight: "700",
    fontSize: 18,
  },

  selectedAmountText: {
    color: "#fff",
  },

  verifyButton: {
    marginTop: 40,
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5C4CF6",
  },

  disabledButton: {
    backgroundColor: "#E4E4EC",
  },

  verifyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  closeBtn: {
    alignSelf: "flex-end",
  },

  modalTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
    color: "#444",
  },

  accountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },

  accountNumber: {
    fontSize: 18,
    color: "#A5A5A5",
    fontWeight: "600",
  },

  activeAccount: {
    color: "#5C4CF6",
  },
});