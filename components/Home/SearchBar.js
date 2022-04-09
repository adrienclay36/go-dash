import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { PLACES_API_KEY } from "@env";
import { TextInput } from "react-native-gesture-handler";
const SearchBar = ({ setCity, setBusiness, business }) => {
  return (
    <>
      <View style={{ marginTop: 15, flexDirection: "row" }}>
        <GooglePlacesAutocomplete
          query={{ key: PLACES_API_KEY }}
          onPress={(data, details = null) => {
            const city = data.description.split(",")[0];
            setCity(city);
          }}
          placeholder="Location"
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
      <View style={styles.textInputContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>

        <Ionicons style={{ marginLeft: 20}} name="restaurant" size={20}/>
        <TextInput
          style={styles.textInput}
          placeholder="Search For A Business"
          onChangeText={(text) => setBusiness(text)}
          value={business}
          />
          </View>
        {business.length > 0 && <Ionicons name="close" size={20} onPress={() => setBusiness('')} />}
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#eee",
    borderRadius: 20,
    fontWeight: "700",
    marginVertical: 3,
    padding: 14,
    width: '80%',
    
  },
  textInputContainer: {
    marginVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
});
