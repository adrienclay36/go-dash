import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Divider } from "react-native-elements";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
const Header = () => {
  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>Your Account</Text>
        <TouchableOpacity onPress={() => signOut(auth)}>
          <Image source={{ uri: 'https://img.icons8.com/color/344/shutdown--v1.png'}} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </View>
      <Divider width={0.5} orientation="vertical" />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginVertical: 20,
  },
});
