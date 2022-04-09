import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { auth, db } from "../../firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import OrderItem from "../RestaurantDetail/OrderItem";
import LottieView from "lottie-react-native";
const ViewGroceryCart = ({ navigation, hideViewButton }) => {
  const { groceryCart, restaurantName, groceryCartOpen } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const [modalVisible, setModalVisible] = useState(groceryCartOpen);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      loadingRef.current?.play();
    }, 10);
    return () => {
      loadingRef.current?.reset();
    };
  }, [loading]);

  const total = groceryCart
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);
  const totalUSD = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 20,
      height: 500,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });

  const addOrderToFirebase = async () => {
   
      setModalVisible(false);
      setLoading(true);
      loadingRef.current?.play();
      const userRef = doc(db, "users", auth.currentUser?.email);
      await updateDoc(userRef, {
        orders: arrayUnion({
          items: groceryCart,
          restaurantName: restaurantName,
          createdAt: new Date().getTime().toString(),
          total: totalUSD,
        }),
      });
      dispatch({ type: "CLEAR_GROCERY" });
      navigation.replace("OrderCompleted", { restaurantName, totalUSD });
      setLoading(false);
 
  };

  useEffect(() => {
    if (groceryCartOpen) {
      setModalVisible(true);
    } else if (!groceryCartOpen) {
      setModalVisible(false);
    }
  }, [groceryCartOpen]);

  const checkoutModalContent = (setModalVisible) => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {groceryCart.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalUSD}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 13,
                  width: 300,
                  borderRadius: 30,
                  position: "relative",
                }}
                onPress={addOrderToFirebase}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
                <Text
                  style={{
                    position: "absolute",
                    color: "white",
                    right: 20,
                    fontSize: 15,
                    top: 17,
                  }}
                >
                  {total ? totalUSD : ""}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  dispatch({ type: "CLOSE_GROCERY" });
                  setModalVisible(false);
                }}
                style={{
                  justifyContent: "center",
                  alignItem: "center",
                  backgroundColor: "black",
                  padding: 20,
                  borderRadius: 50,
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Keep Browsing
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent(setModalVisible)}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 20,
            zIndex: 999,
          }}
        >
          {!hideViewButton && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                disabled={loading}
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 15,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ color: "white", fontSize: 20, marginRight: 40 }}>
                  View Cart
                </Text>
                <Text style={{ color: "white", fontSize: 20 }}>{totalUSD}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : null}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            ref={loadingRef}
            source={require("../../assets/animations/scanner.json")}
            style={{ height: 200 }}
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewGroceryCart;
