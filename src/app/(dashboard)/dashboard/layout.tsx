// 'use client'
import { Icon, Icons } from '@/components/Icons'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

interface SidebarOption {
  id: number
  name: string
  href: string
  Icon: Icon
}

const sidebarOption: SidebarOption[] = [
  { id: 1, name: 'Add Friend', href: '/dashboard/add', Icon: 'UserPlus' },
]

export default async function Layout({ children }: LayoutProps) {
  const session = getServerSession(authOptions)
  if (!session) notFound()
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-auto border-r border-gray-200 bg-white px-6 dark:bg-gray-800">
        <Link href={'/dashboard'} className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-800" />
        </Link>
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your Chats
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col">
            <li>Our Chats</li>
            <li className="font-semi-bold text-xs leading-6 text-gray-400">
              Overview
            </li>

            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {sidebarOption.map((option) => {
                const Icon = Icons[option.Icon]
                return (
                  <li key={option.id}>
                    <Link
                      href={option.href}
                      className="group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-700"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="truncate">{option.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  )
}
