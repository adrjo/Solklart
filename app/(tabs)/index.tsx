import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import { Animated, Easing, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [searchInput, setSearch] = useState("");

  const position = useRef(new Animated.Value(0)).current; // 0 = center, 1 = top

  const onGpsClick = () => {
    console.log("click");
  }

  const onSubmit = () => {
    console.log(searchInput);


    Animated.timing(position, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }

  const marginTop = position.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "10%"], // start centered, end at the top
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.outer}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.textContainer, { marginTop }]}>
          <TextInput
            style={styles.input}
            placeholder="Sök på en stad eller address..."
            onChangeText={setSearch}
            onSubmitEditing={onSubmit}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.gps} onPress={onGpsClick}>
            <Ionicons name="location-outline" size={32} color="black" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    margin: 15,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    elevation: 3,
    //ios
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .2,
    shadowRadius: 3,

    maxWidth: 400,
    width: '100%',

    flexDirection: 'row'
  },
  input: {
    width: '90%',
    padding: 'auto',
  },
  gps: {
    marginRight: 0,
    margin: 'auto'
  }
})
