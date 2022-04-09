import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const CategoryDetailsHeader = ({ navigation, route }) => {
  const { category, image } = route?.params;

  return (
    <>
      <View
        style={[
          styles.header,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/344/back.png",
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>{category}</Text>
        <Image source={{ uri: image, height: 30, width: 30 }} />
      </View>
    </>
  );
};

export default CategoryDetailsHeader;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});
