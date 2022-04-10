import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const LIST_ITEM_HEIGHT=  96;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * -0.4;

const LocationItem = ({ location, onDismiss, simultaneousHandler }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      if(event.translationX > 0) {
        translateX.value = 0;
      } else {

        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if(isFinished && onDismiss) {
            runOnJS(onDismiss)(location);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rContainerHeightStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    borderWidth: itemHeight.value === 0 ? 0 : 1,
    opacity: opacity.value,
  }))

  const rIconContainerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(translateX.value < TRANSLATE_X_THRESHOLD + 100 ? 1 : 0),
  }))

  return (
    <Animated.View style={[styles.container, rContainerHeightStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <FontAwesome5
          name="trash-alt"
          size={LIST_ITEM_HEIGHT * 0.3}
          color="red"
        />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandler}
        onGestureEvent={panGesture}
      >
        <Animated.View style={[styles.innerContainer, rStyle]}>
          <Image
            source={{
              uri: "https://img.icons8.com/dusk/344/place-marker--v1.png",
            }}
            style={styles.image}
          />
          <View style={{ width: '80%'}}>
            <Text style={styles.label}>{location.label}</Text>
            <Text style={styles.location}>{location?.location}</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default LocationItem;

const styles = StyleSheet.create({
  container: {
    borderColor: "#eee",
    borderWidth: 0.5,
   
  },
  innerContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
  },
  image: { height: 50, width: 50, marginRight: 20 },
  label: { fontSize: 17, fontWeight: "500", marginBottom: 2 },
  location: { color: "gray", fontWeight: "600" },
  iconContainer: {
    height: LIST_ITEM_HEIGHT,
    width: LIST_ITEM_HEIGHT,
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    zIndex: -100,
    justifyContent: "center",
    alignItems: "center",
  },
});
