import React from 'react'
import DetailsItem from './DetailsItem'

export async function generateStaticParams() {
  // List all the IDs you want to pre-render
  // For fix the error of the product not found
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

export default function ProductPage() {
  return <DetailsItem />
}
