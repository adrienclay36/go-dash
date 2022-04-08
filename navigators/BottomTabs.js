import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tabs = createBottomTabNavigator();
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import HomeStack from "./HomeStack";
import { Divider } from "react-native-elements";
import BrowseStack from "./BrowseStack";
import GroceryStack from "./GroceryStack";
import OrdersStack from "./OrdersStack";
import AccountStack from "./AccountStack";
const BottomTabs = () => {
  return (
    <Tabs.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "gray",
        tabBarInactiveBackgroundColor: "gray",
      }}
    >
      <Tabs.Screen
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="home" color={color} size={26} />
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: "Browse",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" color={color} size={26} />
          ),
        }}
        name="BrowseStack"
        component={BrowseStack}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: "Grocery",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="shopping-bag" color={color} size={26} />
          ),
        }}
        name="GroceryStack"
        component={GroceryStack}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="receipt" color={color} size={26} />
          ),
        }}
        name="OrdersStack"
        component={OrdersStack}
      />
      <Tabs.Screen
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" color={color} size={26} />
          ),
        }}
        name="AccountStack"
        component={AccountStack}
      />
    </Tabs.Navigator>
  );
};

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <>
      <Divider width={1} orientation={"vertical"} />
      <View style={{ backgroundColor: '#eee'}}>
      <View style={{ flexDirection: "row", marginHorizontal: 15, marginTop: 15, marginBottom: 25, justifyContent: 'space-between' }}>
        
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: "center",
                width: '100%',

                
              }}
            >
              <View style={{ marginBottom: 3}}>{options.tabBarIcon(true, 'black', 25)}</View>
              <Text style={{ color: "black" }}>{label}</Text>
            </TouchableOpacity>
          );
        })}
        </View>
      </View>
    </>
  );
}

export default BottomTabs;

const styles = StyleSheet.create({});
