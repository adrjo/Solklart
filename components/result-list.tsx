import { getFlagUrl } from "@/api/flags";
import { City } from "@/stores/City";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ResultListProps {
    items: Array<City>;
    onItemPress: (item: City) => void;
}

export function ResultList({ items, onItemPress }: ResultListProps) {
    const renderResultItem = (item: any) => {
        const city: City = item.item;
        const flag = getFlagUrl(city.country, 24);
        return (
            <TouchableOpacity style={styles.item} onPress={() => { onItemPress(city) }}>
                <Image source={{ uri: flag, width: 24, height: 24 }} />
                <Text style={styles.itemText}>{city.name}</Text>
            </TouchableOpacity>
        )
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={(item: any) => renderResultItem(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 3,
        //ios
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .2,
        shadowRadius: 3,
        maxWidth: 400,
        width: '100%',
        marginBottom: 15,
    },
    item: {
        flexDirection:'row',
        gap:15,
        padding: 15,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 16,
    },
})