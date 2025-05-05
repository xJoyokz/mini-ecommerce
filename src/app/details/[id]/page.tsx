import DetailsItem from './DetailsItem'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <DetailsItem id={params?.id} />
}
