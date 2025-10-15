import { City } from "@/stores/City";
import { Text } from "react-native";

interface ICity {
    city: City;
}

export function ResultItem({ city }: ICity) {
    return <Text>yep</Text>;
}