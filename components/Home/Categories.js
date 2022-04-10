import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const items = [
  {
    image: require("../../assets/images/shopping-bag.png"),
    text: "All",
    category: 'All',
  },
  {
    image: require("../../assets/images/burgers.png"),
    text: "Burgers",
    category: "restaurants",
  },
  {
    image: require("../../assets/images/pizza.png"),
    text: "Pizza",
    category: "restaurants",
  },
  {
    image: require("../../assets/images/salad.png"),
    text: "Salads",
    category: "restaurants",
  },
  {
    image: require("../../assets/images/steak.png"),
    text: "Steak",
    category: "restaurants",
  },
  {
    image: require("../../assets/images/mexico.png"),
    text: "Mexican",
    category: "restaurants",
  },
  {
    image: require("../../assets/images/italy.png"),
    text: "Italian",
    category: "restaurants",
  },
  {
    image: require("../../assets/images/desserts.png"),
    text: "Desserts",
    category: "restaurants",
  },
  {
    image: require("../../assets/images/bakery.png"),
    text: "Bakery",
    category: "grocery",
  },
  {
    image: require("../../assets/images/supermarket.png"),
    text: "Supermarket",
    category: "grocery",
  },
];

const Categories = ({ setCurrentCategory, itemType }) => {
  const data = items.filter((item) => item.category === itemType || item.category === 'All');
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
        {data.map((item) => (
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
