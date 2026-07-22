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


const ChangePasswordScreen = ({ navigation }) => {


  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [confirmError, setConfirmError] = useState("");

  const [loading, setLoading] = useState(false);



  /*
      BACKEND PLACEHOLDER

      Expected future logic:

      1. Receive verified user
      2. Update password in database
      3. Encrypt/store new password
      4. Return success response

  */



  const handleChangePassword = () => {


    setPasswordError("");

    setConfirmError("");



    if (!password.trim()) {

      setPasswordError(
        "Please enter a new password"
      );

      return;

    }



    if (password.length < 6) {

      setPasswordError(
        "Password must contain at least 6 characters"
      );

      return;

    }



    if (!confirmPassword.trim()) {

      setConfirmError(
        "Please confirm your password"
      );

      return;

    }



    if (password !== confirmPassword) {

      setConfirmError(
        "Passwords do not match"
      );

      return;

    }



    setLoading(true);



    // DATABASE/API PLACEHOLDER

    console.log(
      "NEW PASSWORD:",
      password
    );



    setTimeout(() => {


      setLoading(false);



      navigation.navigate(
        "ChangePasswordSuccessful"
      );


    },1000);



  };





  return (

    <SafeAreaView
      style={styles.container}
    >



      <AuthHeader

        title="Change Password"

        onBack={() =>
          navigation.goBack()
        }

      />





      <ScrollView

        showsVerticalScrollIndicator={false}

        contentContainerStyle={
          styles.content
        }

      >



        <AuthCard>




          <View
            style={styles.textContainer}
          >


            <Text
              style={styles.title}
            >

              Create New Password

            </Text>



            <Text
              style={styles.description}
            >

              Your new password should be
              different from your previous password.

            </Text>


          </View>





          <AuthInput


            label="New Password"


            placeholder="Enter new password"


            secureTextEntry


            value={password}


            onChangeText={setPassword}


            error={passwordError}


          />






          <AuthInput


            label="Confirm Password"


            placeholder="Confirm new password"


            secureTextEntry


            value={confirmPassword}


            onChangeText={setConfirmPassword}


            error={confirmError}


          />







          <GradientButton


            title="Change Password"


            loading={loading}


            onPress={handleChangePassword}


          />



        </AuthCard>





      </ScrollView>




    </SafeAreaView>

  );

};




const styles = StyleSheet.create({


  container: {

    flex:1,

    backgroundColor:
      COLORS.background,

  },


  content: {

    flexGrow:1,

    justifyContent:"center",

    paddingHorizontal:20,

    paddingBottom:40,

  },


  textContainer: {

    marginBottom:25,

  },


  title: {

    fontSize:24,

    fontWeight:"700",

    color:COLORS.text,

    textAlign:"center",

    marginBottom:10,

  },


  description: {

    fontSize:15,

    color:COLORS.textLight,

    textAlign:"center",

    lineHeight:22,

  },


});


export default ChangePasswordScreen;