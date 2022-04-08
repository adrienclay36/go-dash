import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import BottomTabs from "./navigators/BottomTabs";
import AuthStack from "./navigators/AuthStack";
import { createStackNavigator } from "@react-navigation/stack";
import StartupScreen from "./screens/Auth/StartupScreen";
const AppStack = createStackNavigator();
import { auth } from "./firebase";
import React, { useState, useEffect } from "react";
const store = configureStore();
import UserContextProvider from "./context/UserContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setLoadingUser(true);
      if (authUser) {
        console.log("AUTH STATE CHANGED:: AUTH SUCCESS");
        setUser(authUser);
        setLoadingUser(false);
      } else {
        console.log("AUTH STATE CHANGED:: NO USER");

        setUser(null);
        setLoadingUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user && loadingUser) {
    return <StartupScreen />;
  }

  return (
    <UserContextProvider>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            {user ? <BottomTabs /> : <AuthStack />}
          </NavigationContainer>
        </SafeAreaProvider>
      </ReduxProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
