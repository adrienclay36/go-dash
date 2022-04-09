import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Grocery from "../screens/Grocery/Grocery";
const Stack = createStackNavigator();
import GroceryDetail from "../screens/Grocery/GroceryDetail";
import GroceryHeader from "../components/Grocery/GroceryHeader";
import OrderCompleted from "../screens/Home/OrderCompleted";
const GroceryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerShadowVisible: false,
          presentation: "formSheet",
          header: (props) => (
            <GroceryHeader {...props} props={props} route={route} />
          ),
        })}
        name="Grocery"
        component={Grocery}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="GroceryDetail"
        component={GroceryDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderCompleted"
        component={OrderCompleted}
      />
    </Stack.Navigator>
  );
};

export default GroceryStack;

const styles = StyleSheet.create({});
