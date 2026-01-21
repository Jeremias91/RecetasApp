import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFavorites } from "../FavoritesContext";
import { useRouter } from "expo-router";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No tienes recetas guardadas aún.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`/recipe/${item.idMeal}`)}
        >
          <Image source={{ uri: item.strMealThumb }} style={styles.image} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.strMeal}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Text style={{ fontSize: 20 }}>❌ Quitar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
