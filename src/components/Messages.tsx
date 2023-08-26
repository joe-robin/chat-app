'use client'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface MessagesProps {
  initialMessages: Message[]
  sessionId: string
  sessionImg: string | null | undefined
  chatPartner: User
}

export default function Messages({
  initialMessages,
  sessionId,
  sessionImg,
  chatPartner,
}: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const scrollDownRef = useRef<HTMLDivElement | null>(null)
  const formatTimeStamp = (timeStamp: number) => format(timeStamp, 'HH:mm')
  return (
    <div
      id={'messages'}
      className={
        'scrollbar-thumb-blue scrollbar-thumb-rouneded scrollbar-track-blue-lighter scrollbar-w-2 scrollbar-touch flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto'
      }
    >
      <div ref={scrollDownRef} />
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId

        return (
          <div
            className="chat-message"
            key={`${message.id}-${message.timeStamp}`}
          >
            <div
              className={cn('flex items-end', {
                'justify-end': isCurrentUser,
              })}
            >
              <div
                className={cn(
                  'mx-2 flex max-w-xs flex-col space-y-2 text-base',
                  {
                    'order-1 items-end': isCurrentUser,
                    'order-2 items-start': !isCurrentUser,
                  }
                )}
              >
                <span
                  className={cn('inline-block rounded-lg px-4 py-2', {
                    'bg-indigo-600 text-white': isCurrentUser,
                    'bg-gray-200 text-gray-900': !isCurrentUser,
                    'rounded-br-none':
                      !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{' '}
                  <span className="ml-2 text-xs text-gray-300">
                    {formatTimeStamp(message.timeStamp)}
                  </span>
                </span>
              </div>
              <div
                className={cn('relative h-6 w-6', {
                  'order-2': isCurrentUser,
                  'order-1': !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <Image
                  fill
                  src={
                    isCurrentUser ? (sessionImg as string) : chatPartner.image
                  }
                  alt="Profile Picture"
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
