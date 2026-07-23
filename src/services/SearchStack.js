import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import BranchScreen from "../screens/BranchScreen";
import InterestRateScreen from "../screens/InterestRateScreen";
import ExchangeRateScreen from "../screens/ExchangeRateScreen";
import ExchangeScreen from "../screens/ExchangeScreen";

const Stack = createNativeStackNavigator();

const SearchStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchMain" component={SearchScreen} />
    <Stack.Screen name="Branch" component={BranchScreen} />
    <Stack.Screen name="InterestRate" component={InterestRateScreen} />
    <Stack.Screen name="ExchangeRate" component={ExchangeRateScreen} />
    <Stack.Screen name="Exchange" component={ExchangeScreen} />
  </Stack.Navigator>
);

export default SearchStack;