import { Image, StyleSheet, Text, View , Dimensions} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
const ITEM_HEIGHT = Dimensions.get('window').height * .075;
console.log(ITEM_HEIGHT)
const BrowseCard = ({ title, image, navigation, navigationParams }) => {
  return (
    <TouchableOpacity onPress={() => navigation.push('CategoryDetails', navigationParams)}>
      <View style={styles.card}>
        <Image
          source={{ uri: image, height: ITEM_HEIGHT, width: ITEM_HEIGHT }}
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
