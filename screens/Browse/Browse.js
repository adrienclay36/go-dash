import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { YELP_API_KEY } from "@env";
import Favorites from "../../components/Browse/Favorites";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../firebase";
import BrowseCard from "../../components/Browse/BrowseCard";
import { SafeAreaView } from "react-native-safe-area-context";
const Browse = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const userRef = doc(db, "users", auth.currentUser?.email);
    const snapshot = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedFavorites = snapshot.data().favorites;
        setFavorites(fetchedFavorites);
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ padding: 20}}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Categories</Text>
      </View>
    </SafeAreaView>
  );
};

export default Browse;

const styles = StyleSheet.create({});
