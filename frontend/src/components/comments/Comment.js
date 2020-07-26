import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  Divider,
  Box,
  ListItem,
  ListItemAvatar,
  Button
} from "@material-ui/core"; 
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//testing
import LikeDislikeBtns from "../posts/buttons/LikeDislikeBtns";
import ReplyField from "./ReplyField";
import Replies from "./Replies";
import { fetchCommentsByPost } from "../../actions/commentsActions/fetchCommentsByPost";
import { fetchReplies } from "../../actions/commentsActions/fetchReplies";


const Comment = ({ replyComponent, postId, id, replyId, commentsCount, comment , userName, avatar, likes, dislikes, createdAt, repliesCounter, replies }) => { 

  console.log(`soy el id del comentario : ${id}`)
  const useStyles = makeStyles(() => ({ 

    commentWrapper: {
      width: "100%"
    },
    commentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.3s ease",
      "@media(min-width: 769px)" : {
        flexDirection: "row",
      },
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      flexGrow: replyComponent && 1,
      marginLeft: replyComponent && "10%",
      width: "90%",
      "@media(min-width: 769px)" : {
        width: "auto",
      },
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      width: "90%",
      marginTop: 22,
      "@media(min-width: 769px)" : {
        width: "auto",
      },
    },
    likeDislikeContainer: {
      flexGrow: 1,
      "@media(min-width: 769px)" : {
        flexGrow: "inherit"
      },
    },   
    commentDetails: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 15
    },
    avatarStyle: {
      width: !replyComponent ? 50 : 40,
      height: !replyComponent ? 50 : 40
    },
    creatorAndDate: {
      display: "flex"
    },
    day: {
      marginLeft: 10
    },
    commentText: {
      marginTop: 14
    },  
    commentIcon: {
        marginLeft: 8
    },
    openRepliesBtn: {
      marginLeft: 20
    },
    replyExistsBtn: {
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: 10
    }
  }));
  const classes = useStyles();

  const { commentWrapper, commentContainer, leftSection, rightSection, likeDislikeContainer, commentDetails, avatarStyle, creatorAndDate, day, commentText, openRepliesBtn, replyExistsBtn } = classes;

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  dayjs.extend(relativeTime);

  let [ skip, setSkip ] = useState(0);

  const [ limit ] = useState(1);

  //const [ commentsLoading, setCommentsLoading ] = useState(false);

  const [ replyFieldOpen , setReplyFieldOpen ] = useState(false);

  const [ openReplies , setOpenReplies ] = useState(false);

  //const [ commentId, setCommentId ] = useState(null);
  
  // los comentarios correspondientes de cada post
  //const commentsByPost = comments.filter(comment => comment.postId === postId);

  const fetchComments = () => {
    // si no hay comentarios o ya se trajeron todos los comentarios de dicho post no hace nada
    //if(commentsCount === 0 || commentsCount === commentsByPost.length) return; 
   // setCommentsLoading(true)
    setSkip( prev => prev + limit);
    dispatch(fetchCommentsByPost({ postId, skip, limit }));
   // setCommentsLoading(false)
  }

  const repliesLength = replies.filter(reply => reply.commentId === id).length


  const getReplies = (id) => {
    setOpenReplies(prev => !prev);
    if(repliesLength === repliesCounter) return
    dispatch(fetchReplies(id))
  }

  return (
    <>
    <Box className={commentWrapper}>
        <Divider/>
        <ListItem  className={commentContainer} disableGutters={true}> 
            <Box className={leftSection}>
            <ListItemAvatar>
                <Avatar className={avatarStyle} alt="avatar" src={avatar} />
            </ListItemAvatar>
            <Box className={commentDetails}>
                <Box className={creatorAndDate}>
                <Typography
                    color="primary"
                    variant="caption" 
                    component={Link}
                    to={`/users/${userName}`}
                    target="_blank"
                >
                    {userName} 
                </Typography>
                    <Typography className={day} variant="caption">
                    {dayjs(createdAt).fromNow()}
                    </Typography>
                </Box>
                <Typography className={commentText} variant="body2">{comment}</Typography>
            </Box>
            </Box>
            <Box className={rightSection}>
                <Box className={likeDislikeContainer}>
                <LikeDislikeBtns replyComponent commentBtn postId={postId} likes={likes} dislikes={dislikes} commentId={id}/>  
                </Box> 
                {!replyComponent &&
                <Box>
                    <Button className={openRepliesBtn} onClick={() => setReplyFieldOpen(true)} size="small">{t("Reply")}</Button>
                </Box>}
                {replyComponent && 
                <Button onClick={() => console.log(id)}>reply Id</Button>
                }
            </Box>
        </ListItem> 
        {replyFieldOpen &&
        <ReplyField postId={postId} replyFieldOpen={replyFieldOpen} commentId={id}  replies={repliesCounter} setReplyFieldOpen={setReplyFieldOpen}/>} 
        {!replyComponent && repliesCounter !== 0 && 
        <Button className={replyExistsBtn} onClick={() => getReplies(id)}>{`${repliesCounter} ${repliesCounter === 1 ? "reply" : "replies"}`}</Button>}
        {openReplies && <Replies postId={postId} commentId={id}/>}
        <Divider/>
    </Box>
    </>
  );
};

export default React.memo(Comment);
