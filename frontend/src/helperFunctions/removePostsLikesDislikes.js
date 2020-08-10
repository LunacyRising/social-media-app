  // remueve un like o dislike de post antes de agregar uno nuevo, ignora al like que contiene un key de commentId
  export const removePostsLikesDislikes = (allItems, itemId) => {
    return allItems.filter(item => item.postId !== itemId || item.commentId);  
 } 
