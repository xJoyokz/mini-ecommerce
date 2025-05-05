import DetailsItem from './DetailsItem'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ProductPage({ params }: Props) {
  return <DetailsItem id={params?.id} />
}
