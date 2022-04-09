import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import MenuItems from "../../components/RestaurantDetail/MenuItems";
import LottieView from 'lottie-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
const OrderDetails = ({ navigation, route }) => {
  const { order } = route.params;
  const formatDate = new Date(parseInt(order.createdAt)).toLocaleDateString(
    "en-US"
  );
  const animationRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      animationRef.current?.play();
    }, 300);
    return () => {
      animationRef.current?.reset();
    };
  }, [])
  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
          marginHorizontal: 20,
        }}
      >
        <View style={{ backgroundColor: 'white', margin: 10, padding: 20, borderRadius: 10, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
            <LottieView ref={animationRef} source={require("../../assets/animations/check-mark.json")} speed={.5} style={{ width: 50, height: 50, marginBottom: 20 }} loop={false}/>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Your Order from {order.restaurantName}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 30 }}>
            on {formatDate}
          </Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: '600', color:'gray',}}>Total: {order.total}</Text>
      </View>
      <MenuItems foods={order.items} hideCheckbox={true} />
    </SafeAreaView>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
