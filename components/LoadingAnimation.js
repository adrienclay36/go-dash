import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const LoadingAnimation = ({ loading, extraMargin, source, speed }) => {
    const animationRef = useRef(null);
  useEffect(() => {
    if (loading) {
      animationRef.current.play();
    } else {
      animationRef.current.reset();
    }
  }, [loading]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: extraMargin ? extraMargin : 0,
      }}
    >
      <LottieView
        speed={speed ? speed : 2}
        style={{ height: 350, width: 350 }}
        source={
          source ? source : require("../assets/animations/motor-loader.json")
        }
        ref={animationRef}
      />
    </SafeAreaView>
  );
};

export default LoadingAnimation;

const styles = StyleSheet.create({});
