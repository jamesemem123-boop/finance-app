import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";


import AuthHeader from "../components/AuthHeader";
import AuthCard from "../components/AuthCard";
import AuthInput from "../components/AuthInput";
import GradientButton from "../components/GradientButton";


import COLORS from "../constant/colors";



const ForgotPasswordScreen2 = ({
  navigation,
  route,
}) => {


  const phoneNumber =
    route?.params?.phoneNumber || "";



  const [otp,setOtp] = useState("");

  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);



  /*
      BACKEND PLACEHOLDER

      Future logic:

      - Verify OTP from database
      - Confirm user identity
      - Allow password change

  */



  const handleVerify = () => {


    setError("");



    if(!otp.trim()){

      setError(
        "Verification code required"
      );

      return;

    }



    setLoading(true);



    // DATABASE/API PLACEHOLDER

    console.log(
      "VERIFY OTP:",
      otp
    );



    setTimeout(()=>{


      setLoading(false);



      navigation.navigate(
        "ChangePassword"
      );



    },1000);



  };




  return (

    <SafeAreaView
      style={styles.container}
    >


      <AuthHeader

        title="Verification"

        onBack={() =>
          navigation.goBack()
        }

      />



      <ScrollView

        contentContainerStyle={styles.content}

        showsVerticalScrollIndicator={false}

      >


        <AuthCard>



          <View style={styles.textContainer}>


            <Text style={styles.title}>

              Verification Code

            </Text>



            <Text style={styles.description}>

              Enter the code sent to
              {phoneNumber || " your phone"}

            </Text>


          </View>





          <AuthInput


            label="OTP"


            placeholder="Enter verification code"


            keyboardType="number-pad"


            maxLength={6}


            value={otp}


            onChangeText={setOtp}


            error={error}


          />





          <GradientButton

            title="Verify"

            loading={loading}

            onPress={handleVerify}

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
    textAlign:"center",
    lineHeight:22,
  },


});


export default ForgotPasswordScreen2;