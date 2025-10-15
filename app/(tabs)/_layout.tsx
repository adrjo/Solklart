import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs initialRouteName="index" screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "bookmarks" : "bookmarks-outline"} color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ? "build" : "build-outline"} color={color} size={size} />
                    )
                }}
            />

        </Tabs>
    )
}