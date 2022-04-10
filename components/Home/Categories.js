import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const items = [
  {
    image: require("../../assets/images/shopping-bag.png"),
    text: "All",
  },
  {
    image: require("../../assets/images/burgers.png"),
    text: "Burgers",
  },
  {
    image: require("../../assets/images/pizza.png"),
    text: "Pizza",
  },
  {
    image: require("../../assets/images/salad.png"),
    text: "Salads",
  },
  {
    image: require("../../assets/images/steak.png"),
    text: "Steak",
  },
  {
    image: require("../../assets/images/mexico.png"),
    text: "Mexican",
  },
  {
    image: require("../../assets/images/italy.png"),
    text: "Italian",
  },
  {
    image: require("../../assets/images/desserts.png"),
    text: "Desserts",
  },
];

const Categories = ({ setCurrentCategory }) => {
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: "#fff",
        paddingLeft: 20,
        paddingVertical: 10,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.text}
            onPress={() => setCurrentCategory(item.text)}
          >
            <View style={{ alignItems: "center", marginRight: 30 }}>
              <Image
                source={item.image}
                style={{ width: 50, height: 40 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 13, fontWeight: "900" }}>
                {item.text}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
