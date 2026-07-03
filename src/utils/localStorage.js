import { initialRecipes } from "../data/initialRecipes"

const STORAGE_KEY = "foodly-recipes"

export function getRecipesFromStorage() {
  const storedRecipes = localStorage.getItem(STORAGE_KEY)

  if (storedRecipes) {
    return JSON.parse(storedRecipes)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRecipes))
  return initialRecipes
}

export function saveRecipesToStorage(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
}