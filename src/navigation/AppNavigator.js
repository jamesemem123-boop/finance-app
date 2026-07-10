import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../screens/LandingScreen"
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

import TabNavigator from "./TabNavigator";

import AccountScreen from "../screens/AccountScreen";
import BranchScreen from "../screens/BranchScreen";
import CardsScreen from "../screens/CardsScreen";
import ChangePassword from "../screens/ChangePassword";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangePasswordSuccessfulScreen from "../screens/ChangePasswordSuccessfulScreen";
import CreateCardScreen from "../screens/CreateCardScreen";
import ElectricityBillingConfirmScreen from "../screens/ElectricityBillingConfirmScreen";
import ElectricityBillingScreen from "../screens/ElectricityBillingScreen";
import ElectricityBillingSuccessfulScreen from "../screens/ElectricityBillingSuccessfulScreen";
import ExchangeRateScreen from "../screens/ExchangeRateScreen";
import ExchangeScreen from "../screens/ExchangeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ForgotPasswordScreen2 from "../screens/ForgotPasswordScreen2";
import InterestRateScreen from "../screens/InterestRateScreen";
import InternetBillingConfirmScreen from "../screens/InternetBillingConfirmScreen";
import InternetBillingScreen from "../screens/InternetBillingScreen";
import InternetBillingSuccessfulScreen from "../screens/InternetBillingSuccessfulScreen";
import MobileConfirmScreen from "../screens/MobileConfirmScreen";
import MobileRechargeScreen from "../screens/MobileRechargeScreen";
import MobileSuccessfulScreen from "../screens/MobileSuccessfulScreen";
import PayBillScreen from "../screens/PayBillScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import TransactionReceiptScreen from "../screens/TransactionReceiptScreen";
import TransactionReportScreen from "../screens/TransactionReportScreen";
import TransferMoneyScreen from "../screens/TransferMoneyScreen";
import TransferMoneyScreen2 from "../screens/TransferMoneyScreen2";
import TransferSuccessfulScreen from "../screens/TransferSuccessfulScreen";
import WaterBillingConfirmScreen from "../screens/WaterBillingConfirmScreen";
import WaterBillingScreen from "../screens/WaterBillingScreen";
import WaterBillingSuccessfulScreen from "../screens/WaterBillingSuccessfulScreen";
import WithdrawalScreen from "../screens/WithdrawalScreen";
import WithdrawalSuccessfulScreen from "../screens/WithdrawalSuccessfulScreen";




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Tabs"
                screenOptions={{
                    headerShown: false,
                }}
            >
                {/* Authentication */}
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                />

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />

                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                />

                <Stack.Screen
                    name="ForgotPassword2"
                    component={ForgotPasswordScreen2}
                />


                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePasswordScreen}
                />

                <Stack.Screen
                    name="ChangePasswordSuccessful"
                    component={ChangePasswordSuccessfulScreen}
                />

                {/* Main App */}
                <Stack.Screen
                    name="Tabs"
                    component={TabNavigator}
                />

                {/* Other Screens */}
                <Stack.Screen
                    name="TransactionReport"
                    component={TransactionReportScreen}
                />

                <Stack.Screen
                    name="TransactionReceipt"
                    component={TransactionReceiptScreen}
                />

                <Stack.Screen
                    name="TransferMoney"
                    component={TransferMoneyScreen}
                />

                <Stack.Screen
                    name="TransferMoney2"
                    component={TransferMoneyScreen2}
                />

                <Stack.Screen
                    name="TransferSuccessful"
                    component={TransferSuccessfulScreen}
                />

                <Stack.Screen
                    name="WaterBilling"
                    component={WaterBillingScreen}
                />

                <Stack.Screen
                    name="WaterBillingConfirm"
                    component={WaterBillingConfirmScreen}
                />

                <Stack.Screen
                    name="WaterBillingSuccessful"
                    component={WaterBillingSuccessfulScreen}
                />

                <Stack.Screen
                    name="InternetBilling"
                    component={InternetBillingScreen}
                />

                <Stack.Screen
                    name="InternetBillingConfirm"
                    component={InternetBillingConfirmScreen}
                />

                <Stack.Screen
                    name="InternetBillingSuccessful"
                    component={InternetBillingSuccessfulScreen}
                />

                <Stack.Screen
                    name="ElectricityBilling"
                    component={ElectricityBillingScreen}
                />

                <Stack.Screen
                    name="ElectricityBillingConfirm"
                    component={ElectricityBillingConfirmScreen}
                />

                <Stack.Screen
                    name="ElectricityBillingSuccessful"
                    component={ElectricityBillingSuccessfulScreen}
                />

                <Stack.Screen
                    name="MobileRecharge"
                    component={MobileRechargeScreen}
                />

                <Stack.Screen
                    name="MobileConfirm"
                    component={MobileConfirmScreen}
                />

                <Stack.Screen
                    name="MobileSuccessful"
                    component={MobileSuccessfulScreen}
                />

                <Stack.Screen
                    name="PayBill"
                    component={PayBillScreen}
                />

                <Stack.Screen
                    name="PaymentHistory"
                    component={PaymentHistoryScreen}
                />

                <Stack.Screen
                    name="Withdrawal"
                    component={WithdrawalScreen}
                />

                <Stack.Screen
                    name="WithdrawalSuccessful"
                    component={WithdrawalSuccessfulScreen}
                />

                <Stack.Screen
                    name="CreateCard"
                    component={CreateCardScreen}
                />

                <Stack.Screen
                    name="ExchangeRate"
                    component={ExchangeRateScreen}
                />

                <Stack.Screen
                    name="Exchange"
                    component={ExchangeScreen}
                />

                <Stack.Screen
                    name="Branch"
                    component={BranchScreen}
                />

                <Stack.Screen
                    name="Account"
                    component={AccountScreen}
                />

                <Stack.Screen
                    name="Cards"
                    component={CardsScreen}
                />

                <Stack.Screen
                    name="InterestRate"
                    component={InterestRateScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;