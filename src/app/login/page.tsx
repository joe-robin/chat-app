'use client'

import { FC } from 'react'

interface pageProps {}

export default function Login(props: FC<pageProps>) {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="w-full flex flex-col items-center max-w-md space-y-8">
        <div className="flex flex-col items-center gap-8">logo</div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      {/* <div className="absolute h-96 w-px bg-white">h</div> */}
    </div>
  )
}
