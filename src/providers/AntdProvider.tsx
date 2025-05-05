'use client'

import '@ant-design/v5-patch-for-react-19'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import React from 'react'

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return <AntdRegistry>{children}</AntdRegistry>
}
