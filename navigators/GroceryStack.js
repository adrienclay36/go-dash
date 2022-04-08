import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Grocery from '../screens/Grocery/Grocery';
const Stack = createStackNavigator();
const GroceryStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Grocery" component={Grocery}/>
    </Stack.Navigator>
  )
}

export default GroceryStack

const styles = StyleSheet.create({})