'use client'

import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Controller,
  type ControllerProps,
  type FieldValues,
  useController,
} from 'react-hook-form'

type ImageUploaderProps = {
  base64: string
  setBase64: (prev: string) => void
  name: string
  disabled?: boolean
}

type ExtendsImageUploaderProps<T extends FieldValues> = Omit<
  ControllerProps<T>,
  'render'
> &
  ImageUploaderProps

const ImageUploader = <T extends FieldValues>({
  base64,
  setBase64,
  name,
  disabled,
  control,
  rules,
}: ExtendsImageUploaderProps<T>) => {
  const { field, fieldState } = useController<T>({ name, control, rules })
  const { error } = fieldState

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const base64String = e.target.result
        setBase64(base64String)
        field.onChange(base64String) // ここで base64 文字列をセット
      }
      reader.readAsDataURL(file)
    },
    [field, setBase64],
  )

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  return (
    <>
      <div
        {...getRootProps({
          className:
            'relative text-xs text-white p-3 w-[60px] my-[5px] mx-[10px] text-center cursor-pointer shadow-md bg-sky-500 transition duration-200 hover:opacity-70',
        })}
      >
        {base64 && (
          <div className="absolute bottom-11 left-0 right-0">
            <Image src={base64} height="100" width="100" alt="Uploaded image" />
          </div>
        )}
        画像
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <>
              <input
                {...field}
                {...getInputProps()}
                value={undefined}
                type="file"
              />
              {error && <span className="text-red-500">{error.message}</span>}
            </>
          )}
        />
      </div>
    </>
  )
}

export default ImageUploader
