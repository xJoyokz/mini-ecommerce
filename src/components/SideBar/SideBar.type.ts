export interface Category {
  label: string
  count: number
  value: string
}

export interface SideBarProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}
