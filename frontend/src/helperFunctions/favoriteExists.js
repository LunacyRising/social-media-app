export const favoriteExists = (items, itemId, userId) => {
    return  items.some(item => item.postId === itemId && item.userId === userId)
  } 