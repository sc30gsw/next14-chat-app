'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import Input from '@/components/Input'
import ImageUploader from '@/components/messages/ImageUploader'
import useCreateMessage from '@/hooks/useCreateMessage'
import type { MessageInput } from '@/types/MessageInput'
import { messageScheme } from '@/types/MessageInput'

type FormProps = {
  roomId: string
}

const Form: React.FC<FormProps> = ({ roomId }) => {
  const [base64, setBase64] = useState('')

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<MessageInput>({
    resolver: zodResolver(messageScheme),
    defaultValues: { content: '', image: '' },
  })

  const { handleCreateMessage } = useCreateMessage(roomId)

  const onSubmit: SubmitHandler<MessageInput> = useCallback(
    async (data) => await handleCreateMessage(data, reset, setBase64),
    [handleCreateMessage, reset],
  )

  return (
    <form
      className="bg-gray-300 h-[90px] py-5 px-10 flex"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-white flex w-full relative">
        <Input
          id="content"
          name="content"
          type="text"
          label="type a message"
          control={control}
          disabled={isSubmitting}
          isChat
          isRoom
        />
        <ImageUploader
          base64={base64}
          setBase64={setBase64}
          name="image"
          disabled={isSubmitting}
          control={control}
        />
      </div>
      <Button type="submit" label="送信" isChat />
    </form>
  )
}

export default Form
