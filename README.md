# Objetivo del proyecto
El objetivo fue construir una aplicación móvil usando React Native con Expo, que consuma datos de una API pública gratuita. La app conta con tres pantallas y funcionalidades de búsqueda, visualización de detalle y favoritos.

En este caso, la aplicación desarrollada es de Recetas de Cocina, permitiendo:
- Visualizar recetas populares.
- Buscar recetas por nombre.
- Ver detalles completos de cada receta (ingredientes e instrucciones).
- Guardar recetas en favoritos.

API utilizada: TheMealDB (https://www.themealdb.com/api.php)

# Descripción de la Aplicación y Pantallas

## Pantalla de Inicio (Index)
Muestra una lista de recetas populares obtenidas desde la API.
Cada receta se presenta con su imagen y nombre.
Al tocar una receta, se navega a la pantalla de detalle.
Implementa FlatList para renderizado eficiente de listas.

<img src="https://github.com/user-attachments/assets/8919a43e-fa5e-44a5-b7e0-b7993f3bbdc2" width="300">

 
## Pantalla de Búsqueda (Search)
Permite buscar recetas por nombre mediante un TextInput.
Los resultados se muestran en una lista dinámica.
Cada resultado es clickeable para ver el detalle de la receta.

<img src="https://github.com/user-attachments/assets/daf8f9b5-6503-47b8-9770-d771016b3cd6" width="300">

 
## Pantalla de Favoritos (Favorites)
Lista recetas guardadas por el usuario.
Permite eliminar recetas de favoritos.
Mantiene el estado global mediante Context API (FavoritesContext).

<img src="https://github.com/user-attachments/assets/a1c148f3-9fed-458c-aa9f-68b604039d5c" width="300">

 
## Pantalla de Detalle de Receta
Muestra información completa de la receta:
- Imagen
- Nombre
- Ingredientes
- Instrucciones
Permite agregar o quitar la receta de favoritos.

 
 
## Arquitectura de la Aplicación
- Stack Navigator: maneja la navegación general, incluyendo la pantalla de detalle.
- Tabs Navigator: organiza Home, Buscar y Favoritos.
- Context API: mantiene el estado de recetas favoritas en toda la app.
- Expo Router: gestiona rutas dinámicas y tabs.
- Componentes reutilizables: FlatList, Card, Image, TouchableOpacity.

## Estructura de carpetas del proyecto:
/app
  /recipe
    [id].tsx
  (tabs)
    index.tsx
    search.tsx
    favorites.tsx
  _layout.tsx
FavoritesContext.tsx
# Consumo de API
- API: TheMealDB
- Endpoints principales:
  - Listado inicial: search.php?s=
  - Búsqueda por nombre: search.php?s=<query>
  - Detalle de receta: lookup.php?i=<idMeal>
- Manejo de errores básico con .catch() y ActivityIndicator para mostrar carga.
  
## Tecnologías y Librerías Usadas
- React Native: desarrollo multiplataforma.
- Expo: entorno de desarrollo y testing.
- TypeScript: tipado seguro.
- React Navigation / Expo Router: navegación entre pantallas.
- Context API: manejo de estado global para favoritos.
- Ionicons: íconos en la barra de tabs.
 
## Conclusión
La aplicación permite explorar recetas, buscar por nombre y guardar recetas favoritas de manera sencilla e intuitiva.
Se destaca la integración con API externa, manejo de estado global y navegación con tabs y stack.
El uso de React Native con Expo facilita el desarrollo multiplataforma y la implementación de interfaces atractivas y funcionales.
