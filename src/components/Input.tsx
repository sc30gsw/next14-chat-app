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
  rules,
}: ExtendInputProps<T>) => {
  const { field, fieldState } = useController<T>({ name, control, rules })
  const { error } = fieldState

  return (
    <div className="w-full relative my-3 px-0 tracking-wide font-extralight">
      <input
        {...field}
        type={type}
        required={required}
        disabled={disabled}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 ${
          error ? 'border-red-500' : 'border-neutral-300'
        } ${error ? 'focus:border-red-500' : 'focus:border-black'}`}
      />
      <label
        className={`absolute font-medium duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          error ? 'text-red-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </label>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export default Input
