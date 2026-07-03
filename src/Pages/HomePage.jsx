import { useState } from "react"
import { CupSoda, IceCreamBowl, Leaf, Plus, Search, Utensils } from "lucide-react"
import CategoryItem from "../components/CategoryItem"
import RecipeCard from "../components/RecipeCard"
import RecipeForm from "../components/RecipeForm"
import BottomNav from "../components/BottomNav"

const categories = [
  {
    id: "Tümü",
    title: "Tümü",
    icon: Utensils
  },
  {
    id: "Ana Yemek",
    title: "Ana Yemek",
    icon: Utensils
  },
  {
    id: "Vegan",
    title: "Vegan",
    icon: Leaf
  },
  {
    id: "Tatlı",
    title: "Tatlı",
    icon: IceCreamBowl
  },
  {
    id: "İçecek",
    title: "İçecek",
    icon: CupSoda
  }
]

function HomePage({
  recipes,
  user,
  onDeleteRecipe,
  onAddRecipe,
  onUpdateRecipe,
  onViewDetail,
  onLogout
}) {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [activeTab, setActiveTab] = useState("home")
  const [searchTerm, setSearchTerm] = useState("")

  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite)

  const homeRecipes =
    selectedCategory === "Tümü"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory)

  const searchedRecipes = recipes.filter((recipe) => {
    const searchValue = searchTerm.toLowerCase()

    return (
      recipe.title.toLowerCase().includes(searchValue) ||
      recipe.category.toLowerCase().includes(searchValue) ||
      recipe.description.toLowerCase().includes(searchValue)
    )
  })

  const discoverRecipes = recipes.slice(0, 4)

  let visibleRecipes = homeRecipes
  let pageTitle = "Tüm Tarifler"
  let emptyMessage = "Henüz tarif bulunamadı."

  if (activeTab === "search") {
    visibleRecipes = searchTerm.trim() ? searchedRecipes : []
    pageTitle = "Tarif Ara"
    emptyMessage = "Aramak için tarif adı, kategori veya açıklama yaz."
  }

  if (activeTab === "discover") {
    visibleRecipes = discoverRecipes
    pageTitle = "Keşfet"
    emptyMessage = "Keşfedilecek tarif bulunamadı."
  }

  if (activeTab === "favorites") {
    visibleRecipes = favoriteRecipes
    pageTitle = "Favoriler"
    emptyMessage = "Henüz favori tarifin yok."
  }

  function handleTabChange(tabName) {
    setActiveTab(tabName)
    setIsFormOpen(false)
    setEditingRecipe(null)

    if (tabName === "home") {
      setSelectedCategory("Tümü")
    }
  }

  function handleOpenAddForm() {
    setEditingRecipe(null)
    setIsFormOpen(true)
    setActiveTab("home")
  }

  function handleEditRecipe(recipe) {
    setEditingRecipe(recipe)
    setIsFormOpen(true)
    setActiveTab("home")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handleSaveRecipe(recipeData) {
    if (editingRecipe) {
      onUpdateRecipe(recipeData)
    } else {
      onAddRecipe(recipeData)
    }

    setIsFormOpen(false)
    setEditingRecipe(null)
    setSelectedCategory("Tümü")
    setActiveTab("home")
  }

  function handleCancelForm() {
    setIsFormOpen(false)
    setEditingRecipe(null)
  }

  return (
    <main className="min-h-screen bg-[var(--secondary)] flex justify-center">
      <section className="relative w-full max-w-[430px] min-h-screen bg-[var(--secondary)] px-6 pt-8 pb-28">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[var(--text-secondary)] mb-1">
              Merhaba, {user}
            </p>

            <h1 className="text-[40px] font-bold">
              Foodly
            </h1>

            <p className="text-[var(--text-secondary)]">
              Bugün ne pişirmek istersin?
            </p>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-white text-[var(--primary)] border border-orange-200 rounded-xl px-4 py-2 text-sm font-semibold"
            >
              Çıkış
            </button>
          )}
        </header>

        {activeTab !== "profile" && (
          <button
            onClick={handleOpenAddForm}
            className="w-full bg-[var(--primary)] text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 mb-6"
          >
            <Plus size={22} />
            Yeni Tarif Ekle
          </button>
        )}

        {isFormOpen && (
          <RecipeForm
            editingRecipe={editingRecipe}
            onSaveRecipe={handleSaveRecipe}
            onCancel={handleCancelForm}
          />
        )}

        {activeTab === "search" && (
          <div className="bg-white rounded-2xl border border-orange-100 px-4 py-3 flex items-center gap-3 mb-6">
            <Search size={22} className="text-[var(--primary)]" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Tarif ara..."
              className="w-full outline-none bg-transparent"
            />
          </div>
        )}

        {activeTab === "home" && (
          <div className="flex gap-6 overflow-x-auto pb-6">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                title={category.title}
                Icon={category.icon}
                isActive={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        )}

        {activeTab === "profile" ? (
          <div className="bg-white rounded-[28px] border-2 border-[var(--primary)] p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">
              Profil
            </h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Foodly hesabınla tariflerini localStorage üzerinde saklıyorsun.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-orange-50 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-[var(--primary)]">
                  {recipes.length}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Toplam Tarif
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-4 text-center">
                <p className="text-3xl font-bold text-[var(--primary)]">
                  {favoriteRecipes.length}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Favori
                </p>
              </div>
            </div>

            <p className="font-semibold mb-2">
              Kullanıcı
            </p>

            <p className="text-[var(--text-secondary)] mb-6">
              {user}
            </p>

            {onLogout && (
              <button
                onClick={onLogout}
                className="w-full bg-[var(--primary)] text-white rounded-2xl py-4 font-semibold"
              >
                Çıkış Yap
              </button>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {pageTitle}
            </h2>

            <div className="grid grid-cols-2 gap-5">
              {visibleRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onDelete={onDeleteRecipe}
                  onEdit={handleEditRecipe}
                  onViewDetail={onViewDetail}
                />
              ))}
            </div>

            {visibleRecipes.length === 0 && (
              <p className="text-center text-[var(--text-secondary)] mt-10">
                {emptyMessage}
              </p>
            )}
          </>
        )}

        <BottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </section>
    </main>
  )
}

export default HomePage