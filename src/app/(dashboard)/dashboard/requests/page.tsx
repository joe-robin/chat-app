import FriendRequests from '@/components/FriendRequests'
import { authOptions } from '@/lib/auth'
import { fetchRedis } from '@/lib/helpers/redis'

import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

export default async function Requests() {
  const session = await getServerSession(authOptions)
  if (!session) return notFound()
  const inccomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as String[]

  const incomingFriendRequests = (await Promise.all(
    inccomingSenderIds.map(async (senderId) => {
      const senderRes = (await fetchRedis('get', `user:${senderId}`)) as string

      const sender = JSON.parse(senderRes)
      return {
        senderId,
        senderEmail: sender.email,
      }
    })
  )) as IncomingFriendRequest[]

  return (
    <main className="pt-8">
      <h1 className="mb-8 text-5xl font-bold">Add a friend</h1>
      <div className="flex flex-col gap-4">
        <FriendRequests
          incomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  )
}
