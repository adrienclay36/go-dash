import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddPlaceHeader = ({ navigation }) => {
  return (
    <View
      style={{
        height: Dimensions.get("window").height * 0.06,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://img.icons8.com/dusk/344/place-marker--v1.png",
          height: 20,
          width: 20,
        }}
      />
    </View>
  );
}

export default AddPlaceHeader

const styles = StyleSheet.create({
    header: {
        height: 300,
    }
})