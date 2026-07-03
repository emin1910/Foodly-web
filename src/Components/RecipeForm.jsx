import { useState } from "react"
import { defaultRecipeImage, recipeCategories } from "../interfaces/recipeShape"



function RecipeForm({ onSaveRecipe, onCancel, editingRecipe }) {
  const isEditing = Boolean(editingRecipe)

  const [formData, setFormData] = useState({
    title: editingRecipe?.title || "",
    category: editingRecipe?.category || "Ana Yemek",
    image: editingRecipe?.image || "",
    description: editingRecipe?.description || "",
    ingredients: Array.isArray(editingRecipe?.ingredients)
      ? editingRecipe.ingredients.join(", ")
      : "",
    steps: Array.isArray(editingRecipe?.steps)
      ? editingRecipe.steps.join(", ")
      : ""
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.title.trim()) {
      alert("Lütfen tarif adını gir.")
      return
    }

    const recipeData = {
      id: isEditing ? editingRecipe.id : Date.now(),
      title: formData.title.trim(),
      category: formData.category,
      image: formData.image.trim() || defaultRecipeImage,
      description: formData.description.trim() || "Bu tarif için açıklama eklenmedi.",
      ingredients: formData.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      steps: formData.steps
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      isFavorite: isEditing ? editingRecipe.isFavorite : false
    }

    onSaveRecipe(recipeData)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[28px] border-2 border-[var(--primary)] p-5 mb-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Tarifi Düzenle" : "Yeni Tarif Ekle"}
      </h2>

      <label className="block mb-3">
        <span className="block text-sm font-semibold mb-1">Tarif adı</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Örn: Makarna"
          className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)]"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-sm font-semibold mb-1">Kategori</span>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)]"
        >
        {recipeCategories.map((category) => (
            <option key={category}>
            {category}
          </option>
        ))}
          
        </select>
      </label>

      <label className="block mb-3">
        <span className="block text-sm font-semibold mb-1">Görsel URL</span>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://... veya /images/yemek.jpg"
          className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)]"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-sm font-semibold mb-1">Açıklama</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Kısa tarif açıklaması"
          rows="3"
          className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)] resize-none"
        />
      </label>

      <label className="block mb-3">
        <span className="block text-sm font-semibold mb-1">
          Malzemeler
        </span>
        <input
          type="text"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Un, süt, yumurta"
          className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)]"
        />
      </label>

      <label className="block mb-5">
        <span className="block text-sm font-semibold mb-1">
          Hazırlanış adımları
        </span>
        <input
          type="text"
          name="steps"
          value={formData.steps}
          onChange={handleChange}
          placeholder="Karıştır, pişir, servis et"
          className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:border-[var(--primary)]"
        />
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-[var(--primary)] text-white rounded-xl py-3 font-semibold"
        >
          {isEditing ? "Güncelle" : "Kaydet"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-orange-100 text-[var(--primary)] rounded-xl py-3 font-semibold"
        >
          Vazgeç
        </button>
      </div>
    </form>
  )
}

export default RecipeForm