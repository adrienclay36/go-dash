import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  collectionGroup,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
const Orders = ({ navigation }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userDoc = doc(db, "users", auth.currentUser?.email);
    const unsub = onSnapshot(userDoc, (docSnap) => {
      console.log("GETTING ORDERS");
      let allOrders = [];
      if (docSnap.exists()) {
        allOrders = docSnap.data().orders;
        allOrders.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });

        setUserOrders(allOrders);
      }
    });
    return () => unsub();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {userOrders?.map((order, index) => (
        <OrderItem
          key={order.createdAt}
          order={order}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

const OrderItem = ({ order, navigation }) => {
  const formatDate = new Date(parseInt(order?.createdAt)).toLocaleDateString(
    "en-US"
  );

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("OrderDetails", { order })}
    >
      <View style={styles.orderItemContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: "https://img.icons8.com/color/344/ok--v1.png" }}
            style={{ height: 50, width: 50 }}
          />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.title}>{order.restaurantName}</Text>
            <Text style={styles.date}>{formatDate}</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 20 }}>
            {order?.total}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Orders;

const styles = StyleSheet.create({
  orderItemContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 20,
    margin: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },
  date: {
    color: "gray",
    fontWeight: "700",
  },
});
