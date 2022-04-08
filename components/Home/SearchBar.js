import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { PLACES_API_KEY } from "@env";
const SearchBar = ({ setCity }) => {
  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <GooglePlacesAutocomplete
        query={{ key: PLACES_API_KEY }}
        onPress={(data, details = null) => {
          const city = data.description.split(",")[0];
          setCity(city);
        }}
        placeholder="Search"
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24} />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 8,
              backgroundColor: "white",
              alignItems: "center",
              padding: 9,
              borderRadius: 30,
            }}
          >
            <AntDesign
              style={{ marginRight: 6 }}
              name="clockcircle"
              size={11}
            />
            <Text>Search</Text>
          </View>
        )}
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
          },
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
