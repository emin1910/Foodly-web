export const recipeShape = {
  id: "number",
  title: "string",
  category: "string",
  image: "string",
  description: "string",
  ingredients: "array",
  steps: "array",
  isFavorite: "boolean"
}

export const recipeCategories = [
  "Ana Yemek",
  "Vegan",
  "Tatlı",
  "İçecek"
]

export const defaultRecipeImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"