import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();
import Browse from '../screens/Browse/Browse';
const BrowseStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Browse" component={Browse}/>
    </Stack.Navigator>
  )
}

export default BrowseStack

const styles = StyleSheet.create({})