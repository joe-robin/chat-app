'use client'
import { Check, UserPlus } from 'lucide-react'
import { useState } from 'react'

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[]
  sessionId: string
}

export default function FriendRequests({
  incomingFriendRequests,
  sessionId,
}: FriendRequestsProps) {
  const [friendRequests, setFriendRequest] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  )
  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex items-center gap-4">
            <UserPlus className="text-black" />
            <p className="text-lg font-medium">{request.senderEmail}</p>
            <button
              aria-label="accept-friend"
              className="grid h-8 w-8 place-items-center rounded-full bg-indigo-600 transition hover:bg-indigo-700 hover:shadow-md"
            >
              <Check className="h-3/4 w-3/4 font-semibold text-white" />
            </button>
            <button
              aria-label="deny-friend"
              className="grid h-8 w-8 place-items-center rounded-full bg-red-600 transition hover:bg-red-700 hover:shadow-md"
            >
              <Check className="h-3/4 w-3/4 font-semibold text-white" />
            </button>
          </div>
        ))
      )}
    </>
  )
}
