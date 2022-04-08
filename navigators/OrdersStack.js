import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Orders from "../screens/Orders/Orders";
import OrderDetails from "../screens/Orders/OrderDetails";
const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderDetails"
        component={OrderDetails}
      />
    </Stack.Navigator>
  );
};

export default OrdersStack;

const styles = StyleSheet.create({});
