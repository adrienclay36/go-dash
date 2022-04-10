import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, db } from "../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";

export const localRestaurants = [
  {
    name: "Beachside Bar",
    image_url:
      "https://static.onecms.io/wp-content/uploads/sites/9/2020/04/24/ppp-why-wont-anyone-rescue-restaurants-FT-BLOG0420.jpg",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Benihana",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "India's Grill",
    image_url:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
];

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80";

const RestaurantItems = ({ restaurantData, navigation }) => {
  const userContext = useContext(UserContext);

  return (
    <>
      {restaurantData.map((item, index) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              name: item.name,
              image: item.image_url,
              price: item.price,
              reviews: item.review_count,
              rating: item.rating,
              categories: item.categories,
              coordinates: item.coordinates,
            })
          }
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
        >
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          >
            <RestaurantImage
              image={item.image_url}
              item={item}
              favorites={userContext.favorites}
            />
            <RestaurantInfo
              name={item.name}
              rating={item.rating}
              price={item.price}
            />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

const RestaurantImage = ({ image, item, favorites }) => {
  const foundItem = favorites.some(
    (favorite) => favorite.restaurant.id === item.id
  );

  let displayImage;
  if (image.length) {
    displayImage = image;
  } else {
    displayImage = DEFAULT_IMAGE;
  }
  const addToFavorites = async () => {
    const userRef = doc(db, "users", auth.currentUser?.email);
    await updateDoc(userRef, {
      favorites: arrayUnion({
        restaurant: item,
      }),
    });
  };

  const removeFromFavorites = async () => {
    const userRef = doc(db, "users", auth.currentUser?.email);
    if (favorites.length === 1) {
      await updateDoc(userRef, {
        favorites: [],
      });
    }
    await updateDoc(userRef, {
      favorites: arrayRemove({
        restaurant: item,
      }),
    });
  };
  return (
    <>
      <Image
        source={{
          uri: displayImage,
        }}
        style={{ width: "100%", height: 180 }}
      />
      {foundItem ? (
        <TouchableOpacity
          onPress={removeFromFavorites}
          style={{ position: "absolute", right: 25, top: 25 }}
        >
          <MaterialCommunityIcons name={"heart"} size={30} color="#ed2d53" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={addToFavorites}
          style={{ position: "absolute", right: 25, top: 25 }}
        >
          <MaterialCommunityIcons
            name={"heart-outline"}
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const RestaurantInfo = ({ name, rating, price }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>30-45 &sdot; min</Text>
    </View>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          padding: 1,
          borderRadius: 20,
          backgroundColor: "#00c753",
          margin: 5,
        }}
      >
        <Text
          style={{
            margin: 10,
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {price ? price : '$$'}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#eee",
          height: 30,
          width: 30,
          alignItems: "center",
          borderRadius: 15,
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        <Text>{rating}</Text>
      </View>
    </View>
  </View>
);

export default RestaurantItems;

const styles = StyleSheet.create({});
