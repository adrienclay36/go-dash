import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebase";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BrowseCard from "../../components/Browse/BrowseCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { UserContext } from "../../context/UserContext";
import Carousel from "react-native-snap-carousel";
const Browse = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const isCarousel = useRef(null);

  const renderCategory = (itemData) => {
    return (
      <BrowseCard
        key={itemData.item.category}
        navigation={navigation}
        title={itemData.item.category}
        image={itemData.item.image}
        navigationParams={itemData.item}
      />
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>

      <View>
        <View style={{ paddingHorizontal: 20, marginVertical: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Styles </Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index}
          data={categories}
          horizontal
          renderItem={renderCategory}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View>
        <View style={{ paddingHorizontal: 20, marginVertical: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Establishment Type
          </Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index}
          data={establishments}
          horizontal
          renderItem={renderCategory}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View>
        <View style={{ paddingHorizontal: 20, marginVertical: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Favorites ❤️</Text>
        </View>
        <Carousel
          ref={isCarousel}
          sliderWidth={Dimensions.get("window").width}
          windowSize={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width - 40}
          data={userContext.favorites}
          layout="stack"
          renderItem={(itemData) => (
            <FavoritesCard
              favorites={userContext.favorites}
              key={itemData.item.restaurant.id}
              item={itemData.item.restaurant}
              navigation={navigation}
            />
          )}
        />
      </View>
  </ScrollView>
    </SafeAreaView>
  );
};

const FavoritesCard = ({ item, navigation, favorites }) => {
  const restaurantClosed = item.is_closed;

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
    <TouchableOpacity
      activeOpacity={1}
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
    >
      <View style={{ backgroundColor: "white", borderRadius: 15, margin: 10 }}>
        <TouchableOpacity
          onPress={removeFromFavorites}
          style={{ position: "absolute", zIndex: 999, right: 10, top: 10, }}
        >
          <MaterialCommunityIcons name={"heart"} size={30} color="#ed2d53" />
        </TouchableOpacity>
        <Image
          source={{ uri: item.image_url }}
          style={{
            height: Dimensions.get("window").height * 0.15,
            width: "100%",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 5,
            marginVertical: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", margin: 10 }}>
            {item.name}
          </Text>
          <View
            style={{
              padding: 1,
              borderRadius: 20,
              backgroundColor: restaurantClosed ? "#eb3449" : "#00c753",
              margin: 5,
            }}
          >
            <Text
              style={{
                margin: 10,
                color: "white",
                fontSize: 12,
                fontWeight: restaurantClosed ? "300" : "bold",
              }}
            >
              {item.price ? item.price : '$$'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const categories = [
  {
    category: "Burgers",
    image:
      "https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/344/external-burger-fast-food-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-1.png",
  },
  {
    category: "Salad",
    image: "https://img.icons8.com/color/344/salad.png",
  },
  {
    category: "Pizza",
    image:
      "https://img.icons8.com/external-icongeek26-flat-icongeek26/344/external-pizza-mexican-food-icongeek26-flat-icongeek26.png",
  },
  {
    category: "American",
    image: "https://img.icons8.com/color/344/usa.png",
  },
  {
    category: "SeaFood",
    image:
      "https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/344/external-seafood-cholesterol-photo3ideastudio-lineal-color-photo3ideastudio.png",
  },
  {
    category: "Sushi",
    image: "https://img.icons8.com/officel/344/sushi.png",
  },
  {
    category: "Chicken",
    image:
      "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-chicken-foodies-flaticons-lineal-color-flat-icons.png",
  },
  {
    category: "Italian",
    image: "https://img.icons8.com/color/344/italy-circular.png",
  },
  {
    category: "Mexican",
    image: "https://img.icons8.com/color/344/taco.png",
  },
  {
    category: "Asian",
    image: "https://img.icons8.com/color/344/rice-bowl.png",
  },
  {
    category: "Greek",
    image: "https://img.icons8.com/color/344/greece.png",
  },
  {
    category: "Indian",
    image:
      "https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/344/external-curry-japan-photo3ideastudio-flat-photo3ideastudio.png",
  },
  {
    category: "Vegan",
    image: "https://img.icons8.com/color/344/natural-food.png",
  },
  {
    category: "Healthy",
    image:
      "https://img.icons8.com/external-soft-fill-juicy-fish/344/external-healthy-plant-based-diet-soft-fill-soft-fill-juicy-fish-3.png",
  },
];

export const establishments = [
  {
    category: "Grocery",
    image: "https://img.icons8.com/color/344/stall.png",
  },
  {
    category: "Bakery",
    image: "https://img.icons8.com/color/344/bread.png",
  },
  {
    category: "Coffee",
    image: "https://img.icons8.com/bubbles/344/coffee-to-go.png",
  },
  {
    category: "Boba",
    image:
      "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-boba-world-cuisine-flaticons-lineal-color-flat-icons.png",
  },
  {
    category: "Smoothies",
    image:
      "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/344/external-smoothie-dieting-flaticons-lineal-color-flat-icons.png",
  },
  {
    category: "Tea",
    image:
      "https://img.icons8.com/external-febrian-hidayat-outline-color-febrian-hidayat/344/external-tea-restaurant-febrian-hidayat-outline-color-febrian-hidayat.png",
  },
  {
    category: "Deli",
    image: "https://img.icons8.com/color/344/sandwich.png",
  },
  {
    category: "Brewery",
    image: "https://img.icons8.com/color/344/beer-glass.png",
  },
  {
    category: "Food Trucks",
    image:
      "https://img.icons8.com/external-icongeek26-flat-icongeek26/344/external-food-truck-cafe-icongeek26-flat-icongeek26.png",
  },
  {
    category: "Steakhouse",
    image: "https://img.icons8.com/color/344/steak-medium.png",
  },
  {
    category: "Hibachi Grill",
    image: "https://img.icons8.com/color/344/chef-cooking-skin-type-3.png",
  },
  {
    category: "Bar",
    image: "https://img.icons8.com/color/344/glass-of-whiskey.png",
  },
  {
    category: "Ice Cream",
    image: "https://img.icons8.com/dusk/344/ice-cream-pink-cone.png",
  },
  {
    category: "Dessert",
    image: "https://img.icons8.com/dusk/344/cake.png",
  },
];

export default Browse;

const styles = StyleSheet.create({});
