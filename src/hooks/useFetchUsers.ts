import { getServerSession } from 'next-auth'

import authOptions from '@/libs/authOptions'
import type { User } from '@/types/User'

const useFetchUsers = async () => {
  try {
    const session = await getServerSession(authOptions)

    const response = await fetch(
      `${process.env.API_BASE_URL}/api/users?userId=${session?.user?.id}`,
      {
        next: { revalidate: 3 },
      },
    )

    const res = await response.json()
    const users: User[] = res.users

    return { users }
  } catch (err) {
    console.log(err)
  }
}

export default useFetchUsers
