import { StyleSheet, Text, View, Image } from "react-native";
import { auth } from "../../firebase";
import React, { useContext } from "react";
import Header from "../../components/Account/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext } from "../../context/UserContext";
const Account = () => {
  const userContext = useContext(UserContext);
  const formatAddress = `${userContext.location?.name}, ${userContext.location?.city} ${userContext.location?.region}, ${userContext.location?.postalCode}`;
  return (
    <>
      <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1, backgroundColor: "#eee" }}>
        <Header />
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
          <View
            style={{
              borderTopColor: "#ccc",
              borderWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                backgroundColor: "white",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/color/344/home--v1.png",
                }}
                style={{ height: 50, width: 50, marginRight: 20 }}
              />
              <View>
                <Text style={{ fontSize: 17 }}>
                  {userContext.location?.label}
                </Text>
                <Text style={{ color: "gray", fontWeight: "600" }}>
                  {formatAddress}
                </Text>
              </View>
            </View>
          </View>
        </View>
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
