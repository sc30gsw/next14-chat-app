import type { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

export const config = {
  // api/auth、/users/signUpを認証の対象から外す
  matcher: ['/((?!users/signUp|api/auth).*)'],
}

// トークンが存在しない場合、リダイレクトする
const options = {
  callbacks: {
    authorized: ({ token }: { token: JWT | null }) => {
      console.log(token)

      return token ? true : false
    },
  },
  // リダイレクトページ
  pages: {
    signIn: '/users/signIn',
  },
}

export default withAuth(options)
