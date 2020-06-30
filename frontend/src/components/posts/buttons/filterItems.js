  // remueve un like o dislike de post antes de agregar uno nuevo, ignora al like que contiene un campo de commentId
  export const filterPostsLikesDislikes = (allItems, itemId) => {
     return allItems.filter(item => item.postId !== itemId || item.commentId);
  } 

  // remueve un like o dislike de comentario antes de agregar uno nuevo
  export const filterCommentsLikesDislikes = (allItems, itemId) => {
    return  allItems.filter(item => item.commentId !== itemId)
  } 

  // remover post 
  export const filterPosts = (allItems, itemId) => {
    return  allItems.filter(item => item._id !== itemId)
  } 
