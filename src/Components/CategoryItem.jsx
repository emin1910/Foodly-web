function CategoryItem({ title, Icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2"
    >
      <div
        className={`w-[72px] h-[72px] rounded-full border flex items-center justify-center transition
        ${
          isActive
            ? "bg-[var(--primary)] border-[var(--primary)] text-white"
            : "bg-white/50 border-[var(--primary)] text-[var(--primary)]"
        }`}
      >
        <Icon size={30} strokeWidth={1.8} />
      </div>

      <span className="text-base font-medium text-[var(--text-primary)]">
        {title}
      </span>
    </button>
  )
}

export default CategoryItem