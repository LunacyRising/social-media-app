import React, { useState } from "react";
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
import { fetchReplies } from "../../actions/commentsActions/fetchReplies";


const Comment = ({ replyComponent, postId, id, comment , userName, avatar, likes, dislikes, createdAt, repliesCounter, replies }) => { 

  console.log(`soy el id del comentario : ${id}`)
  const useStyles = makeStyles(() => ({ 

    commentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "all 0.3s ease",
      marginLeft: replyComponent && "10%"
    },
    BtnsContainer: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 20
    }, 
    avatarStyle: {
      width: !replyComponent ? 50 : 40,
      height: !replyComponent ? 50 : 40
    },
    creatorAndDate: { 
      display: "flex",
      alignItems: "center",
      width: "100%",
      marginTop: 15
    },
    day: {
      marginLeft: 10
    },
    commentText: {
      marginTop: 14,
      width: "98%"
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

  const { commentContainer, BtnsContainer, avatarStyle, creatorAndDate, day, commentText, openRepliesBtn, replyExistsBtn } = classes;

  const { t } = useTranslation();

  const dispatch = useDispatch(); 

  dayjs.extend(relativeTime);

  const [ replyFieldOpen , setReplyFieldOpen ] = useState(false);

  const [ openReplies , setOpenReplies ] = useState(false);

  const repliesLength = replies.filter(reply => reply.commentId === id).length


  const getReplies = (id) => {
    setOpenReplies(prev => !prev);
    if(repliesLength === repliesCounter) return
    dispatch(fetchReplies(id))
  }

  return (
    <>
      <Divider/>
        <ListItem  className={commentContainer} disableGutters={true}> 
          <Divider/>
            <Box className={creatorAndDate}>
              <ListItemAvatar>
                  <Avatar className={avatarStyle} alt="avatar" src={avatar} />
              </ListItemAvatar>
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
              <Box className={BtnsContainer}>
                <LikeDislikeBtns replyComponent commentBtn postId={postId} likes={likes} dislikes={dislikes} commentId={id}/>  
                {!replyComponent &&
                <Box>
                  <Button className={openRepliesBtn} onClick={() => setReplyFieldOpen(true)} size="small">{t("Reply")}</Button>
                </Box>}
              </Box>
        </ListItem> 
        {replyFieldOpen &&
        <ReplyField postId={postId} replyFieldOpen={replyFieldOpen} commentId={id}  replies={repliesCounter} setReplyFieldOpen={setReplyFieldOpen}/>} 
        {!replyComponent && repliesCounter !== 0 && 
        <Button className={replyExistsBtn} onClick={() => getReplies(id)}>{`${repliesCounter} ${repliesCounter === 1 ? "reply" : "replies"}`}</Button>}
        {openReplies && <Replies postId={postId} commentId={id}/>}
        <Divider/>
    </>
  );
};

export default React.memo(Comment);
