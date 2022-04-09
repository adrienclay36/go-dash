import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const BrowseCard = ({ title, image, navigation, navigationParams }) => {
  return (
    <TouchableOpacity onPress={() => navigation.push('CategoryDetails', navigationParams)}>
      <View style={styles.card}>
        <Image
          source={{ uri: image, height: 75, width: 75 }}
          style={{ alignSelf: "center", marginBottom: 20 }}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BrowseCard;

const styles = StyleSheet.create({
  card: {
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
