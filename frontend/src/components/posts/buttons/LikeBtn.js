import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { IconButton,Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { likePost } from "../../../actions/postsActions/likePostAction";
import { loginModalOpen } from "../../../actions/modalsActions/login";
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';

const LikeBtn = ({ postId, likes, title, postCreator, creatorUserName }) => {

  const [likesCount, setLikesCount] = useState(likes);

  const [liked, setLiked] =useState(false);

  const useStyles = makeStyles(() => ({

    btn: {
      width: 30,
      height: 30,
      marginRight: 5
    },
    greenLike: {
      color: "#4caf50",
    }
  }));
  const classes = useStyles();

  const { greenLike, btn } = classes;

  const {isAuthenticated} = useSelector(state => state.authReducer);

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  const like = () => {
   dispatch(likePost({ postId, title, postCreator, creatorUserName}));
   !liked && setLikesCount(likes +1)  //setLikesCount(likesCount-1);

   setLiked(true);
  };

    return ( 
        <>
            <Tooltip title={t("Like")}>
                <IconButton className={ likesCount < 1 ?  btn : `${greenLike} ${btn}`} onClick={isAuthenticated ? () => like() : () => dispatch(loginModalOpen())}>
                    <ThumbUpTwoToneIcon/>
                </IconButton>
            </Tooltip>
            <span className={ likesCount >= 1 && greenLike}>{likesCount}</span>
        </>
    );
};

export default LikeBtn;
