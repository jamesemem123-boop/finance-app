import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";

const CreateCardScreen = () => {

  const navigation = useNavigation();
  const [focused, setFocused] = useState(false);
  const [cardType, setCardType] = useState(null);

  const [validity, setValidity] = useState(null);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={28}
            color="#000"
          />

        </TouchableOpacity>

        <Text style={styles.title}>
          Add Card
        </Text>
      </View>

      <View style={styles.formCard}>

        <Text style={styles.label}>Name</Text>

        <TextInput
          style={[
            styles.input,
            focused && styles.inputFocused,
          ]}
          placeholder="Enter your full name"
          placeholderTextColor="#9CA3AF"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <Text style={styles.label}>Phone Number</Text>

        <TextInput
          style={[
            styles.input,
            focused && styles.inputFocused,
          ]}
          placeholder="Enter your phone number"
          placeholderTextColor="#9CA3AF"
          keyboardType="phone-pad"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <Text style={styles.label}>Email Address</Text>

        <TextInput
          style={[
            styles.input,
            focused && styles.inputFocused,
          ]}
          placeholder="Enter your email address"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <Text style={styles.label}>Home Address</Text>

        <TextInput
          style={[
            styles.input,
            focused && styles.inputFocused,
          ]}
          placeholder="Enter your home address"
          placeholderTextColor="#9CA3AF"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <Text style={styles.label}>Initial Balance</Text>

        <TextInput
          style={[
            styles.input,
            focused && styles.inputFocused,
          ]}

          placeholder="Enter initial balance"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <Text style={styles.label}>Card Type</Text>
        <View style={styles.radioContainer}>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setCardType("visa")}
          >
            <View style={styles.radioOuter}>
              {cardType === "visa" && <View style={styles.radioInner} />}
            </View>

            <Text style={styles.radioText}>Visa Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setCardType("master")}
          >
            <View style={styles.radioOuter}>
              {cardType === "master" && <View style={styles.radioInner} />}
            </View>

            <Text style={styles.radioText}>Mastercard</Text>
          </TouchableOpacity>

        </View>


        <Text style={styles.label}>Card Validity</Text>

        <View style={styles.validityContainer}>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setValidity(1)}
          >
            <View style={styles.radioOuter}>
              {validity === 1 && <View style={styles.radioInner} />}
            </View>

            <Text style={styles.radioText}>1 Year</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setValidity(2)}
          >
            <View style={styles.radioOuter}>
              {validity === 2 && <View style={styles.radioInner} />}
            </View>

            <Text style={styles.radioText}>2 Years</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setValidity(3)}
          >
            <View style={styles.radioOuter}>
              {validity === 3 && <View style={styles.radioInner} />}
            </View>

            <Text style={styles.radioText}>3 Years</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>
            Create Card
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    marginTop: 12,
    marginLeft: 25,
  },
  inputFocused: {
    borderColor: "#3366FF",
    borderWidth: 2,
  },

  input: {
    height: 55,
    borderWidth: 0,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#F0F0F0",
    width: "90%",
    alignSelf: "center",
  },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },

  validityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 35,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3B82F6",
  },

  radioText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#111827",
  },

  createButton: {
    marginTop: 35,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});

export default CreateCardScreen