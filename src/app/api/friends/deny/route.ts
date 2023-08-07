import { authOptions } from '../../../../lib/auth'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { fetchRedis } from '../../../../lib/helpers/redis'
import { db } from '../../../../lib/db'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const body = await req.json()

  if (!session) return new Response('Unauthorized', { status: 401 })

  const { id: idToRemove } = z.object({ id: z.string() }).parse(body)
  const isAlreadyFriend = await fetchRedis(
    'sismember',
    `user:${session.user.id}:friends`,
    idToRemove
  )

  if (isAlreadyFriend) return new Response('Already friends', { status: 400 })

  const hasFriendRequests = await fetchRedis(
    'sismember',
    `user:${session.user.id}:incoming_friend_requests`,
    idToRemove
  )

  if (!hasFriendRequests)
    return new Response('Not Friend Request', { status: 400 })

  await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToRemove)
  return new Response('ok')
}
