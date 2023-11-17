import React from 'react'
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form'

type InputProps = {
  id: string
  label: string
  type?: string
  disabled?: boolean
  required?: boolean
  isChat?: boolean
  isRoom?: boolean
}

type ExtendInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps

const Input = <T extends FieldValues>({
  name,
  label,
  type,
  control,
  disabled,
  required,
  isChat,
  isRoom,
  rules,
}: ExtendInputProps<T>) => {
  const { field, fieldState } = useController<T>({ name, control, rules })
  const { error } = fieldState

  return (
    <>
      <input
        {...field}
        type={type}
        required={required}
        disabled={disabled}
        placeholder=" "
        className={`peer w-full  font-light bg-white ${
          isChat
            ? 'border-0 h-[50px] pl-[10px]'
            : 'p-4 pt-6 rounded-md  border-2'
        } outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 ${
          error ? 'border-red-500' : 'border-neutral-300'
        } ${error ? 'focus:border-red-500' : 'focus:border-black'}`}
      />
      <label
        className={`absolute font-medium duration-150 transform -translate-y-3 ${
          isChat ? 'top-4 sm:top-3' : 'top-5'
        } text-xs sm:text-sm md:text-base z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          error ? 'text-red-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </label>
      {error && (
        <span className={`text-red-500 ${isRoom && 'absolute bottom-12'}`}>
          {error.message}
        </span>
      )}
    </>
  )
}

export default Input
