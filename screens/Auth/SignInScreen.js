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
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Formik } from "formik";
import Validator from "email-validator";
const IMAGE_BACKGROUND =
  "https://i.pinimg.com/originals/26/3d/53/263d53ed14ea33255b11d342a25c20d4.jpg";

import * as Yup from "yup";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const loginFormSchema = Yup.object().shape({
  email: Yup.string().email().required("An email address is required"),
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters"),
});

const SignInScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [noUser, setNoUser] = useState(false);

  const signInHandler = async (email, password) => {
    setNoUser(false);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        Keyboard.dismiss();
        setNoUser(true);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <View></View>
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
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 60, fontWeight: "700" }}>
                Welcome
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                padding: 20,
              }}
            >
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginFormSchema}
                validateOnMount={true}
                onSubmit={(values, actions) => {
                  signInHandler(values.email, values.password);
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
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10,
                      }}
                    >
                      {noUser && (
                        <Text style={{ color: "red" }}>That user doesn't exist</Text>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      disabled={loading}
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
                        Log In
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
                        Don't have an account?
                      </Text>
                      <TouchableOpacity
                        disabled={loading}
                        onPress={() => navigation.navigate("SignUpScreen")}
                      >
                        <Text style={{ color: "lightblue" }}>
                          {" "}
                          Sign up now.
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignInScreen;

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
