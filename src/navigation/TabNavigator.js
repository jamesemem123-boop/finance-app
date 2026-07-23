import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import MessageScreen from "../screens/MessagesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#787c79",

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }

          else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          }

          else if (route.name === "News") {
            iconName = focused
              ? "mail"
              : "mail-outline";
          }

          else if (route.name === "Settings") {
            iconName = focused ? "settings-sharp" : "settings-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },

        tabBarLabel: ({ focused, color }) =>
          focused ? (
            <Text
              style={{
                color,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {route.name}
            </Text>
          ) : null,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="News"
        component={MessageScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;