import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import About from "../../components/RestaurantDetail/About";
import { Divider } from "react-native-elements";
import ProductItems from "../../components/Grocery/ProductItems";
import ViewGroceryCart from "../../components/Grocery/ViewGroceryCart";
import DetailsMap from "../../components/RestaurantDetail/DetailsMap";
import LoadingAnimation from "../../components/LoadingAnimation";

const foods = [
  {
    title: "Milk",
    description: "I see you're drinking 1%..",
    price: "$13.50",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgooIjzlwzUj1tnM-ryD9t39sira4U1eZgGIgpLSzLpJcSSD2LyzguiK0BBOYFVeaNv74&usqp=CAU",
  },
  {
    title: "Eggs",
    description: "Quality Farm Raised Eggs. We use the best eggs in the world.",
    price: "$19.20",
    image:
      "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2012/09/FPG_06-EggsCarton_FeaturedImage.jpg",
  },
  {
    title: "Fabric Softener",
    description: "Kevin, I'm going to feed you to my taurantula.",
    price: "$14.50",
    image:
      "https://res.cloudinary.com/mtree/image/upload/w_360,q_auto,f_auto,dpr_auto/Downy_US_MW/5iVVrltkVvrs9uTKe7sbdZ/d2a2774026dfb4e9613b3b4f3039e54c/Downy-Infusions-Calm-Scent-LFC_2x.jpg",
  },
];

const RestaurantDetail = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingAnimation loading={loading} />;
  }

  return (
    <>
      <View style={{ flex: 0.3 }}>
        <DetailsMap
          coordinates={route?.params?.coordinates}
          restaurantName={route?.params?.name}
        />
      </View>
      <View style={{ flex: 1 }}>
        <About route={route} />
        <Divider width={1.8} style={{ marginVertical: 20 }} />
        <ProductItems restaurantName={route.params?.name} foods={foods} />
        <ViewGroceryCart setPageLoading={setLoading} navigation={navigation} />
      </View>
    </>
  );
};

export default RestaurantDetail;

const styles = StyleSheet.create({});
