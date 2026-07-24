import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthHeader from "../components/AuthHeader";
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import GradientButton from "../components/GradientButton";

import COLORS from "../constant/colors";


const ForgotPasswordScreen = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  /*
    BACKEND PLACEHOLDER

    Future logic:

    - Send phone number to database
    - Check registered account
    - Generate OTP
    - Send OTP
    - Navigate to ForgotPasswordScreen2

  */


  const handleContinue = () => {


    setError("");



    if (!phoneNumber.trim()) {

      setError(
        "Phone number is required"
      );

      return;

    }



    setLoading(true);



    // DATABASE/API PLACEHOLDER

    console.log(
      "CHECK PHONE NUMBER:",
      phoneNumber
    );



    setTimeout(() => {


      setLoading(false);



      navigation.navigate(
        "ForgotPassword2",
        {
          phoneNumber,
        }
      );


    },1000);


  };



  return (

    <SafeAreaView style={styles.container}>


      <AuthHeader

        title="Forgot Password"

        onBack={() =>
          navigation.goBack()
        }

      />



      <ScrollView

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.content}

      >


        <AuthCard>


          <View style={styles.textContainer}>


            <Text style={styles.title}>

              Forgot Password?

            </Text>



            <Text style={styles.description}>

              Enter your registered phone number
              to reset your password.

            </Text>


          </View>




          <AuthInput

            label="Phone Number"

            placeholder="Enter phone number"

            keyboardType="phone-pad"

            value={phoneNumber}

            onChangeText={setPhoneNumber}

            error={error}

          />




          <GradientButton

            title="Continue"

            loading={loading}

            onPress={handleContinue}

          />


        </AuthCard>


      </ScrollView>


    </SafeAreaView>

  );

};



const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:COLORS.background,
  },


  content:{
    flexGrow:1,
    justifyContent:"center",
    padding:20,
  },


  textContainer:{
    marginBottom:25,
  },


  title:{
    fontSize:24,
    fontWeight:"700",
    color:COLORS.text,
    textAlign:"center",
    marginBottom:10,
  },


  description:{
    fontSize:15,
    color:COLORS.textLight,
    lineHeight:22,
    textAlign:"center",
  },


});


export default ForgotPasswordScreen;