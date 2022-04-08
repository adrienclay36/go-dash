import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Account from "../screens/Account/Account";
const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={Account}
        name="Account"
      />
    </Stack.Navigator>
  );
};

export default AccountStack;

const styles = StyleSheet.create({});
