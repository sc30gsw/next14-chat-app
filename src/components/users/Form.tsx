'use client'

import React from 'react'
import type {
  Control,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'

import Button from '@/components/Button'
import Input from '@/components/Input'

type FormProps = {
  isSignUp?: boolean
  isEdit?: boolean
  handleSubmit: UseFormHandleSubmit<any>
  onSubmit: SubmitHandler<any>
  control: Control<any>
  disabled?: boolean
  buttonText: string
}

const Form: React.FC<FormProps> = ({
  isSignUp,
  isEdit,
  handleSubmit,
  onSubmit,
  control,
  disabled,
  buttonText,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {(isSignUp || isEdit) && (
        <div className="w-full relative my-3 px-0 tracking-wide font-extralight">
          <Input
            id="name"
            name="name"
            label="Name"
            type="text"
            control={control}
            disabled={disabled}
            required
          />
        </div>
      )}
      <div className="w-full relative my-3 px-0 tracking-wide font-extralight">
        <Input
          id="email"
          name="email"
          label="Email"
          type="email"
          control={control}
          disabled={disabled}
          required
        />
      </div>
      {isEdit || (
        <div className="w-full relative my-3 px-0 tracking-wide font-extralight">
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            control={control}
            disabled={disabled}
            required
          />
        </div>
      )}
      {isSignUp && (
        <div className="w-full relative my-3 px-0 tracking-wide font-extralight">
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
            control={control}
            disabled={disabled}
            required
          />
        </div>
      )}
      <div className="flex justify-center md:justify-start">
        <Button type="submit" label={buttonText} />
      </div>
    </form>
  )
}

export default Form
