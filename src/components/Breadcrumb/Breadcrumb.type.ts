export type BreadcrumbProps = {
  productName?: string
}

export type BreadcrumbItem = {
  label: string
  href: string
  isActive?: boolean
  isBackButton?: boolean
}
