import { getFlagUrl } from "@/api/flags";
import { getWeatherCity, getWeatherIconUrl } from "@/api/weather";
import { City } from "@/models/City";
import { Weather } from "@/models/Weather";
import { favoritesStore } from "@/stores/favorites";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface ICity {
    city: City;
}

export function ResultItem({ city }: ICity) {
    const [weather, setWeather] = useState<Weather>();

    const [favorited, setFavorited] = useState(false);

    const addFavorite = (city: City) => favoritesStore.getState().addFavorite(city);
    const removeFavorite = (city: City) => favoritesStore.getState().removeFavorite(city);

    const toggleFavorite = () => {
        if (favorited) {
            removeFavorite(city);
        } else {
            addFavorite(city);
        }
        setFavorited(!favorited);
    }

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const fetchedWeather: Weather = await getWeatherCity(city);
                setWeather(fetchedWeather);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
            }
        };

        fetchWeather();
        setFavorited(favoritesStore.getState().isFavorite(city));
    }, [city]);

    if (!weather) {
        return <Text>Loading...</Text>;
    }

    const flag = getFlagUrl(city.country, 24);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Image source={{ uri: flag, width: 24, height: 24 }} />
                <Text style={styles.title}>{city.name}</Text>
            </View>

            <Pressable style={styles.star} onPress={toggleFavorite}>
                <Ionicons name={favorited ? "star" : "star-outline"} size={24} color={favorited ? "yellow" : "black"} />
            </Pressable>

            <View style={styles.row}>
                <Image
                    source={{ uri: getWeatherIconUrl(weather.weather.icon) }}
                    style={styles.icon}
                />
                <View style={styles.tempContainer}>
                    <Text style={styles.temp}>{weather.temp.temp}°</Text>
                    <Text style={styles.condition}>{weather.weather.title}</Text>
                </View>
            </View>

            <View style={styles.details}>
                <Text style={styles.detailText}>
                    Feels like {Math.round(weather.temp.tempFeelsLike)}°
                </Text>
                <Text style={styles.detailText}>
                    H: {weather.temp.tempMax}°  L: {weather.temp.tempMin}°
                </Text>

                {(weather.rainAmt || weather.snowAmt) && (
                    <Text style={styles.detailText}>
                        {weather.rainAmt ? `Rain: ${weather.rainAmt}mm  ` : ""}
                        {weather.snowAmt ? `Snow: ${weather.snowAmt}mm` : ""}
                    </Text>
                )}

                <View style={styles.row}>
                    <Text style={styles.detailText}>
                        ☀️ {weather.sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                    <Text style={styles.detailText}>
                        🌙 {weather.sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        elevation: 3,
        //ios
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,

        maxWidth: 400,
        width: "100%",
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
        color: "#333",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        gap: 15,
    },
    star: {
        position: 'relative',
        right: 10,
        top: -47,
        marginRight: 0,
        margin: 'auto'
    },
    icon: {
        width: 72,
        height: 72,
        marginRight: 10,
    },
    tempContainer: {
        alignItems: "flex-start",
    },
    temp: {
        fontSize: 48,
        fontWeight: "700",
        color: "#222",
    },
    condition: {
        fontSize: 18,
        color: "#555",
        textTransform: "capitalize",
    },
    details: {
        marginTop: 10,
        alignItems: "center",
        gap: 5,
    },
    detailText: {
        fontSize: 15,
        color: "#444",
    },
});