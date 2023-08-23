'use client'

import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'

interface MessagesProps {
  initialMessages: Message[]
  sessionId: string
}

export default function Messages({
  initialMessages,
  sessionId,
}: MessagesProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const scrollDownRef = useRef<HTMLDivElement | null>(null)
  return (
    <div
      id={'messages'}
      className={
        'scrollbar-thumb-blue scrollbar-thumb-rouneded scrollbar-track-blue-lighter scrollbar-w-2 scrollbar-touch flex h-full flex-1 flex-col-reverse gap-4 overflow-y-auto'
      }
    >
      <div ref={scrollDownRef} />
      {messages.map((message, index) => {
        const isCurrentUser = message.id === sessionId
        const hasNextMessageFromUser =
          messages[index - 1].senderId === messages[index].senderId
        return (
          <div key={`${message.id}-${message.timeStamp}`} id={'chat-message'}>
            <div
              className={cn('flex items-end', { 'justify-end': isCurrentUser })}
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
                    'bg-indog-600 text-white': isCurrentUser,
                    'bg-gray-200 text-gray-900': !isCurrentUser,
                    'rounedd-br-none': hasNextMessageFromUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromUser && !isCurrentUser,
                  })}
                >
                  {message.text}{' '}
                  <span className="ml-2 text-xs text-gray-400">
                    {message.timeStamp}
                  </span>
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
