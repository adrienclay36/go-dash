import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { PLACES_API_KEY } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../firebase";
import uuid from "react-native-uuid";
const placeFormSchema = Yup.object().shape({
  line2: Yup.string().optional(),
  label: Yup.string().required().min(1, "A label is required"),
});
import LoadingAnimation from "../LoadingAnimation";
const AddPlaceForm = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const addPlace = async (values) => {
    setLoading(true);
    let finalLocation;
    if (values.line2) {
      finalLocation = `${location}, ${values.line2}`;
    } else {
      finalLocation = location;
    }

    const userRef = doc(db, "users", auth.currentUser?.email);
    try {
      await updateDoc(userRef, {
        location: arrayUnion({
          id: uuid.v4(),
          location: finalLocation,
          label: values.label,
        }),
      });

      navigation.popToTop();
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingAnimation source={require("../../assets/animations/location-loader.json")} extraMargin={Dimensions.get('window').height / 3} loading={loading}/>
  }
  return (
    <KeyboardAvoidingView
      style={{
        height: Dimensions.get("window").height,
        backgroundColor: "white",
      }}
    >
      <View
        style={{ marginTop: 15, flexDirection: "row", marginHorizontal: 10 }}
      >
        <GooglePlacesAutocomplete
          query={{ key: PLACES_API_KEY }}
          onPress={(data, details = null) => {
            setLocation(data.description);
          }}
          onNotFound={() => {
            console.log("not found");
          }}
          placeholder="Search For An Address"
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

      <Formik
        initialValues={{ line2: "", label: "" }}
        validationSchema={placeFormSchema}
        validateOnMount={true}
        onSubmit={(values, actions) => {
          addPlace(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <View style={styles.form}>
            <Text style={styles.label}>Unit Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Apt, Suite Number etc."
                value={values.line2}
                onChangeText={handleChange("line2")}
                onBlur={handleBlur("line2")}
                editable={location.length > 0}
              />
            </View>

            <Text
              style={[styles.label, { color: errors.label ? "red" : "black" }]}
            >
              Address Label
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Home, Work, School, etc."
                value={values.label}
                onChangeText={handleChange("label")}
                onBlur={handleBlur("label")}
                autoComplete={true}
                autoCorrect={true}
                autoCapitalize="words"
                editable={location.length > 0}
              />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  padding: 20,
                  backgroundColor: "black",
                  borderRadius: 40,
                  width: Dimensions.get("window").width * 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{ color: "white", fontWeight: "700", fontSize: 20 }}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default AddPlaceForm;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },
  input: {
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    padding: 5,
  },
});
