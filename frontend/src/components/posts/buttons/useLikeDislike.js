import { useState } from "react";
import { useDispatch } from "react-redux";
import { returnMessages, snackOpen } from "../../../actions/messagesActions";

const useLikeDislike = (initialState) => {


  let [ values, setValues ] = useState(initialState); 

  const { likes , dislikes } = values;

  const [ likesState, setLikesState ] = useState(likes);

  const [ dislikesState, setDislikesState ] = useState(dislikes); 

  const [ likeColor, setLikeColor ] = useState(false);

  const [ dislikeColor, setDislikeColor ] = useState(false);
    
  const dispatch = useDispatch();

  const deleteItem = true

    // para los likes y dislikes del post 
  const itemExists = ( allItems, itemId, key) => { 
      // checkear si hay un ya hay un like y dislike con este postid ignora al like o dislike que tiene campo commentId
      const postItemExists = allItems && allItems.some(item => item[key] === itemId && !item.commentId);
      const commentItemExists = allItems && allItems.some(item => item[key] === itemId);
      return key === "postId" ? postItemExists : commentItemExists
      
    }
    
    // funcion para cambiar el color del boton y contador de likes o dislikes del post
    const classColor = (allItems, itemId, key) => {
      return itemExists(allItems, itemId, key); 
    }
  
     // abrir el snack
    const openSnack = (code) => {
      dispatch(returnMessages(code));
      dispatch(snackOpen())
    }

    //funcion para cuando no existe ni like ni dislike del usuario
    const itemDoesntExist = (func,condition) => {
      dispatch(func(values));
      // incrementa el contador de like o dislike
      condition === "testLikeState" ? setLikesState(prev => prev +1) : setDislikesState(prev => prev +1);
      // cambia el color del like o dislike
      condition === "testLikeState" ? setLikeColor(true) : setDislikeColor(true); 
      // abre el snack
      condition === "testLikeState" ? openSnack(239) : openSnack(240);
      //console.table(values)
    };  

    //funcion para cambiar estados de likes and likes al mismo tiempo
    const changeLikeDislikeState = (func, func2) => { 
      func(prev => prev -1);
      func2( prev => prev +1)
    }
    const changeLikeDislikeColor = (func, func2) => {
      func(false);
      func2(true)
    }
      
    // funcion para cuando no existe like o dislike, pero existe uno de ellos, ej: no existe like pero si existe dislike
    // asi que hay que borrar primero el dislike para asi luego incrementar el contador de likes y disminuir contador de dislikes
    const itemDoesntExistButItemDoes = (func, condition) => {
      // crea un nuevo objeto de valores con un nuevo key value de remove item, para usarlo en la accion asi determinar si hay que borrar un like o dislike
      const newValues = {...values, deleteItem: deleteItem} 
      // cambia el contador de likes o dislikes
      condition === "testLikeState" ? changeLikeDislikeState(setDislikesState, setLikesState) : changeLikeDislikeState(setLikesState, setDislikesState);
      // cambia el color de like o dislike
      condition === "testLikeState" ? changeLikeDislikeColor(setDislikeColor, setLikeColor) : changeLikeDislikeColor(setLikeColor, setDislikeColor);
      // open snack dependiendo de si es para like o dislike
      condition === "testLikeState" ? openSnack(239) : openSnack(240)
      dispatch(func(newValues));
      //console.table(newValues)
    };

    return { values, setValues, itemExists, itemDoesntExist, itemDoesntExistButItemDoes, classColor, likesState, dislikesState, likeColor, dislikeColor}
}

export default useLikeDislike