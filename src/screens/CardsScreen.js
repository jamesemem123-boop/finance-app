import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Linking,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React from 'react'
import VisaCard from "../../assets/images/visaCard.svg";
import MasterCard from "../../assets/images/masterCard.svg";
import { useNavigation } from "@react-navigation/native";



const CardsScreen = () => {

  const navigation = useNavigation();
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
          Card
        </Text>
      </View>

      <View style={styles.cardType}>
        <Text style={styles.titleText}>Card</Text>
      </View>

      <View style={styles.cardContainer}>

        <VisaCard
          width="100%"
          height={320}
        />

        <Text style={styles.cardHolder}>
          James Emem
        </Text>

        <Text style={styles.company}>
          OverBridge Expert
        </Text>

        <Text style={styles.cardNumber}>
          4532 1845 9912 4438
        </Text>

        <Text style={styles.balance}>
          ₦250,000.00
        </Text>

      </View>

      <View style={styles.MasterCardContainer}>

        <MasterCard
          width="100%"
          height={320}
        />

        <Text style={styles.cardHolder}>
          James Emem
        </Text>

        <Text style={styles.company}>
          Amazon Platinium
        </Text>

        <Text style={styles.cardNumber}>
          4532 1845 9912 4438
        </Text>

        <Text style={styles.balance}>
          ₦250,000.00
        </Text>

      </View>

       <TouchableOpacity style = {styles.addcard} 
       onPress = {() => navigation.navigate("CreateCard")}>
        <Text style={styles.CardText}>
          Add card
        </Text>
       </TouchableOpacity>

    </SafeAreaView>
  )
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
    paddingTop: 65,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginLeft: 10,
  },
  cardType: {
    backgroundColor: "#1D4ED8", 
    alignSelf: 'flex-start',    
    borderRadius: 15,           
    paddingHorizontal: 50,
    paddingVertical: 6,
    marginLeft: 40,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
  },
  cardContainer: {
    width: '100%',
    height: 320,
    position: 'relative',
    marginTop: -20,
  },

  MasterCardContainer:{
    width: '100%',
    height: 320,
    position: 'relative',
    marginTop: -80,
  },

  cardHolder: {
    position: 'absolute',
    top: 65,
    left: 55,
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
  },
  company: {
    position: 'absolute',
    top: 135,
    left: 55,

    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  cardNumber: {
    position: 'absolute',
    top: 170,
    left: 55,

    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
  },
  balance: {
    position: 'absolute',
    top: 200,
    left: 55,

    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  addcard:{
    backgroundColor: "#1D4ED8",
    alignSelf: 'center',
    borderRadius: 15,
    paddingHorizontal: 140,
    paddingVertical: 6,
    marginTop: -5,
    
  },
  CardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    padding: 2,
  }
})
export default CardsScreen