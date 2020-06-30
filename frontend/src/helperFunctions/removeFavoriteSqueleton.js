export const removeFavoriteSqueleton = (items, id) => {
    return items.filter(item => item.postId !== id) 
}