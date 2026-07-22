import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import COLORS from "../constant/colors";

const AuthCard = ({
  children,
  style,
  keyboardAvoiding = true,
}) => {
  const CardContent = (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
        style={styles.wrapper}
      >
        {CardContent}
      </KeyboardAvoidingView>
    );
  }

  return CardContent;
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },

  card: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 28,

    paddingHorizontal: 24,
    paddingVertical: 30,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 6,
  },
});

export default AuthCard;