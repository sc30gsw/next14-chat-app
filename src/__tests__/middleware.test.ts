import type { JWT } from 'next-auth/jwt'

import { options } from '@/middleware'

// withAuth関数をモック化
jest.mock('next-auth/middleware', () => ({
  withAuth: jest.fn().mockImplementation((options) => options),
}))

describe('Middleware', () => {
  test('authorized callback should return false if token is null', () => {
    const result = options.callbacks.authorized({ token: null })
    expect(result).toBeFalsy()
  })

  test('authorized callback should return true if token is not null', () => {
    const token: JWT = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      sub: '123',
    }
    const result = options.callbacks.authorized({ token })
    expect(result).toBeTruthy()
  })
})
