import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { UserContext } from "../../context/UserContext";
import { auth, db } from "../../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80";

const GroceryItems = ({ groceryData, navigation }) => {
  const userContext = useContext(UserContext);
  return (
    <>
      {groceryData.map((item, index) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GroceryDetail", {
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
            <RestaurantImage image={item.image_url} item={item} favorites={userContext.favorites} />
            <RestaurantInfo name={item.name} rating={item.rating} isClosed={item.isClosed} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

const RestaurantImage = ({ image, favorites, item }) => {
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

const RestaurantInfo = ({ name, rating, isClosed }) => (
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
      {isClosed ? (
        <View
          style={{ backgroundColor: "#e62538", padding: 10, borderRadius: 15 }}
        >
          <Text style={{ fontSize: 13, color: "white", fontWeight: "700" }}>
            Closed
          </Text>
        </View>
      ) : (
        <View
          style={{ backgroundColor: "#25e685", padding: 10, borderRadius: 15 }}
        >
          <Text style={{ fontSize: 13, color: "white", fontWeight: "700" }}>
            Open
          </Text>
        </View>
      )}
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

export default GroceryItems;

const styles = StyleSheet.create({});
