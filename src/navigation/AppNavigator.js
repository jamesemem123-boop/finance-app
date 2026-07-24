// AppNavigator.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Navigation
import TabNavigator from "./TabNavigator";

// Auth
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ForgotPasswordScreen2 from "../screens/ForgotPasswordScreen2";

// Security & Profile
import AccountScreen from "../screens/AccountScreen";
import ChangePassword from "../screens/ChangePassword";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangePasswordSuccessfulScreen from "../screens/ChangePasswordSuccessfulScreen";
import AppInfoScreen from "../screens/AppInfoScreen";

// Banking & Transactions
import TransferScreen from "../screens/TransferScreen";
import TransferDetailsScreen from "../screens/TransferDetailsScreen";
import TransferSuccessScreen from "../screens/TransferSuccessScreen";
import TransactionReceiptScreen from "../screens/TransactionReceiptScreen";
import TransactionReportScreen from "../screens/TransactionReportScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import WithdrawalScreen from "../screens/WithdrawalScreen";
import WithdrawalSuccessfulScreen from "../screens/WithdrawalSuccessfulScreen";

// Payments & Billing
import ElectricityBillingScreen from "../screens/ElectricityBillingScreen";
import ElectricityBillingConfirmScreen from "../screens/ElectricityBillingConfirmScreen";
import ElectricityBillingSuccessfulScreen from "../screens/ElectricityBillingSuccessfulScreen";
import InternetBillingScreen from "../screens/InternetBillingScreen";
import InternetBillingConfirmScreen from "../screens/InternetBillingConfirmScreen";
import InternetBillingSuccessfulScreen from "../screens/InternetBillingSuccessfulScreen";
import WaterBillingScreen from "../screens/WaterBillingScreen";
import WaterBillingConfirmScreen from "../screens/WaterBillingConfirmScreen";
import WaterBillingSuccessfulScreen from "../screens/WaterBillingSuccessfulScreen";
import MobileRechargeScreen from "../screens/MobileRechargeScreen";
import MobileConfirmScreen from "../screens/MobileConfirmScreen";
import MobileSuccessfulScreen from "../screens/MobileSuccessfulScreen";
import PayBillScreen from "../screens/PayBillScreen";

// Cards & Services
import CardsScreen from "../screens/CardsScreen";
import CreateCardScreen from "../screens/CreateCardScreen";
import ExchangeScreen from "../screens/ExchangeScreen";
import ExchangeRateScreen from "../screens/ExchangeRateScreen";
import BranchScreen from "../screens/BranchScreen";
import InterestRateScreen from "../screens/InterestRateScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Tabs"
                screenOptions={{ headerShown: false }}
            >
                {/* --- Authentication --- */}
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="ForgotPassword2" component={ForgotPasswordScreen2} />

                {/* --- Main App Navigation --- */}
                <Stack.Screen name="Tabs" component={TabNavigator} />

                {/* --- Security & Account --- */}
                <Stack.Screen name="Account" component={AccountScreen} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
                <Stack.Screen name="ChangePasswordSuccessful" component={ChangePasswordSuccessfulScreen} />
                <Stack.Screen name="AppInfo" component={AppInfoScreen} />

                {/* --- Transfers & Transactions --- */}
                <Stack.Screen name="Transfer" component={TransferScreen} />
                <Stack.Screen name="TransferDetails" component={TransferDetailsScreen} />
                <Stack.Screen name="TransferSuccess" component={TransferSuccessScreen} />
                <Stack.Screen name="TransactionReceipt" component={TransactionReceiptScreen} />
                <Stack.Screen name="TransactionReport" component={TransactionReportScreen} />
                <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
                <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
                <Stack.Screen name="WithdrawalSuccessful" component={WithdrawalSuccessfulScreen} />

                {/* --- Billing --- */}
                <Stack.Screen name="PayBill" component={PayBillScreen} />
                <Stack.Screen name="ElectricityBilling" component={ElectricityBillingScreen} />
                <Stack.Screen name="ElectricityBillingConfirm" component={ElectricityBillingConfirmScreen} />
                <Stack.Screen name="ElectricityBillingSuccessful" component={ElectricityBillingSuccessfulScreen} />
                <Stack.Screen name="InternetBilling" component={InternetBillingScreen} />
                <Stack.Screen name="InternetBillingConfirm" component={InternetBillingConfirmScreen} />
                <Stack.Screen name="InternetBillingSuccessful" component={InternetBillingSuccessfulScreen} />
                <Stack.Screen name="WaterBilling" component={WaterBillingScreen} />
                <Stack.Screen name="WaterBillingConfirm" component={WaterBillingConfirmScreen} />
                <Stack.Screen name="WaterBillingSuccessful" component={WaterBillingSuccessfulScreen} />
                <Stack.Screen name="MobileRecharge" component={MobileRechargeScreen} />
                <Stack.Screen name="MobileConfirm" component={MobileConfirmScreen} />
                <Stack.Screen name="MobileSuccessful" component={MobileSuccessfulScreen} />

                {/* --- Services & Info --- */}
                <Stack.Screen name="Cards" component={CardsScreen} />
                <Stack.Screen name="CreateCard" component={CreateCardScreen} />
                <Stack.Screen name="Exchange" component={ExchangeScreen} />
                <Stack.Screen name="ExchangeRate" component={ExchangeRateScreen} />
                <Stack.Screen name="Branch" component={BranchScreen} />
                <Stack.Screen name="InterestRate" component={InterestRateScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;