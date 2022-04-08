import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
const StartupScreen = () => {
 
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <View>
        <Text
          style={{
            textAlign: "right",
            color: "white",
            fontSize: 60,
            textTransform: "uppercase",
            fontWeight: "700",
          }}
        >
          Go
        </Text>
        <Text
          style={{
            color: "#00ba69",
            fontSize: 60,
            textTransform: "uppercase",
            fontWeight: "700",
          }}
        >
          Dash
        </Text>
      </View>
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({});
