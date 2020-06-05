import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Avatar,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fetchCommentsByPost } from "../../actions/commentsActions/fetchCommentsByPost";


const CommentSection = ({ postId, commentsCount }) => {

  const useStyles = makeStyles(() => ({ 
    commentContainer: {
      display: "flex",
      transition: "all 0.3s ease"
    },
    commentAvatar: {},
    commentDetails: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 15
    },
    noHover: {
      "&:hover": {
        backgroundColor: "transparent",
        textDecoration: "none",
        color: "#3b4248"
      },
    date: {
      marginTop: 25
      },
    commentIcon: {
      marginLeft: 8
    }
  }
  }));
  const classes = useStyles();

  const { commentContainer, commentDetails, date } = classes;

  const { commentsLoading, comments, amountOfComments } = useSelector(state => state.commentsReducer);

  const { t } = useTranslation();

  let [ skip, setSkip] = useState(0);

  const [ limit ] = useState(1);

  const fetchComments = () => {
    // no hay comentarios
    if(commentsCount === 0 || commentsCount === amountOfComments) return; 
    setSkip( prev => prev + limit);
    dispatch(fetchCommentsByPost({ postId, skip, limit }));
  }

  dayjs.extend(relativeTime);

  const dispatch = useDispatch();

  let filteredComments = 
  commentsLoading ? <p>{t("Loading")}</p> :
  <TransitionGroup component={null}>
  {comments.filter(comment =>(comment.postId === postId))
  .map((comment) =>( 
    <CSSTransition
      key={comment._id}
      timeout={500}
      classNames="comment" 
      unmountOnExit={true}
      >
    <>
      <ExpansionPanelDetails key={comment._id} className={commentContainer}> 
        <Avatar alt="avatar" src={comment.avatar} />
          <div className={commentDetails}>
            <Typography
              paragraph="true"
              color="primary"
              variant="body2" 
              component={Link}
              to={`/users/${comment.userName}`}
              target="_blank"
            >
              {comment.userName} 
            </Typography>
            <Typography paragraph="true" variant="caption">{comment.comment}</Typography>
            <Typography className={date} variant="caption">
              {dayjs(comment.createdAt).fromNow()}
            </Typography>
          </div>
      </ExpansionPanelDetails>
      <Divider/>
    </>
    </CSSTransition>
  ))}
  </TransitionGroup>
  
  let dinamicCommentWord = commentsCount === 1 ?  t("Comment") : t("Comments")

  return (
    <>
      <ExpansionPanel onClick={() => fetchComments()} TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
        <ChatBubbleOutlineOutlinedIcon style={{marginRight:5}}fontSize="small"/>
          <Typography variant="caption">
            {commentsCount} {dinamicCommentWord}
          </Typography>
        </ExpansionPanelSummary>
        {commentsCount > 0  ? filteredComments : <Typography style={{marginLeft: 17, paddingBottom: 20}}>{t("NoComments")}</Typography>}
      </ExpansionPanel>
    </>
  );
};

export default CommentSection;
