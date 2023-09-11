import FriendRequestsSidebarOptions from '@/components/FriendRequestsSidebarOptions'
import { Icon, Icons } from '@/components/Icons'
import SidebarChatList from '@/components/SidebarChatList'
import SignOutButton from '@/components/SignOutButton'
import { authOptions } from '@/lib/auth'
import { getFriendsByUserId } from '@/lib/helpers/get-friends-by-user-id'
import { fetchRedis } from '@/lib/helpers/redis'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
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
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const friends = await getFriendsByUserId(session.user.id)

  const unseenRequestCount = (
    (await fetchRedis(
      'smembers',
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-auto border-r border-gray-200 bg-white px-6">
        <Link href={'/dashboard'} className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-800" />
        </Link>
        {friends.length > 0 ? (
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your Chats
          </div>
        ) : null}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SidebarChatList friends={friends} sessionId={session.user.id} />
            </li>
            <li className="font-semi-bold text-xs leading-6 text-gray-400 ">
              Overview
            </li>

            <li>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOption.map((option) => {
                  const Icon = Icons[option.Icon]
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="group flex gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-black hover:bg-gray-50 hover:text-indigo-700"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600 ">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  )
                })}
                <li>
                  <FriendRequestsSidebarOptions
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>

            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ''}
                    alt="Your Profile Picture"
                  />
                </div>
                <span className="sr-only">Your Profile</span>
                <div className="flex flex-col ">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton />
            </li>
          </ul>
        </nav>
      </div>
      <aside className="container max-h-screen w-full py-16 md:py-12">
        {children}
      </aside>
    </div>
  )
}
