'use client'

import { User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface FriendRequestsSidebarOptionsProps {
  sessionId: string
  initialUnseenRequestCount: number
}

export default function FriendRequestsSidebarOptions({
  sessionId,
  initialUnseenRequestCount,
}: FriendRequestsSidebarOptionsProps) {
  const [unseenRequestCount, setUnseenRequestCout] = useState<number>(
    initialUnseenRequestCount
  )

  return (
    <Link
      href={'/dashboard/requests'}
      className="group flex items-center gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium text-gray-400 group-hover:border-indigo-600 group-hover:text-indigo-600">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend Requests</p>
      {unseenRequestCount > 0 ? (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  )
}