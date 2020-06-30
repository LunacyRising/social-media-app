 // determina si el item existe o no en la array
 export const itemExists = (allItems, itemId, userId) => {
    return  allItems.some(item => item.postId === itemId && item.userId === userId)
  } 