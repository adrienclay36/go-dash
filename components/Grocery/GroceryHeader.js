import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import ViewGroceryCart from "./ViewGroceryCart";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
const GroceryHeader = ({ navigation }) => {
  const { groceryCart, groceryCartOpen } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  const dispatch = useDispatch();

  const openCart = () => {
    if(groceryCartOpen){
      dispatch({ type: "CLOSE_GROCERY" });

    }
    if(!groceryCartOpen) {
      dispatch({type: 'OPEN_GROCERY'})
    }
  };

  return (
    <>
      <View
        style={{
          height: Dimensions.get("window").height * 0.13,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={openCart}>
          <View>
            {groceryCart.length > 0 && (
              <View style={styles.badge}>
                <Text style={{ color: "white", fontWeight: "600" }}>
                  {groceryCart.length}
                </Text>
              </View>
            )}

            <Image
              source={{
                uri: "https://img.icons8.com/color/344/shopping-basket-2.png",
              }}
              style={{ width: 50, height: 50, marginTop: 30 }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ViewGroceryCart navigation={navigation} hideViewButton={true} />
    </>
  );
};

export default GroceryHeader;

const styles = StyleSheet.create({
  badge: {
    width: 20,
    height: 20,
    position: "absolute",
    right: 2,
    bottom: 30,
    backgroundColor: "red",
    zIndex: 999,
    padding: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
