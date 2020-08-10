import React, { useEffect }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { likePost } from "../../../actions/postsActions/likePostAction";
import { likeComment } from "../../../actions/commentsActions/likeComment";
import { dislikePost } from "../../../actions/postsActions/dislikePostAction";
import { dislikeComment } from "../../../actions/commentsActions/dislikeComment";
import { loginModalOpen } from "../../../actions/modalsActions/login";
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownTwoTone';
import useLikeDislike from "./useLikeDislike";

const LikeDislikeBtns = (props) => {   

  const { likes, dislikes, postId, commentId, commentBtn } = props; 

  //console.log(`commentBtn: ${commentBtn}`)

  const useStyles = makeStyles(() => ({

    btnsContainer: {
      display: "flex",
      alignItems: "center"
    },
    singleBtnContainer: {
      display: "flex",
      alignItems: "center",
      paddingRight: 15
    },
    btn: {
      width: 30,
      height: 30
    },
    icon: {
      fontSize: commentBtn && 21 
    },
    primary: {
      color: "#8b70d2",
    }
  }));
  const classes = useStyles();

  const { btnsContainer, singleBtnContainer, primary, btn, icon } = classes;

 
  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { allLikes, allDislikes } = useSelector(state => state.postReducer);

  // el estado depende desde donde se esta usando el boton, post o comentario
  const initialState =  { ...props }

  const { values, setValues, itemExists, itemDoesntExist, itemADoesntExistButItemBDoes, classColor, likesState, dislikesState, likeColor, dislikeColor } = useLikeDislike(initialState); 
  //console.log(likeColor)
  
  
  // actualiza el estado cuando los dislikes cambian, para poder editar el contador de dislikes del post
  let updateState = () => {
    setValues({...values, dislikes: dislikes, likes: likes}) 
  }
 
  useEffect(() => { 
    updateState()
  },[likes, dislikes])

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  const testLikeState = "testLikeState";

  const testDislikeState = "testDislikeState";

  //aplica color al icono y al contador de likes si el usuario da like
  // si el usuario da usa el like desde el boton del post cambia el color del like del post, si lo hace desde el comentario cambia el de comentario
 
  const testForPostLikes = classColor(allLikes, postId, "postId");

  const testForCommentLikes = classColor(allLikes, commentId, "commentId"); 
  
  const testForPostDislikes = classColor(allDislikes, postId, "postId");

  const testForCommentDislikes = classColor(allDislikes, commentId, "commentId")

  const finalTest = !commentBtn ? testForPostLikes : testForCommentLikes;

  const finalTest2 = !commentBtn ? testForPostDislikes : testForCommentDislikes



  // la accion se decide desde donde el usuario da el like, post o comentario
  const likeAction = commentBtn ? likeComment : likePost
  
  const dislikeAction = commentBtn ? dislikeComment : dislikePost

  const testLike = () => {
    // checkea si ya hay un like, like de post o de comentario
    const likeExiste = commentBtn === undefined ? itemExists(allLikes, postId, "postId") : itemExists(allLikes, commentId, "commentId");
    // checkea si el usuario ya dio un dislike, para asi luego poder determinar si hay que editar el contador del post o no
    const dislikeExiste = commentBtn === undefined ? itemExists(allDislikes, postId, "postId"): itemExists(allDislikes, commentId, "commentId")
    // si no hay like o dislike del usuario, solo incrementa el contador de likes del post
    if(!likeExiste && !dislikeExiste ) { 
     itemDoesntExist(likeAction, testLikeState);
     // si no hay like pero hay un dislike, primero va a borrar el dislike y va a editar el contador de likes y dislikes del post  
    }else if ( !likeExiste && dislikeExiste ) {
      itemADoesntExistButItemBDoes(likeAction, testLikeState)
    }
  }

  const testDislike = () => {
    //const dislikeExiste = !commentBtn ? itemExists(allDislikes, postId) : itemExists2(allDislikes, commentId);  
    const dislikeExiste = !commentBtn ? itemExists(allDislikes, postId, "postId") : itemExists(allDislikes, commentId, "commentId");
    
    //const likeExiste = !commentBtn ? itemExists(allLikes, postId): itemExists2(allLikes, commentId); 
    const likeExiste = !commentBtn ? itemExists(allLikes, postId, "postId"): itemExists(allLikes, commentId, "commentId"); 
   
    if(!dislikeExiste && !likeExiste ) {
      itemDoesntExist(dislikeAction, testDislikeState)
    }else if ( !dislikeExiste && likeExiste ) {
      itemADoesntExistButItemBDoes(dislikeAction, testDislikeState) 
    }
  }


    return ( 
        <>
            <Box className={btnsContainer}>
                <Box className={singleBtnContainer}>
                    <Tooltip title={t("Like")}>  
                        <IconButton className={ finalTest ?`${primary} ${btn}`: btn} onClick={isAuthenticated ? () => testLike() : () => dispatch(loginModalOpen())}>
                            <ThumbUpTwoToneIcon className={icon}/>
                        </IconButton>
                    </Tooltip>
                    <span className={ finalTest ? primary : undefined}>{likesState}</span>
                </Box>
                <Box className={singleBtnContainer}>
                    <Tooltip title={t("Dislike")}>
                        <IconButton className={ finalTest2 ? `${primary} ${btn}`: btn} onClick={isAuthenticated ? () => testDislike() : () => dispatch(loginModalOpen())}>  
                        <ThumbDownTwoToneIcon className={icon}/>
                        </IconButton>
                    </Tooltip>
                    <span className={ finalTest2 ? primary : undefined}>{dislikesState}</span>
                </Box>
            </Box>
        </>
    );
};

export default LikeDislikeBtns;
