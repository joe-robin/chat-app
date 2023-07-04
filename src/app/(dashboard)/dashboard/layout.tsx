'use client'
import { Icons } from '@/components/Icons'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const session = getServerSession(authOptions)
  if (!session) notFound()
  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-auto border-r border-gray-200 bg-white dark:bg-gray-800 px-6">
        <Link href={'/dashboard'} className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-800" />
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your Chats
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col">
            Our Chats
          </ul>
        </nav>
      </div>
      {children}
    </div>
  )
}
