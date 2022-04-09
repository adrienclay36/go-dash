import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();
import Browse from '../screens/Browse/Browse';
import CategoryDetails from '../screens/Browse/CategoryDetails';
import RestaurantDetail from '../screens/Home/RestaurantDetail';
import OrderCompleted from '../screens/Home/OrderCompleted';
const BrowseStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Browse"
        component={Browse}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CategoryDetails"
        component={CategoryDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RestaurantDetail"
        component={RestaurantDetail}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OrderCompleted"
        component={OrderCompleted}
      />
    </Stack.Navigator>
  );
}

export default BrowseStack

const styles = StyleSheet.create({})