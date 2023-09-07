'use client'
import { Check, UserPlus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[]
  sessionId: string
}

export default function FriendRequests({
  incomingFriendRequests,
  sessionId,
}: FriendRequestsProps) {
  const router = useRouter()
  const [friendRequests, setFriendRequest] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  )
  const acceptFriend = async (senderId: string) => {
    await axios.post('/api/friends/accept', { id: senderId })

    setFriendRequest((prevState) =>
      prevState.filter((request) => request.senderId !== senderId)
    )

    router.refresh()
  }

  const denyFriend = async (senderId: string) => {
    await axios.post('/api/friends/deny', { id: senderId })

    setFriendRequest((prevState) =>
      prevState.filter((request) => request.senderId !== senderId)
    )

    router.refresh()
  }

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    )
    console.log('listening to ', `user:${sessionId}:incoming_friend_requests`)

    const friendRequestHandler = ({
      senderId,
      senderEmail,
    }: IncomingFriendRequest) => {
      setFriendRequest((prev) => [...prev, { senderId, senderEmail }])
    }

    pusherClient.bind('incoming_friend_requests', friendRequestHandler)

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      )
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
    }
  }, [])

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
              onClick={() => acceptFriend(request.senderId)}
            >
              <Check className="h-3/4 w-3/4 font-semibold text-white" />
            </button>
            <button
              aria-label="deny-friend"
              className="grid h-8 w-8 place-items-center rounded-full bg-red-600 transition hover:bg-red-700 hover:shadow-md"
              onClick={() => denyFriend(request.senderId)}
            >
              <X className="h-3/4 w-3/4 font-semibold text-white" />
            </button>
          </div>
        ))
      )}
    </>
  )
}
