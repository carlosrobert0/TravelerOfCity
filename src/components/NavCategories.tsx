interface Category {
  id: string
  name: string
}
interface NavCategoriesProps {
  selectedCategory: string | ''
  handleSelectedCategory: (selectedCategory?: string) => void
  categories: Category[]
}

export function NavCategories({
  selectedCategory,
  handleSelectedCategory,
  categories,
}: NavCategoriesProps) {
  return (
    <>
      <nav className="flex h-[38px] w-[539px] items-start justify-between gap-8">
        <button
          onClick={() => handleSelectedCategory('')}
          className={`font-regular font-heebo text-base leading-[26px] text-text ${
            selectedCategory === '' &&
            'font-hoboto font-bold text-title underline decoration-brand-orange underline-offset-[20px]'
          }`}
        >
          Todos
        </button>
        {categories.map((category: any) => (
          <button
            key={category.id}
            onClick={() => handleSelectedCategory(category.id)}
            className={`font-regular font-heebo text-base leading-[26px] text-text ${
              selectedCategory === category.id &&
              'font-hoboto font-bold text-title underline decoration-brand-orange underline-offset-[20px]'
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>
      <hr className="w-[538px] bg-shape_secondary" />
    </>
  )
}
