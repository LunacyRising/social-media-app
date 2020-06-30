export const removeFavorite = (items, id) => {
    return items.filter(item => item._id !== id)  
}