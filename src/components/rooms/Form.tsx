'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useCallback } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { Controller, useForm } from 'react-hook-form'

import Button from '@/components/Button'
import useCreateRoom from '@/hooks/useCreateRoom'
import type { CreateRoomInput } from '@/types/CreateRoomInput'
import { createRoomScheme } from '@/types/CreateRoomInput'
import type { User } from '@/types/User'

type FormProps = {
  users?: User[]
}

const Form: React.FC<FormProps> = ({ users }) => {
  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<CreateRoomInput>({
    resolver: zodResolver(createRoomScheme),
    defaultValues: { name: '', userId: '' },
  })

  const { handleCreateRoom } = useCreateRoom()

  const onSubmit: SubmitHandler<CreateRoomInput> = useCallback(
    async (data) => await handleCreateRoom(data, reset, setError),
    [handleCreateRoom, reset, setError],
  )

  return (
    <form className="pb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-[30px] md:block flex flex-col justify-center">
        <div className="md:float-left md:w-[30%] pl-5 pr-5 box-border">
          <label className="block font-bold md:text-right text-center leading-[50px]">
            チャットルーム名
          </label>
        </div>
        <div className="md:float-right md:w-[70%] w-full">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  placeholder="チャットルーム名を入力してください"
                  disabled={isSubmitting}
                  className="float-right w-full leading-8 py-[10px] px-[15px] box-border border border-solid border-gray-400 rounded-md outline-none hover:cursor-pointer"
                  required
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="after:content-[''] after:clear-both after:block md:block flex flex-col justify-center">
          <div className="mt-5 md:float-left md:w-[30%] pl-5 pr-5 box-border">
            <label className="block font-bold md:text-right text-center leading-[50px]">
              チャットメンバー
            </label>
          </div>
          <div className="md:float-right md:w-[70%]">
            <Controller
              name="userId"
              control={control}
              render={({ field }) => (
                <>
                  <select
                    {...field}
                    disabled={isSubmitting}
                    className="mt-5 md:w-[500px] w-full h-[50px] border border-solid border-gray-400 rounded-md outline-none hover:cursor-pointer"
                  >
                    <option value="">
                      チャットするユーザーを選択してください
                    </option>
                    {users?.map((user: User) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  {errors.userId && (
                    <p className="text-red-500">{errors.userId.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="md:float-right md:block flex justify-center md:w-[70%] w-full">
            <Button type="submit" label="Create Room" isRoom />
          </div>
        </div>
      </div>
    </form>
  )
}

export default Form
