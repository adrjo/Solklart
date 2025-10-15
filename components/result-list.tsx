import { City } from "@/stores/City";
import { FlatList, Text, TouchableOpacity } from "react-native";

interface ResultListProps {
    items: Array<City>;
    onItemPress: (item: City) => void;
}

export function ResultList({ items, onItemPress }: ResultListProps) {
    const renderResultItem = (item: any) => {
        const city: City = item.item;
        return (
            <TouchableOpacity onPress={() => {onItemPress(city)}}>
                <Text>{city.name}</Text>
            </TouchableOpacity>
        )
    };


    return (
        <FlatList
            data={items}
            renderItem={(item: any) => renderResultItem(item)}
        />
    )
}