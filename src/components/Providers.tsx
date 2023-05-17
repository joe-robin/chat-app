'use clilent'
import React from 'react'
import { Toaster } from 'react-hot-toast'

export interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers(props: ProvidersProps) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {props.children}
    </>
  )
}
