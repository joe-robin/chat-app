'use client'
import axios from 'axios'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'
import Button from './ui/Button'

interface ChatInputProps {
  chatPartner: User
  chatId: string
}

export default function ChatInput({ chatPartner, chatId }: ChatInputProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [input, setInput] = useState<string>('')

  const sendMessage = async () => {
    setIsLoading(true)
    try {
      await axios.post('/api/message/send', { text: input, chatId })
      setInput('')
    } catch (error) {
      toast.error('Something went wrong, try again ')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="mb-2 border-t border-gray-200 px-4 pt-4 sm:mb-0">
      <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <TextareaAutosize
          ref={textAreaRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${chatPartner.name}`}
          className="block w-full resize-none border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
        />
        <div
          onClick={() => textAreaRef?.current?.focus()}
          className="pyt-2"
          aria-hidden={true}
        >
          <div className="py-px ">
            <div className="h-9" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex-shrink-0">
            <Button isLoading={isLoading} onClick={sendMessage} type="submit">
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
