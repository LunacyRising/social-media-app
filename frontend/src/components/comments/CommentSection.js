import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
      borderBottom: "1px solid #3b4248" 
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

  const { comments, amountOfComment } = useSelector(state => state.commentsReducer);

  let [ skip, setSkip] = useState(0);

  const [ limit, setLimit] = useState(1);

  let [ lengthOfComments, setLengthOfComments] = useState(amountOfComment)

  const [ commentsLoading, setCommentsLoading ] = useState(false)

  const testingFetch = () => {
    // no hay comentarios
    if(commentsCount === 0 ) return;
    setCommentsLoading(true);
    setSkip( prev => prev + limit);
    dispatch(fetchCommentsByPost({postId, skip, limit}));
    setCommentsLoading(false)
  }

  dayjs.extend(relativeTime);

  const dispatch = useDispatch();

  let filteredComments = commentsLoading ? <p>loading ...</p> : comments.filter(comment =>(comment.postId === postId))
  .map((comment) =>( 
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
  ))
  /*let filteredComments = commentsLoading ? <p>loading...</p> : commentsByPost.filter(comment =>(comment.postId === postId))
  .map(comment =>(
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
  ))*/

  //let amountOfComment = filteredComments.length
  let dinamicCommentWord = commentsCount === 1 ?  "Comment" :  "Comments"

  return (
    <>
      <ExpansionPanel onClick={() => testingFetch()} TransitionProps={{ unmountOnExit: true }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
        <ChatBubbleOutlineOutlinedIcon style={{marginRight:5}}fontSize="small"/>
          <Typography variant="caption">
            {commentsCount} {dinamicCommentWord}
          </Typography>
        </ExpansionPanelSummary>
        {commentsCount > 0  ? filteredComments : <Typography style={{marginLeft: 17, paddingBottom: 20}}>no comments</Typography>}
      </ExpansionPanel>
    </>
  );
};

export default CommentSection;
