import { Unit } from "@/models/Unit";
import { unitStore } from "@/stores/unit";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";

export default function SettingsTab() {
    const units = Unit.values();
    const selectUnit = unitStore.getState().selectUnit;

    const [selected, setSelected] = useState(Unit.CELSIUS);
    const router = useRouter();

    useEffect(() => {
        const selectedUnit = unitStore.getState().selectedUnit;
        setSelected(selectedUnit);
    }, []);

    const submit = () => {
        selectUnit(selected);
        // route back home
        router.replace("/");
    }

    return (
        <View style={styles.centered}>
            <Text style={styles.title}>Unit Selection:</Text>
            <View style={styles.dropdownContainer}>
                <Picker
                    mode="dropdown"
                    selectedValue={selected.name}
                    onValueChange={(val) => setSelected(Unit.fromString(val))}
                    style={styles.dropdownInner}
                >
                    {units.map((unit) => (
                        <Picker.Item key={unit.name} label={unit.toString()} value={unit.name} />
                    ))}
                </Picker>

                <Button title="Submit" onPress={() => submit()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdownContainer: {
        borderRadius: 15,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        elevation: 3,

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

        maxWidth: 400,
        width: '95%',
        overflow: 'hidden',
    },
    dropdownInner: {
        borderWidth: 0,
        backgroundColor: 'white',
        marginLeft: 20,
        paddingVertical: Platform.OS === 'android' ? 5 : 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
    },
});