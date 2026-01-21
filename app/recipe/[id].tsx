import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useFavorites } from "../FavoritesContext"; 

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
}

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals ? data.meals[0] : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2b6cb0" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text>No se encontró la receta.</Text>
      </View>
    );
  }

  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key) => meal[key]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      {/* ⭐ Botón de favoritos */}
      <TouchableOpacity
        onPress={() => toggleFavorite(meal)}
        style={styles.favoriteButton}
      >
        <Text style={styles.favoriteText}>
          {isFavorite(meal.idMeal) ? "⭐ Quitar de favoritos" : "☆ Agregar a favoritos"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>{meal.strMeal}</Text>

      <Text style={styles.section}>🥕 Ingredientes:</Text>
      {ingredients.map((ing, index) => (
        <Text key={index} style={styles.text}>
          • {ing}
        </Text>
      ))}

      <Text style={styles.section}>📝 Instrucciones:</Text>
      <Text style={styles.text}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 10,
  },
  favoriteButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  favoriteText: {
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 22,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
