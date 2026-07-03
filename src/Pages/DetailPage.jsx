import { ArrowLeft, Bookmark } from "lucide-react"
import { defaultRecipeImage } from "../Interfaces/recipeShape"


function DetailPage({ recipe, onBack, onToggleFavorite }) {
  if (!recipe) {
    return (
      <main className="min-h-screen bg-[var(--secondary)] flex items-center justify-center">
        <p>Tarif bulunamadı.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[var(--secondary)] flex justify-center">
      <section className="w-full max-w-[430px] min-h-screen bg-[var(--secondary)] pb-10">
        <div className="relative">
          <img
            src={recipe.image || defaultRecipeImage}
            alt={recipe.title}
            onError={(event) => {
              event.currentTarget.onerror = null
              event.currentTarget.src = defaultRecipeImage
            }}
            className="w-full h-[330px] object-cover rounded-b-[36px]"
          />

          <button
            onClick={onBack}
            className="absolute top-6 left-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow"
          >
            <ArrowLeft size={26} />
          </button>

          <button
            onClick={() => onToggleFavorite(recipe.id)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow"
          >
            <Bookmark
              size={26}
              className={
                recipe.isFavorite
                  ? "fill-[var(--primary)] text-[var(--primary)]"
                  : "text-[var(--text-primary)]"
              }
            />
          </button>
        </div>

        <div className="px-6 pt-6">
          <p className="text-[var(--primary)] font-semibold mb-2">
            {recipe.category}
          </p>

          <h1 className="text-[36px] font-bold mb-4">
            {recipe.title}
          </h1>

          <p className="text-[var(--text-secondary)] leading-7 mb-8">
            {recipe.description}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Malzemeler
            </h2>

            <ul className="space-y-3">
              {recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-2xl px-4 py-3 border border-orange-100"
                  >
                    {ingredient}
                  </li>
                ))
              ) : (
                <li className="text-[var(--text-secondary)]">
                  Malzeme eklenmedi.
                </li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">
              Hazırlanış
            </h2>

            <ol className="space-y-3">
              {recipe.steps.length > 0 ? (
                recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="bg-white rounded-2xl px-4 py-3 border border-orange-100 flex gap-3"
                  >
                    <span className="font-bold text-[var(--primary)]">
                      {index + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))
              ) : (
                <li className="text-[var(--text-secondary)]">
                  Hazırlanış adımı eklenmedi.
                </li>
              )}
            </ol>
          </section>
        </div>
      </section>
    </main>
  )
}

export default DetailPage