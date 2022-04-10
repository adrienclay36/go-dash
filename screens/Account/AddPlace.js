import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AddPlaceForm from "../../components/Account/AddPlaceForm";

const AddPlace = ({ navigation }) => {
  return (

    <View>
        <AddPlaceForm navigation={navigation} />
    </View>

  );
};

export default AddPlace;

const styles = StyleSheet.create({

});
