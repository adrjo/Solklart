import { favoritesStore } from "@/stores/favorites";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const loadFavorites = favoritesStore(state => state.loadFavorites);

  useEffect(() => {
    loadFavorites();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
