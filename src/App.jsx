import { useEffect, useState } from "react"
import LoginPage from "./Pages/LoginPage"
import HomePage from "./Pages/HomePage"
import DetailPage from "./Pages/DetailPage"
import { getRecipesFromStorage, saveRecipesToStorage } from "./utils/localStorage"

const USER_KEY = "foodly-user"

function App() {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [currentPage, setCurrentPage] = useState("login")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedRecipes = getRecipesFromStorage()
    const storedUser = localStorage.getItem(USER_KEY)

    setRecipes(storedRecipes)

    if (storedUser) {
      setUser(storedUser)
      setCurrentPage("home")
    }
  }, [])

  function handleLogin(userEmail) {
    localStorage.setItem(USER_KEY, userEmail)
    setUser(userEmail)
    setCurrentPage("home")
  }
  function handleLogout() {
    localStorage.removeItem(USER_KEY)
    setUser(null)
    setSelectedRecipe(null)
    setCurrentPage("login")
  }

  function handleAddRecipe(newRecipe) {
    const updatedRecipes = [newRecipe, ...recipes]

    setRecipes(updatedRecipes)
    saveRecipesToStorage(updatedRecipes)
  }

  function handleUpdateRecipe(updatedRecipe) {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === updatedRecipe.id) {
        return updatedRecipe
      }

      return recipe
    })

    setRecipes(updatedRecipes)
    saveRecipesToStorage(updatedRecipes)

    if (selectedRecipe?.id === updatedRecipe.id) {
      setSelectedRecipe(updatedRecipe)
    }
  }

  function handleDeleteRecipe(recipeId) {
    const isConfirmed = confirm("Bu tarifi silmek istediğine emin misin?")

    if (!isConfirmed) {
      return
    }

    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId)

    setRecipes(updatedRecipes)
    saveRecipesToStorage(updatedRecipes)

    if (selectedRecipe?.id === recipeId) {
      setSelectedRecipe(null)
      setCurrentPage("home")
    }
  }

  function handleViewDetail(recipe) {
    setSelectedRecipe(recipe)
    setCurrentPage("detail")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleBackHome() {
    setCurrentPage("home")
    setSelectedRecipe(null)
  }

  function handleToggleFavorite(recipeId) {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId) {
        return {
          ...recipe,
          isFavorite: !recipe.isFavorite
        }
      }

      return recipe
    })

    setRecipes(updatedRecipes)
    saveRecipesToStorage(updatedRecipes)

    const updatedSelectedRecipe = updatedRecipes.find(
      (recipe) => recipe.id === recipeId
    )

    setSelectedRecipe(updatedSelectedRecipe)
  }

  if (currentPage === "login") {
    return <LoginPage onLogin={handleLogin} />
  }

  if (currentPage === "detail") {
    return (
      <DetailPage
        recipe={selectedRecipe}
        onBack={handleBackHome}
        onToggleFavorite={handleToggleFavorite}
      />
    )
  }

  return (
    <HomePage
      recipes={recipes}
      user={user}
      onAddRecipe={handleAddRecipe}
      onUpdateRecipe={handleUpdateRecipe}
      onDeleteRecipe={handleDeleteRecipe}
      onViewDetail={handleViewDetail}
      onLogout={handleLogout}
    />
  )
}

export default App
