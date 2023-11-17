'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import React, { useCallback, useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Form from '@/components/users/Form'
import useCurrentUser from '@/hooks/useCurrentUser'
import useEditAccount from '@/hooks/useEditAccount'
import type { EditAccountInput } from '@/types/EditAccountInput'
import { editAccountScheme } from '@/types/EditAccountInput'

type UserPageProps = {
  params: { userId: string }
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const { data: currentUser } = useCurrentUser()
  const router = useRouter()

  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting },
    setValue,
  } = useForm<EditAccountInput>({
    resolver: zodResolver(editAccountScheme),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  useEffect(() => {
    setValue('name', currentUser?.name as string)
    setValue('email', currentUser?.email as string)
  }, [currentUser?.email, currentUser?.name, setValue])

  const { handleEditAccount } = useEditAccount(params.userId)

  const onSubmit: SubmitHandler<EditAccountInput> = useCallback(
    async (data) => await handleEditAccount(data, setError, reset),
    [handleEditAccount, reset, setError],
  )
  return (
    <div className="w-full">
      <div className="flex md:flex-row md:items-start flex-col items-center justify-center w-[350px] p-3 my-14 md:w-[980px] md:p-[60px] md:my-[60px] mx-auto border-gray-300 border-2">
        <div className="md:w-1/2 w-full text-center md:text-left md:mt-2">
          <h2 className="mb-[10px] text-red-500 md:text-[40px] text-[30px] font-extralight md:after:content-[''] md:after:block md:after:w-[60px] md:after:mt-[5px] md:after:border-blue-400 md:after:border-b-[1px]">
            Edit Account
          </h2>
          <h5 className="mb-5 md:text-base text-sm font-extralight">
            アカウントの編集
          </h5>
          <button
            onClick={() => signOut({ callbackUrl: '/users/signIn' })}
            className="mt-5 mr-1 text-white bg-gray-300 text-sm h-[50px] py-0 px-[30px] tracking-widest text-center border-none rounded-sm shadow-md transition duration-200 hover:opacity-90"
          >
            ログアウト
          </button>
          <button
            onClick={() => router.push('/')}
            className="mt-5 ml-1 text-white bg-gray-300 text-sm h-[50px] py-0 px-[30px] tracking-widest text-center border-none rounded-sm shadow-md transition duration-200 hover:opacity-90"
          >
            チャットページに戻る
          </button>
          <br />
        </div>
        <div className="md:w-1/2 w-full mb-3 mt-5 md:mt-0">
          <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
            disabled={isSubmitting}
            buttonText="Update"
            isEdit
          />
        </div>
      </div>
    </div>
  )
}

export default UserPage
