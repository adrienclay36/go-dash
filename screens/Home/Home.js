import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import HeaderTabs from "../../components/Home/HeaderTabs";
import SearchBar from "../../components/Home/SearchBar";
import Categories from "../../components/Home/Categories";
import RestaurantItems from "../../components/Home/RestaurantItems";
import { localRestaurants } from "../../components/Home/RestaurantItems";
import BottomTabs from "../../components/BottomTabs";
import { YELP_API_KEY } from "@env";
import { Divider } from "react-native-elements";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";


const Home = ({ navigation }) => {
  const [restaurantData, setRestaurantData] = useState([]);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Delivery");
  const [init, setInit] = useState(true);
  const animationRef = useRef(null);
  const getRestaurants = async (inputCity) => {
    
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${inputCity}&limit=50`;
    
    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    const response = await fetch(yelpUrl, apiOptions);
    const data = await response.json();
    setRestaurantData(
      data.businesses.filter((business) =>
        business.transactions.includes(activeTab.toLowerCase())
      )
    );
    
    
    if(init) {
      setInit(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        animationRef.current.play();
      }, 100);
    }
  }, [loading]);

  const getLocationPermissions = async () => {
    const permissions = await Location.getForegroundPermissionsAsync();
    if (permissions.granted) {
      return true;
    } else if (!permissions.granted && permissions.canAskAgain) {
      const newPermissions = await Location.requestForegroundPermissionsAsync();
      return newPermissions.granted;
    } else {
      return false;
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    const permissions = await getLocationPermissions();
    let regionName;
    if (permissions) {
      const location = await Location.getCurrentPositionAsync();

      regionName = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } else {
      regionName = [
        {
          city: "San Francisco",
        },
      ];
    }
    setCity(regionName[0].city);
    getRestaurants(regionName[0].city);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if(!init) {
      getRestaurants(city);
    }
  }, [city, activeTab])



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
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <StatusBar style="dark" />
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar setCity={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        {loading ? loadingAnimation : <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
