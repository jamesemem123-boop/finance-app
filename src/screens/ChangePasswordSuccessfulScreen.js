import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


import AuthHeader from "../components/AuthHeader";
import AuthCard from "../components/AuthCard";
import GradientButton from "../components/GradientButton";


import { Ionicons } from "@expo/vector-icons";

import COLORS from "../constant/colors";



const ChangePasswordSuccessfulScreen = ({
  navigation,
}) => {



  const handleContinue = () => {


    /*
      BACKEND PLACEHOLDER

      Possible future action:

      - Clear reset session
      - Redirect user to login/home

    */



    navigation.navigate(
      "Login"
    );

  };





  return (

    <SafeAreaView
      style={styles.container}
    >



      <AuthHeader

        title="Successful"

        showBackButton={false}

      />





      <View
        style={styles.content}
      >



        <AuthCard>



          <View
            style={styles.iconContainer}
          >


            <Ionicons

              name="checkmark-circle"

              size={90}

              color={COLORS.success}

            />


          </View>





          <Text
            style={styles.title}
          >

            Password Changed!

          </Text>





          <Text
            style={styles.description}
          >

            Your password has been changed
            successfully.

          </Text>







          <GradientButton


            title="Continue"


            onPress={handleContinue}


          />




        </AuthCard>





      </View>





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

    flex:1,

    justifyContent:"center",

    paddingHorizontal:20,

  },



  iconContainer: {

    alignItems:"center",

    marginBottom:25,

  },



  title: {

    fontSize:24,

    fontWeight:"700",

    color:COLORS.text,

    textAlign:"center",

    marginBottom:12,

  },



  description: {

    fontSize:15,

    color:COLORS.textLight,

    textAlign:"center",

    lineHeight:22,

    marginBottom:30,

  },


});



export default ChangePasswordSuccessfulScreen;