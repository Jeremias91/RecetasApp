import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setResults(data.meals || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar recetas 🍳</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Ej: migas, sushi..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#2b6cb0" style={{ marginTop: 20 }} />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/recipe/${item.idMeal}`)}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.name}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() =>
  !loading ? (
    <Text style={{ textAlign: "center", marginTop: 20 }}>
      No se encontraron resultados.
    </Text>
  ) : null
}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 44,
  },
  button: {
    backgroundColor: "#2b6cb0",
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
});
