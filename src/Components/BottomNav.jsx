import { Bookmark, Home, Play, Search, User } from "lucide-react"

const navItems = [
  {
    id: "search",
    label: "Ara",
    icon: Search
  },
  {
    id: "discover",
    label: "Keşfet",
    icon: Play
  },
  {
    id: "home",
    label: "Ana Sayfa",
    icon: Home
  },
  {
    id: "favorites",
    label: "Favoriler",
    icon: Bookmark
  },
  {
    id: "profile",
    label: "Profil",
    icon: User
  }
]

function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[var(--primary)] rounded-t-[8px] px-7 py-4 flex items-center justify-between">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id

        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center gap-1"
            aria-label={item.label}
            title={item.label}
          >
            <Icon
              size={isActive ? 34 : 28}
              strokeWidth={1.8}
              className={isActive ? "text-white" : "text-[var(--text-primary)]"}
            />

            <span
              className={`text-[11px] ${
                isActive ? "text-white font-semibold" : "text-[var(--text-primary)]"
              }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav