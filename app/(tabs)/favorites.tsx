import { getFlagUrl } from "@/api/flags";
import { City } from "@/models/City";
import { favoritesStore } from "@/stores/favorites";
import { cityStore } from "@/stores/selected-city";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function FavoritesTab() {
    const router = useRouter();

    const favorites = favoritesStore(state => state.favorites);
    const removeFavorite = favoritesStore(state => state.removeFavorite);
    const setSelected = cityStore(state => state.setSelected);

    useEffect(() => {
        const sortedFavorites = [...favorites].sort((c1: City, c2: City) =>
            c1.name.localeCompare(c2.name)
        );
        setSorted(sortedFavorites);
    }, [favorites]);

    const [sorted, setSorted] = useState<City[]>([]);

    const renderFavorite = (city: City) => {
        const flag = getFlagUrl(city.country, 24);

        const handleClick = () => {
            setSelected(city);
            router.replace("/");
        }

        return (
            <Pressable style={styles.cardContainer} onPress={handleClick}>
                <View style={styles.row}>
                    <Image source={{ uri: flag, width: 24, height: 24 }} />
                    <Text style={styles.title}>{city.name}</Text>
                </View>

                <Pressable
                    style={styles.star}
                    onPress={(e) => {
                        e.stopPropagation();
                        removeFavorite(city);
                        setSelected(null);
                    }}
                >
                    <View style={styles.starContainer}>
                        <Ionicons name="star" size={24} color="yellow" />
                        <Ionicons
                            name="star-outline"
                            size={24}
                            color="black"
                            style={styles.starOutline}
                        />
                    </View>
                </Pressable>
            </Pressable>
        )
    }

    return (
        <View style={styles.outer}>
            <View>
                <FlatList
                    data={sorted}
                    renderItem={(item) => renderFavorite(item.item)}
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    outer: {
        margin: 15,
        alignItems: 'center',
    },
    container: {
        marginTop: 80,
    },
    cardContainer: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        elevation: 3,
        //ios
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        shadowRadius: 3,

        width: "100%",
        maxWidth: 400,
        marginBottom: 5,
        flexDirection: "row",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        flex: 1,
    },
    star: {
        padding: 5,
    },
    starContainer: {
        position: 'relative',
        width: 24,
        height: 24,
    },
    starOutline: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
})