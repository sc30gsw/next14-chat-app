import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import useCurrentUser from '@/hooks/useCurrentUser'
import useIsLiked from '@/hooks/useIsLiked'
import useLikeCount from '@/hooks/useLikeCount'

const useHandleLike = (messageId: string, userId: string) => {
  const { data: currentUser } = useCurrentUser()
  const isCurrentUserMessage = currentUser?.id === userId

  const { data: likeCountData, isLoading } = useLikeCount(messageId)
  const { data: isLiked, isLoading: isLikedLoading } = useIsLiked(
    messageId,
    currentUser?.id as string,
  )

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const router = useRouter()

  useEffect(() => {
    if (!isLoading) setLikeCount(likeCountData || 0)
    if (!isLikedLoading) setLiked(isLiked as boolean)
  }, [isLiked, isLikedLoading, isLoading, likeCountData, messageId])

  const handleLike = useCallback(async () => {
    // UI更新
    const newLiked = !liked
    const newLikeCount = liked ? likeCount - 1 : likeCount + 1
    setLiked(newLiked)
    setLikeCount(newLikeCount)

    try {
      if (!liked) {
        await fetch('/api/like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser?.id,
            messageId: messageId,
          }),
        })
      } else {
        await fetch('/api/like', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser?.id,
            messageId: messageId,
          }),
        })
      }
    } catch (err) {
      // エラーの場合UIを元に戻す
      setLiked(!liked)
      // エラーが発生した場合、likeCountを元に戻す
      setLikeCount(liked ? likeCount + 1 : likeCount - 1)
    } finally {
      router.refresh()
    }
  }, [currentUser?.id, likeCount, liked, messageId, router])

  return { isCurrentUserMessage, liked, isLiked, likeCount, handleLike }
}

export default useHandleLike
