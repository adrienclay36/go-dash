import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import Account from "../screens/Account/Account";
import AddPlace from "../screens/Account/AddPlace";
import AddPlaceForm from "../components/Account/AddPlaceForm";
const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={Account}
        name="Account"
      />
      <Stack.Screen
        options={{
          presentation: "modal",
          headerTitle: "New Location",
          header: () => (
            <View style={{ height: Dimensions.get('window').height * .07, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{
                  uri: "https://img.icons8.com/dusk/344/place-marker--v1.png",
                  height: 40,
                  width: 40,
                }}
              />
            </View>
          ),
        }}
        component={AddPlace}
        name="AddPlace"
      />
    </Stack.Navigator>
  );
};

export default AccountStack;

const styles = StyleSheet.create({});
