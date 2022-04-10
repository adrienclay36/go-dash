import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider } from "react-native-elements";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
const OrdersHeader = () => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Your Orders</Text>

        <Image
          source={{
            uri: auth.currentUser?.photoURL
              ? auth.currentUser.photoURL
              : "https://img.icons8.com/color/344/shutdown--v1.png",
          }}
          style={{ height: 30, width: 30 }}
        />
      </View>
      <Divider width={0.5} orientation="vertical" />
    </>
  );
};

export default OrdersHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 20,
  },
});
