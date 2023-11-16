'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import Input from '@/components/Input'
import ImageUploader from '@/components/messages/ImageUploader'
import type { MessageInput } from '@/types/MessageInput'
import { messageScheme } from '@/types/MessageInput'

const Form = () => {
  const {
    handleSubmit,
    control,
    watch,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm<MessageInput>({
    resolver: zodResolver(messageScheme),
    defaultValues: { message: '', image: '' },
  })

  const messageValue = watch('message')

  return (
    <form className="bg-gray-300 h-[90px] py-5 px-10 flex">
      <div className="bg-white flex w-full relative">
        <Input
          id="message"
          name="message"
          type="text"
          label="type a message"
          control={control}
          disabled={isSubmitting}
          required
          isChat
        />
        <ImageUploader existsMessage={messageValue ? true : false} />
      </div>
      <Button type="submit" label="送信" isChat />
    </form>
  )
}

export default Form
