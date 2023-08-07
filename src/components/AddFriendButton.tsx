'use client'
import { addFriendValidator } from '@/lib/validations/add-friend'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import Button from './ui/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface AddFriendButtonProps {}
type FormDate = z.infer<typeof addFriendValidator>

export default function AddFriendButton(props: AddFriendButtonProps) {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormDate>({
    resolver: zodResolver(addFriendValidator),
  })

  async function addFriend(email: string) {
    try {
      const validateEmail = addFriendValidator.parse({ email })

      await axios.post('/api/friends/add', validateEmail)

      setShowSuccessState(true)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('email', { message: error.message })
        return
      }

      if (error instanceof AxiosError) {
        setError('email', { message: error.response?.data })
        return
      }

      setError('email', { message: 'Something went wrong' })
    }
  }

  function onSubmit(data: FormDate) {
    addFriend(data.email)
  }
  return (
    <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add Friend By email
      </label>
      <div className="mt-2 flex gap-2">
        <input
          {...register('email')}
          type={'text'}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
        <Button>Add</Button>
        <p className="mt-1 text-sm text-red-600">{errors.email?.message}</p>
        {showSuccessState ? (
          <p className="mt-1 text-sm text-green-600">Friend request sent!</p>
        ) : null}
      </div>
    </form>
  )
}
