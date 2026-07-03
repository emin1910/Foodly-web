import { Bookmark, Eye, Pencil, Trash2 } from "lucide-react"
import { defaultRecipeImage } from "../interfaces/recipeShape"



function RecipeCard({ recipe, onDelete, onEdit, onViewDetail }) {
  return (
    <article className="bg-white rounded-[24px] border-2 border-[var(--primary)] overflow-hidden shadow-sm">
      <button
        onClick={() => onViewDetail(recipe)}
        className="w-full text-left"
      >
        <div className="relative">
          <img
              src={recipe.image || defaultRecipeImage}
              alt={recipe.title}
              onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = defaultRecipeImage
            }}
            className="w-full h-[130px] object-cover"
          />

          {recipe.isFavorite && (
            <div className="absolute top-2 right-2 bg-white rounded-full w-9 h-9 flex items-center justify-center shadow">
              <Bookmark
                size={20}
                className="fill-[var(--primary)] text-[var(--primary)]"
              />
           </div>
          )}
        </div>

        <div className="p-3 text-center">
          <h2 className="text-xl font-semibold mb-1">
            {recipe.title}
          </h2>

          <p className="text-sm text-[var(--text-secondary)] mb-3 truncate">
            {recipe.category}
          </p>
        </div>
      </button>

      <div className="px-3 pb-3">
        <button
          onClick={() => onViewDetail(recipe)}
          className="w-full flex items-center justify-center gap-1 bg-orange-50 text-[var(--primary)] rounded-xl py-2 text-sm font-semibold mb-2"
        >
          <Eye size={15} />
          Detay
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(recipe)}
            className="flex-1 flex items-center justify-center gap-1 bg-orange-100 text-[var(--primary)] rounded-xl py-2 text-sm font-semibold"
          >
            <Pencil size={15} />
            Düzenle
          </button>

          <button
            onClick={() => onDelete(recipe.id)}
            className="flex-1 flex items-center justify-center gap-1 bg-[var(--primary)] text-white rounded-xl py-2 text-sm font-semibold"
          >
            <Trash2 size={15} />
            Sil
          </button>
        </div>
      </div>
    </article>
  )
}

export default RecipeCard