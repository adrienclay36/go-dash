import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { auth, db } from "../../firebase";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { Formik } from "formik";
import Validator from "email-validator";
const IMAGE_BACKGROUND =
  "https://i.pinimg.com/originals/26/3d/53/263d53ed14ea33255b11d342a25c20d4.jpg";

import * as Yup from "yup";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { GOOGLE_API } from "@env";

import * as Location from "expo-location";

Location.setGoogleApiKey(GOOGLE_API);

const loginFormSchema = Yup.object().shape({
  email: Yup.string().email().required("An email address is required"),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters"),

  displayName: Yup.string().required().min(4, "A display name is required"),
});
const PHOTO_URL =
  "https://img.icons8.com/dusk/344/circled-user-male-skin-type-4.png";
const SignUpScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);

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

  const signUpHandler = async (email, password, displayName) => {
    setLoading(true);
    const permissions = await getLocationPermissions();
    let regionName;
    let locationObj
    if (permissions) {
      const location = await Location.getCurrentPositionAsync();

      regionName = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      locationObj = regionName[0];
    } else {
      regionName = [{
        city: 'San Francisco',
      }];
      locationObj = regionName[0];
    }

    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName,
      photoURL: PHOTO_URL,
    });
    
    try {
      const usersRef = doc(db, "users", auth.currentUser?.email);
      await setDoc(usersRef, {
        email: auth?.currentUser?.email,
        owner_id: auth?.currentUser?.uid,
        displayName: displayName.toLowerCase(),
        photoURL: PHOTO_URL,
        orders: [],
        favorites: [],
        location: [{ ...locationObj, label: "Home" }],
      });
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          source={{ uri: IMAGE_BACKGROUND }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        >
          <View
            style={{
              flex: 0.4,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 60,
                fontWeight: "700",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Sign Up
            </Text>
            <Formik
              initialValues={{ email: "", password: "", displayName: "" }}
              validationSchema={loginFormSchema}
              validateOnMount={true}
              onSubmit={(values, actions) => {
                signUpHandler(
                  values.email,
                  values.password,
                  values.displayName
                );
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
                  <View
                    style={[
                      styles.formControl,
                      {
                        borderColor:
                          1 > values.displayName.length ||
                          values.displayName.length >= 4
                            ? "#ccc"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Display Name"
                      placeholderTextColor={"gray"}
                      autoCapitalize="none"
                      autoComplete="email"
                      value={values.displayName}
                      onChangeText={handleChange("displayName")}
                      onBlur={handleBlur("displayName")}
                      editable={!loading}
                    />
                  </View>

                  <View
                    style={[
                      styles.formControl,
                      {
                        borderColor:
                          values.email.length < 1 ||
                          Validator.validate(values.email)
                            ? "#ccc"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor={"gray"}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      editable={!loading}
                    />
                  </View>

                  <View
                    style={[
                      styles.formControl,
                      {
                        marginBottom: 20,
                        borderColor:
                          1 > values.password.length ||
                          values.password.length >= 6
                            ? "#ccc"
                            : "red",
                      },
                    ]}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor={"gray"}
                      autoCapitalize="none"
                      autoComplete="none"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry={true}
                      editable={!loading}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: "black",
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                      width: Dimensions.get("window").width / 2,
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "600",
                        padding: 20,
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 30,
                        marginBottom: 30,
                      }}
                    >
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignInScreen")}
                    >
                      <Text style={{ color: "lightblue" }}> Log In.</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
  input: {
    padding: 10,
  },
  formControl: {
    borderWidth: 2,
    borderColor: "gray",
    marginBottom: 10,
  },
});
