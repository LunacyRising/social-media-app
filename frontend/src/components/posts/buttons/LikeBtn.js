import React, { useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IconButton,Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { likePost } from "../../../actions/postsActions/likePostAction";
import { likeComment } from "../../../actions/commentsActions/likeComment";
import { loginModalOpen } from "../../../actions/modalsActions/login";
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import useLikeDislike from "./useLikeDislike";

const LikeBtn = ({ postId, title, postCreator, creatorUserName, likes, dislikes, commentId, commentLikes, commentDislikes, postBtn, commentBtn }) => {   

  console.log(`soy el id del comentario : ${commentId}`)
  const useStyles = makeStyles(() => ({ 

    btn: {
      width: 30,
      height: 30,
      marginRight: 5 
    },
    icon: {
      fontSize: commentBtn && 21
    },
    primary: {
      color: "#8b70d2",
    }
  }));
  const classes = useStyles();

  const { primary, btn, icon } = classes;

 
  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { allLikes, allDislikes } = useSelector(state => state.postReducer);
  

  // el estado depende desde donde se esta usando el boton, post o comentario
  const initialState = !commentBtn ? { postId, title, postCreator, creatorUserName, likes, dislikes } : { postId, commentId, commentLikes, commentDislikes }; 

  //console.log(`likes de post : ${likes} dislikes de posts: ${dislikes}`)

  const { values, setValues, itemExists, itemExists2,  itemDoesntExist, itemDoesntExistButItemDoes, classColor, classColor2 } = useLikeDislike(initialState); 

  // actualiza el estado cuando los dislikes cambian, para poder editar el contador de dislikes del post
  let dislikesUpdate = () => {
    commentBtn ? setValues({...values, commentDislikes: commentDislikes}) : setValues({...values, dislikes: dislikes})
  }
  let effectCondition = commentBtn ? commentDislikes : dislikes 

  useEffect(() => {
    dislikesUpdate()
  },[effectCondition])

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  //aplica color al icono y al contador de likes si el usuario da like
  // si el usuario da usa el like desde el boton del post cambia el color del like del post, si lo hace desde el comentario cambia el de comentario
  const color = !commentBtn ? classColor(allLikes, postId ) : classColor2(allLikes, commentId) 

  // la accion se decide desde donde el usuario da el like, post o comentario
  const action = commentBtn ? likeComment : likePost

  const testLike = () => {
    // checkea si ya hay un like, like de post o de comentario
    const likeExiste = !commentBtn ? itemExists(allLikes, postId) : itemExists2(allLikes, commentId); 
    // checkea si el usuario ya dio un dislike, para asi luego poder determinar si hay que editar el contador del post o no
    const dislikeExiste = !commentBtn ? itemExists(allDislikes, postId): itemExists2(allDislikes, commentId)
    // si no hay like o dislike del usuario, solo incrementa el contador de likes del post
    if(!likeExiste && !dislikeExiste ) { 
     itemDoesntExist(action);
     //console.log(` likes desde likebtn:${likes}`)
     // si no hay like pero hay un dislike, primero va a borrar el dislike y va a editar el contador de likes y dislikes del post  
    }else if ( !likeExiste && dislikeExiste ) {
     itemDoesntExistButItemDoes(action)
    }
  }


    return ( 
        <>
            <Tooltip title={t("Like")}>  
                <IconButton className={ color ? `${primary} ${btn}`: btn} onClick={isAuthenticated ? () => testLike() : () => dispatch(loginModalOpen())}>
                    <ThumbUpTwoToneIcon className={icon}/>
                </IconButton>
            </Tooltip>
            <span className={color ? primary : undefined}>{commentBtn ? commentLikes : likes}</span>
        </>
    );
};

export default LikeBtn;
