import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [searchInput, setSearch] = useState("");

  const onGpsClick = () => {
    console.log("click");
  }

  const onSubmit = () => {
    console.log(searchInput);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.outer}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.input}
            placeholder="Sök på en stad eller address..."
            onChangeText={setSearch}
            onSubmitEditing={onSubmit}
          />
          <TouchableOpacity style={styles.gps} onPress={onGpsClick}>
            <Ionicons name="location-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:15,
  },
  container: {
    width: '100%',
    alignItems:'center',
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

    flex: 1,
    flexDirection: 'row'
  },
  input: {
    width: '90%',
    padding:'auto',
  },
  gps: {
    marginRight: 0,
    margin: 'auto'
  }
})
