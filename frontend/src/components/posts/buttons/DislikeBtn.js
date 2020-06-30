import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { dislikePost } from "../../../actions/postsActions/dislikePostAction";
import { dislikeComment } from "../../../actions/commentsActions/dislikeComment";
import { loginModalOpen } from "../../../actions/modalsActions/login";
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownTwoTone';
import { IconButton,Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useLikeDislike from "./useLikeDislike";

const DislikeBtn = ({ postBtn, commentBtn, postId, likes, dislikes , commentLikes, commentDislikes, commentId }) => { 

  const useStyles = makeStyles(() => ({

      btn: {
        width: 30,
        height: 30,
        marginRight: 5,
        marginLeft: 15
      },
      icon: {
        fontSize: commentBtn && 21
      },
      primary: {
        color: "#8b70d2",
      }
    }));
    const classes = useStyles();
 
    const { primary, btn, icon, } = classes;
 
    const { isAuthenticated } = useSelector(state => state.authReducer);

    const { allLikes, allDislikes } = useSelector(state => state.postReducer);

    const initialState = !commentBtn ? { postId, likes, dislikes} : { postId, commentId, commentDislikes, commentLikes };

    const { values, setValues, itemExists, itemExists2, itemDoesntExist, itemDoesntExistButItemDoes, classColor, classColor2, dislikeState} = useLikeDislike(initialState)

    let dislikesUpdate = () => {
      commentBtn ? setValues({...values, commentLikes: commentLikes}) : setValues({...values, likes: likes}) 
    }

  let effectCondition = commentBtn ? commentLikes : likes 

    useEffect(() => {
      dislikesUpdate()
    },[effectCondition])

    const { t } = useTranslation();

    const dispatch = useDispatch();


    const color = !commentBtn ? classColor(allDislikes, postId) : classColor2(allDislikes, commentId)

    const action = commentBtn ? dislikeComment : dislikePost

    const testDislike = () => {
      const dislikeExiste = !commentBtn ? itemExists(allDislikes, postId) : itemExists2(allDislikes, commentId);  
      
      const likeExiste = !commentBtn ? itemExists(allLikes, postId): itemExists2(allLikes, commentId); 
     
      if(!dislikeExiste && !likeExiste ) {
        itemDoesntExist(action)
       //console.log(` soy dislike: ${dislikes}`)
      }else if ( !dislikeExiste && likeExiste ) {
       // console.log(` likes desde dislikebtn:${likes}`)
        itemDoesntExistButItemDoes(action)
      }
    }
  
    return (
        <>
            <Tooltip title={t("Dislike")}>
                <IconButton className={ color ? `${primary} ${btn}`: btn} onClick={isAuthenticated ? () => testDislike() : () => dispatch(loginModalOpen())}>  
                  <ThumbDownTwoToneIcon className={icon}/>
                </IconButton>
              </Tooltip>
            <span className={ color ? primary : undefined}>{ commentBtn ? commentDislikes : dislikes}</span>
        </>
    );
};

export default DislikeBtn;