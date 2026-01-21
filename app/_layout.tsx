import { Stack } from "expo-router";
import React from "react";
import { FavoritesProvider } from "./FavoritesContext";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack
        screenOptions={{
          headerShown: false, // ocultamos el header general
        }}
      >
        {/* Grupo principal de pestañas */}
        <Stack.Screen name="(tabs)" />

        {/* Pantalla de detalle de receta (ruta dinámica) */}
        <Stack.Screen
          name="recipe/[id]"
          options={{
            title: "Detalle de Receta",
            headerShown: true, // mostramos encabezado solo en detalle
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
