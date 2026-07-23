import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/SettingsScreen";
import ChangePassword from "../screens/ChangePassword"; // Or your other ChangePassword screen
import AppInfoScreen from "../screens/AppInfoScreen"; // Or your other AppInfo screen

const Stack = createNativeStackNavigator();

const SettingsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="AppInfo" component={AppInfoScreen} />
    {/* Add other screens that belong to Settings here */}
  </Stack.Navigator>
);

export default SettingsStack;   