import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { fetchRedis } from '@/lib/helpers/redis'
import { nanoid } from 'nanoid'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const { text, chatId }: { text: string; chatId: string } = await req.json()
    const session = await getServerSession(authOptions)
    const unAutherizedRes = new Response('Unauthroized', { status: 401 })
    if (!session) return unAutherizedRes

    const [userId1, userId2] = chatId.split('--')
    if (session.user.id !== userId1 && session.user.id !== userId2)
      return unAutherizedRes

    const friendId = session.user.id === userId1 ? userId2 : userId1
    const friendList = (await fetchRedis(
      'smembers',
      `user:${session.user.id}:friends`
    )) as string[]
    const isFriend = friendList.includes(friendId)

    if (!isFriend) return unAutherizedRes
    const rawSender = (await fetchRedis(
      'get',
      `user:${session.user.id}`
    )) as string
    const sender = JSON.parse(rawSender) as User

    // All valid send the message
    const timeStamp = Date.now()

    const messageData: Message = {
      id: nanoid(),
      senderId: session.user.id,
      text,
      timeStamp,
    }

    await db.zadd(`chat:${chatId}:messages`, {
      score: timeStamp,
      member: JSON.stringify(messageData),
    })

    return new Response('OK')
  } catch (error) {
    console.log(error)
    if (error instanceof Error)
      return new Response(error.message, { status: 500 })

    return new Response('Internal Server Error', { status: 500 })
  }
}
