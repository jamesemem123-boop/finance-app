import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "./src/components/ThemeContext";

export default function App() {

  const[fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if(!fontsLoaded){
    return(
      <View 
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return(
    <SafeAreaProvider>
     <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
    </SafeAreaProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});