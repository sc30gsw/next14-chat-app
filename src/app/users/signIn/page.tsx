'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import Form from '@/components/users/Form'
import useSignIn from '@/hooks/useSignIn'
import type { SignInInput } from '@/types/SignInInput'
import { signInScheme } from '@/types/SignInInput'

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = useSignIn()

  const onSubmit: SubmitHandler<SignInInput> = useCallback(
    async (data) => await handleSignIn(data, reset),
    [handleSignIn, reset],
  )

  return (
    <div className="w-full">
      <div className="flex md:flex-row md:items-start flex-col items-center justify-center w-[350px] p-3 my-14 md:w-[980px] md:p-[60px] md:my-[60px] mx-auto border-gray-300 border-2">
        <div className="md:w-1/2 w-full text-center md:text-left md:mt-2">
          <h2 className="mb-[10px] text-red-500 md:text-[40px] text-[30px] font-extralight md:after:content-[''] md:after:block md:after:w-[60px] md:after:mt-[5px] md:after:border-blue-400 md:after:border-b-[1px]">
            Log in
          </h2>
          <h5 className="mb-5 md:text-base text-sm font-extralight">
            登録しているユーザーでログイン
          </h5>
          <Link
            className="text-violet-800 hover:border-violet-800 hover:border-b-[1px] hover:opacity-70"
            href="/users/signUp"
          >
            Sign Up
          </Link>
          <br />
        </div>
        <div className="md:w-1/2 w-full mb-3 mt-5 md:mt-0">
          <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
            disabled={isSubmitting}
            buttonText="Log in"
          />
        </div>
      </div>
    </div>
  )
}

export default SignInPage
