import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Linking,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import * as Haptics from "expo-haptics";
const DetailsMap = ({ coordinates, restaurantName }) => {
  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${coordinates.latitude},${coordinates.longitude}`;
  const openMapsUrl = Platform.select({
    ios: `${scheme}${restaurantName}@${latLng}`,
    android: `${scheme}${latLng}(${restaurantName})`,
  });
  const initialRegion = {
    latitude: coordinates.latitude,
    longitude: coordinates.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const openInMapsHandler = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert(
      "Open In Maps?",
      `Do you want to open ${restaurantName} in maps?`,
      [
        { text: "Open", onPress: () => Linking.openURL(openMapsUrl) },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <MapView
      provider={"google"}
      onLongPress={openInMapsHandler}
      collapsable={false}
      initialRegion={initialRegion}
      style={styles.map}
    >
      <Marker coordinate={coordinates} />
    </MapView>
  );
};

export default DetailsMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
