import { getCities } from "@/api/weather";
import { ResultItem } from "@/components/result-item";
import { ResultList } from "@/components/result-list";
import { City } from "@/stores/City";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import { Alert, Animated, Easing, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [searchInput, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState<Array<City>>([]);
  const [shouldRenderList, setShouldRenderList] = useState(true);

  const [renderedCity, setRenderedCity] = useState<City | null>(null);

  const position = useRef(new Animated.Value(0)).current; // 0 = center, 1 = top
  const marginTop = position.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "10%"], // start centered, end at the top
  });

  const onGpsClick = () => {
    console.log("click");
  }

  const onPress = () => {
    //animate to center of the screen if we're not there already
    Animated.timing(position, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }

  const onSubmit = async () => {
    if (!searchInput.trim()) {
      return;
    }

    //animate to the top of the screen
    Animated.timing(position, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();

    const results: Array<City> = await getCities(searchInput);

    if (results.length == 1) {
      setRenderedCity(results[0]);
      return;
    }

    if (results.length == 0) {
      Alert.alert("No results", "No results found for '" + searchInput + "'");
      return;
    }
    setSearchResults(results);
    setShouldRenderList(true);
  }

  const onItemPress = (city: City) => {
    setRenderedCity(city);
    setShouldRenderList(false);
  }

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
            onPress={onPress}
            onChangeText={setSearch}
            onSubmitEditing={onSubmit}
            returnKeyType="search"
          />
          <TouchableOpacity style={styles.gps} onPress={onGpsClick}>
            <Ionicons name="location-outline" size={32} color="black" />
          </TouchableOpacity>
        </Animated.View>

        {shouldRenderList && searchResults.length > 1 && (
          <ResultList items={searchResults} onItemPress={(city) => onItemPress(city)} />
        )}

        {renderedCity && (
          <ResultItem city={renderedCity} />
        )}


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
