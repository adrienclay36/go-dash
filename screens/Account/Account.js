import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useCallback, useRef } from "react";
import Header from "../../components/Account/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";
import LocationItem from "../../components/Account/LocationItem";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Octicons from "react-native-vector-icons/Octicons";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { auth, db } from "../../firebase";
const Account = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const scrollRef = useRef(null);

  const onDismiss = useCallback(async (location) => {
    try {
      const userRef = doc(db, "users", auth.currentUser?.email);
      await updateDoc(userRef, {
        location: arrayRemove(location),
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <SafeAreaView
        forceInset={{ top: "always" }}
        style={{ flex: 1, backgroundColor: "#eee" }}
      >
        <Header />
        <ScrollView ref={scrollRef}>
          <View>
            <ProfilePicture />
            <UserInfo />
          </View>

          <View>
            <Text
              style={{
                padding: 10,
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Saved Places
            </Text>
            {userContext.locations.map((location, index) => (
              <LocationItem
                simultaneousHandler={scrollRef}
                onDismiss={onDismiss}
                location={location}
                key={index}
              />
            ))}
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("AddPlace")}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Octicons
                  name="plus"
                  size={20}
                  color="gray"
                  style={{ marginRight: 5 }}
                />
                <Text
                  style={{ color: "gray", fontWeight: "600", fontSize: 18 }}
                >
                  Add Place
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const ProfilePicture = () => (
  <View style={{ alignSelf: "center" }}>
    <Image
      source={{ uri: auth.currentUser?.photoURL }}
      style={{ width: 150, height: 150, borderRadius: 75, marginVertical: 15 }}
    />
  </View>
);

const UserInfo = () => (
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: "700" }}>
        {auth.currentUser?.displayName}
      </Text>
    </View>
  </View>
);

export default Account;

const styles = StyleSheet.create({});
