import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Comments from "./Comments";
import LoadMoreBtn from "../posts/buttons/LoadMoreBtn";
import dots from "../../utils/images/dots.svg";
import { fetchCommentsByPost } from "../../actions/commentsActions/fetchCommentsByPost"; 

const CommentSection = ({ postId, commentsCount }) => { 

  const useStyles = makeStyles(() => ({ 
    
    commentCountAndButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      padding: 7
    },
    btn: {
      fontSize: 12
    },
    commentsContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      transition: "all 0.3s ease"
    },
    noComments: {
      marginLeft: 17,
      paddingBottom: 20
    }
  }));
  const classes = useStyles();

  const { commentCountAndButton, btn, commentsContainer, noComments } = classes;

  const { comments, replies } = useSelector(state => state.commentsReducer);


  const { t } = useTranslation();

  dayjs.extend(relativeTime);

  const dispatch = useDispatch();

  const [ openComments, setOpenComments ] = useState(false); 
  
  const [ loading, setLoading ] = useState(false);  

  const [ moreCommentsLoading, setMoreCommentsLoading ] = useState(false);  

  const [ skip, setSkip ] = useState(0);

  const [ limit, setLimit ] = useState(1);

  let dinamicCommentWord = commentsCount === 1 ?  t("Comment") : t("Comments")

  let dinamicOpenCommentsWord = !openComments ? t("OpenComments") : t("CloseComments")

  const commentsByPost = comments && comments.filter(comment => comment.postId === postId);

  const fetchComments = () => {
    setOpenComments(prev => !prev);
    if(commentsCount === 0 || commentsByPost.length === commentsCount || commentsByPost.length >= 1 ) return 
    setLoading(true)
    dispatch(fetchCommentsByPost({postId, skip, limit}))
    setLoading(false)
    setSkip( prev => prev + limit)
  }

  const loadMore = () => {
    setMoreCommentsLoading(true)
    dispatch(fetchCommentsByPost({postId, skip, limit}));
    setMoreCommentsLoading(false)
    setSkip( prev => prev + limit)
  }

  return (
    <>
      <Box className={commentCountAndButton}>
       <Typography variant="caption">
            {commentsCount} {dinamicCommentWord}
        </Typography>
        <IconButton className={btn} onClick={() => fetchComments()}>{dinamicOpenCommentsWord}</IconButton>
      </Box>
      {openComments && 
      <Box className={commentsContainer}>
        {loading && <img src={dots} alt="dots"/>}
        {commentsCount > 0  ? <Comments comments={comments} replies={replies} commentsCount={commentsCount} postId={postId}/> : <Typography className={noComments}>{t("NoComments")}</Typography>}
        {commentsByPost.length !== commentsCount && <LoadMoreBtn loadMore={loadMore} postId={postId} skip={skip} limit={limit} moreCommentsLoading={moreCommentsLoading}/>}
      </Box>}
    </>
  );
};

export default React.memo(CommentSection);
