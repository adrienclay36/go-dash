import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useContext, useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { UserContext } from "../../context/UserContext";
import { YELP_API_KEY } from "@env";
import RestaurantItems from "../../components/Home/RestaurantItems";
import CategoryDetailsHeader from "../../components/Browse/CategoryDetailsHeader";
const CategoryDetails = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [init, setInit] = useState(true);
  const animationRef = useRef(null);

  const userContext = useContext(UserContext);
  const category = route.params?.category;

  const getCategoryData = async () => {
    setLoading(true);
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=${category}&location=${userContext.location?.city}&limit=50`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    const response = await fetch(yelpUrl, apiOptions);
    const foodData = await response.json();
    setData(foodData.businesses);
    

    if (init) {
      setInit(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        animationRef.current.play();
      }, 100);
    }
  }, [loading]);

  const loadingAnimation = (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        speed={2}
        style={{ height: 350, width: 350 }}
        source={require("../../assets/animations/motor-loader.json")}
        ref={animationRef}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <CategoryDetailsHeader navigation={navigation} route={route}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          loadingAnimation
        ) : (
          <RestaurantItems restaurantData={data} navigation={navigation} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryDetails;

const styles = StyleSheet.create({});
