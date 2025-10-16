import { favoritesStore } from "@/stores/favorites";
import { unitStore } from "@/stores/unit";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const loadFavorites = favoritesStore(state => state.loadFavorites);
  const loadUnit = unitStore(state => state.loadUnit);

  useEffect(() => {
    loadFavorites();
    loadUnit();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
