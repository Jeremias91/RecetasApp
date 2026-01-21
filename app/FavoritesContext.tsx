import React, { createContext, useContext, useState, ReactNode } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface FavoritesContextType {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (idMeal: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  const toggleFavorite = (meal: Meal) => {
    setFavorites((prev) =>
      prev.find((m) => m.idMeal === meal.idMeal)
        ? prev.filter((m) => m.idMeal !== meal.idMeal)
        : [...prev, meal]
    );
  };

  const isFavorite = (idMeal: string) => {
    return favorites.some((m) => m.idMeal === idMeal);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }
  return context;
}
