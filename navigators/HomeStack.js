import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();
import Home from '../screens/Home/Home';
import RestaurantDetail from '../screens/Home/RestaurantDetail';
import OrderCompleted from '../screens/Home/OrderCompleted';
const HomeStack = () => {


    const screenOptions = {
        headerShown: false,
    }
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
      <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
    </Stack.Navigator>
  );
}

export default HomeStack

const styles = StyleSheet.create({})