import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import HomeScreen from "../screens/HomeScreen";
import SearchStack from "../services/SearchStack";
import MessageScreen from "../screens/MessagesScreen";
import SettingsStack from "../services/SettingsStack";
import CustomTabBar from "./CustomTabBar";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ 
        headerShown: false 
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="News" component={MessageScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;