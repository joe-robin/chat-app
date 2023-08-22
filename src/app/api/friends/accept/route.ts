import { z } from 'zod'
import { authOptions } from '../../../../lib/auth'
import { getServerSession } from 'next-auth'
import { fetchRedis } from '../../../../lib/helpers/redis'
import { db } from '../../../../lib/db'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    if (!session) return new Response('Unauthorized', { status: 401 })

    const { id: idToAdd } = z.object({ id: z.string() }).parse(body)
    const isAlreadyFriend = await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      idToAdd
    )

    if (isAlreadyFriend) return new Response('Already friends', { status: 400 })

    const hasFriendRequests = await fetchRedis(
      'sismember',
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    )

    if (!hasFriendRequests)
      return new Response('Not Friend Request', { status: 400 })

    await db.sadd(`user:${session.user.id}:friends`, idToAdd)

    await db.sadd(`user:${idToAdd}:friends`, session.user.id)

    // await db.srem(
    //   `user:${idToAdd}:outbound_incoming_friend_requests`,
    //   session.user.id
    // )

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd)
    return new Response('ok')
  } catch (error) {
    if (error instanceof z.ZodError)
      return new Response('Invalid request payload', { status: 422 })
    return new Response('Invalid Request', { status: 400 })
  }
}
