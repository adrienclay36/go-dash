import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Grocery from "../screens/Grocery/Grocery";
const Stack = createStackNavigator();
import RestaurantDetail from "../screens/Home/RestaurantDetail";
const GroceryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Image
              source={{
                uri: "https://img.icons8.com/color/344/shopping-basket-2.png",
              }}
              style={{ width: 30, height: 30 }}
            />
          ),
         
        }}
        name="Grocery"
        component={Grocery}
      />
      <Stack.Screen name="GroceryDetail" component={RestaurantDetail} />
    </Stack.Navigator>
  );
};

export default GroceryStack;

const styles = StyleSheet.create({});
