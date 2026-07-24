import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const beneficiaries = [
  {
    id: 1,
    name: "Emma",
    image: require("../../assets/images/exchange.svg"),
  },
  {
    id: 2,
    name: "Justin",
    image: require("../../assets/images/exchange.svg"),
  },
];

const quickAmounts = [10, 20, 30];

const MobileRechargeScreen = ({ navigation }) => {
  const [account, setAccount] = useState(
    "VISA **** **** **** 1234"
  );

  const [phone, setPhone] = useState("");

  const [selectedAmount, setSelectedAmount] =
    useState(null);

  const [beneficiary, setBeneficiary] =
    useState(null);

  // ============================================
  // TODO:
  // Backend Placeholder
  //
  // Fetch linked cards/accounts
  //
  // Example:
  // const accounts = await api.getAccounts();
  // ============================================

  // ============================================
  // TODO:
  // Backend Placeholder
  //
  // Fetch user's wallet balance
  // ============================================

  // ============================================
  // TODO:
  // Backend Placeholder
  //
  // Fetch beneficiary list
  // ============================================

  const amount = useMemo(() => {
    if (!selectedAmount) return "";
    return `$${selectedAmount}`;
  }, [selectedAmount]);

  const isValid =
    account &&
    phone.trim() !== "" &&
    selectedAmount !== null;

  const handleConfirm = () => {
    // ============================================
    // TODO:
    // Backend Placeholder
    //
    // Validate recharge
    //
    // Submit recharge request
    //
    // ============================================

    navigation.navigate("MobileConfirm", {
      account,
      phone,
      amount,
      beneficiary,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
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

        {/* Account */}

        <Text style={styles.label}>
          Choose account/ card
        </Text>

        <TouchableOpacity
          style={styles.input}
        >
          <Text style={styles.inputValue}>
            {account}
          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#888"
          />
        </TouchableOpacity>

        <Text style={styles.balance}>
          Available balance : 10,000$
        </Text>

        {/* Directory */}

        <View style={styles.directoryHeader}>
          <Text style={styles.directoryText}>
            Directory
          </Text>

          <TouchableOpacity>
            <Text style={styles.findText}>
              Find beneficiary
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsRow}>
          <TouchableOpacity
            style={styles.addCard}
          >
            <Ionicons
              name="add"
              size={36}
              color="#D4D4D8"
            />
          </TouchableOpacity>

          {beneficiaries.map((item) => {
            const selected =
              beneficiary === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  setBeneficiary(item.id)
                }
                style={[
                  styles.personCard,
                  selected &&
                    styles.selectedPersonCard,
                ]}
              >
                <Image
                  source={item.image}
                  style={styles.avatar}
                />

                <Text
                  style={[
                    styles.personName,
                    selected &&
                      styles.selectedPersonName,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Phone */}

        <Text style={styles.label}>
          Phone number
        </Text>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Phone number"
          placeholderTextColor="#B5B5B5"
          style={styles.phoneInput}
        />

        {/* Amount */}

        <Text style={styles.label}>
          Choose amount
        </Text>

        <View style={styles.amountRow}>
          {quickAmounts.map((item) => {
            const active =
              selectedAmount === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() =>
                  setSelectedAmount(item)
                }
                style={[
                  styles.amountCard,
                  active &&
                    styles.activeAmountCard,
                ]}
              >
                <Text
                  style={[
                    styles.amountText,
                    active &&
                      styles.activeAmountText,
                  ]}
                >
                  ${item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

                <TouchableOpacity
          style={styles.otherAmountCard}
          onPress={() => setSelectedAmount("Other")}
        >
          <Text
            style={[
              styles.amountText,
              selectedAmount === "Other" &&
                styles.activeAmountText,
            ]}
          >
            Other
          </Text>
        </TouchableOpacity>

      {/* Selected Amount */}

      {selectedAmount !== null && (
        <View style={styles.selectedAmountContainer}>
          <Text style={styles.selectedAmountLabel}>
            Selected Amount
          </Text>

          <Text style={styles.selectedAmountValue}>
            {amount}
          </Text>
        </View>
      )}

      {/* Confirm */}

      <TouchableOpacity
        disabled={!isValid}
        onPress={handleConfirm}
        style={[
          styles.confirmButton,
          !isValid && styles.disabledButton,
        ]}
      >
        <Text style={styles.confirmText}>
          Confirm
        </Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
);
};

export default MobileRechargeScreen;

const styles = StyleSheet.create({
container:{
flex:1,
backgroundColor:"#F8F8FB"
},

content:{
paddingHorizontal:24,
paddingTop:60,
paddingBottom:40
},

header:{
flexDirection:"row",
alignItems:"center",
marginBottom:28
},

title:{
fontSize:24,
fontWeight:"700",
marginLeft:12,
color:"#333"
},

label:{
fontSize:15,
fontWeight:"600",
marginBottom:10,
marginTop:10,
color:"#666"
},

input:{
height:56,
backgroundColor:"#fff",
borderRadius:16,
paddingHorizontal:18,
flexDirection:"row",
alignItems:"center",
justifyContent:"space-between",
borderWidth:1,
borderColor:"#ECECEC"
},

inputValue:{
fontSize:16,
fontWeight:"600",
color:"#333"
},

balance:{
marginTop:12,
marginBottom:20,
color:"#5B5FEF",
fontWeight:"600"
},

directoryHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:16
},

directoryText:{
fontWeight:"700",
fontSize:16,
color:"#333"
},

findText:{
fontSize:14,
color:"#5B5FEF",
fontWeight:"600"
},

cardsRow:{
flexDirection:"row",
alignItems:"center",
marginBottom:25
},

addCard:{
width:82,
height:108,
backgroundColor:"#fff",
borderRadius:18,
justifyContent:"center",
alignItems:"center",
marginRight:14
},

personCard:{
width:82,
height:108,
backgroundColor:"#fff",
borderRadius:18,
justifyContent:"center",
alignItems:"center",
marginRight:14
},

selectedPersonCard:{
borderWidth:2,
borderColor:"#5B5FEF"
},

avatar:{
width:54,
height:54,
borderRadius:27,
marginBottom:10
},

personName:{
fontSize:15,
fontWeight:"600",
color:"#666"
},

selectedPersonName:{
color:"#5B5FEF"
},

phoneInput:{
height:56,
backgroundColor:"#fff",
borderRadius:16,
paddingHorizontal:18,
borderWidth:1,
borderColor:"#ECECEC",
fontSize:16,
marginBottom:24
},

amountRow:{
flexDirection:"row",
justifyContent:"space-between",
marginBottom:18
},

amountCard:{
width:"22%",
height:58,
backgroundColor:"#fff",
borderRadius:16,
justifyContent:"center",
alignItems:"center"
},

activeAmountCard:{
backgroundColor:"#5B5FEF"
},

otherAmountCard:{
width:"22%",
height:58,
backgroundColor:"#fff",
borderRadius:16,
justifyContent:"center",
alignItems:"center"
},

amountText:{
fontSize:17,
fontWeight:"700",
color:"#666"
},

activeAmountText:{
color:"#fff"
},

selectedAmountContainer:{
backgroundColor:"#fff",
padding:18,
borderRadius:18,
marginBottom:30,
marginTop:5
},

selectedAmountLabel:{
fontSize:14,
color:"#888",
marginBottom:6
},

selectedAmountValue:{
fontSize:24,
fontWeight:"700",
color:"#5B5FEF"
},

confirmButton:{
height:58,
backgroundColor:"#5B5FEF",
borderRadius:18,
justifyContent:"center",
alignItems:"center"
},

disabledButton:{
backgroundColor:"#CFCFD4"
},

confirmText:{
fontSize:18,
fontWeight:"700",
color:"#fff"
}
});