import { City } from "@/stores/City";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ResultListProps {
    items: Array<City>;
    onItemPress: (item: City) => void;
}

export function ResultList({ items, onItemPress }: ResultListProps) {
    const renderResultItem = (item: any) => {
        const city: City = item.item;
        return (
            <TouchableOpacity style={styles.item} onPress={() => { onItemPress(city) }}>
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
        maxWidth:400,
        width:'100%',
    },
    item: {
        padding: 15,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    itemText: {
        fontSize: 16,
    },
})