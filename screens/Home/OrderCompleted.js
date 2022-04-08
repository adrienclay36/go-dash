import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import MenuItems from "../../components/RestaurantDetail/MenuItems";
import { db, auth } from "../../firebase";
import {
  getDocs,
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { ScrollView } from "react-native-gesture-handler";
const OrderCompleted = ({ navigation, route }) => {
  const animationOneRef = useRef(null);
  const animationTwoRef = useRef(null);
  const { restaurantName, totalUSD } = route.params;
  const [lastOrder, setLastOrder] = useState({
    items: [
      {
        title: "Bologna",
        description: "with butter lettuce, tomato and sauce bechamel",
        price: "$13.50",
        image:
          "https://media.gettyimages.com/photos/pan-fried-duck-picture-id1081422898?s=612x612",
      },
    ],
  });

  const getOrders = async () => {
    const usersRef = doc(db, 'users', auth.currentUser.email);
    const docSnap = await getDoc(usersRef);
    let allOrders;
    if(docSnap.exists()) {
      allOrders = docSnap.data().orders;
      allOrders.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
      setLastOrder(allOrders[0]);
    }
  };

  useEffect(() => {
    getOrders();
    setTimeout(() => {
      animationOneRef.current?.play();
      animationTwoRef.current?.play();
      
    }, 300);
    return () => {
      animationOneRef.current?.reset();
      animationTwoRef.current?.reset();
    };
  }, []);



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ margin: 15, alignItems: "center", height: "100%" }}>
        <LottieView
          ref={animationOneRef}
          style={{
            height: 100,
            width: 100,
            alignSelf: "center",
            marginBottom: 30,
          }}
          speed={0.5}
          source={require("../../assets/animations/check-mark.json")}
          autoPlay
          loop={false}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Your order at {restaurantName} has been placed for {totalUSD}
        </Text>
        <ScrollView>
          <MenuItems
            hideCheckbox={true}
            marginLeft={30}
            foods={lastOrder.items}
            hidecheckbox={true}
          />
        </ScrollView>
          <LottieView
            ref={animationTwoRef}
            style={{
              height: 200,
              alignSelf: "center",
              marginBottom: 30,
            }}
            speed={0.5}
            source={require("../../assets/animations/cooking.json")}
            autoPlay
            loop={false}
          />
      </View>
    </SafeAreaView>
  );
};

export default OrderCompleted;

const styles = StyleSheet.create({});
