import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { fetchRedis } from '@/lib/helpers/redis'
import { addFriendValidator } from '@/lib/validations/add-friend'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    const { email: emailToAdd } = addFriendValidator.parse(body)

    const idToAdd = (await fetchRedis(
      'get',
      `user:email:${emailToAdd}`
    )) as string

    if (!session) {
      return new Response('Unautherized', { status: 401 })
    }

    if (!idToAdd) {
      return new Response('User not found', { status: 400 })
    }
    if (idToAdd === session.user.id) {
      return new Response('You cannot add yourself as friend', { status: 400 })
    }

    // Check if the user already added
    const isAlreadyAdded = (await fetchRedis(
      'sismemeber',
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1

    // Check if the user already added
    const isAlreadyFriends = (await fetchRedis(
      'sismemeber',
      `user:${idToAdd}:friends`,
      session.user.id
    )) as 0 | 1

    if (isAlreadyAdded)
      return new Response('Already added this user ', { status: 400 })

    if (isAlreadyFriends)
      return new Response('User is already freinds', { status: 400 })

    db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

    return new Response('OK')
  } catch (error) {
    console.log(error)

    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 })
    }
    return new Response('Invalid request', { status: 400 })
  }
}
