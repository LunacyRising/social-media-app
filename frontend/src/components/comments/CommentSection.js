import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, IconButton } from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Comments from "./Comments";
//import LoadMoreBtn from "../posts/buttons/LoadMoreBtn";
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
      fontSize: 14
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

  const [ openComments, setOpenComments ] = useState(false);  

  const { t } = useTranslation();

  dayjs.extend(relativeTime);

  const dispatch = useDispatch();

  const [ skip, setSkip ] = useState(0);

  const [ limit, setLimit ] = useState(1)

  let dinamicCommentWord = commentsCount === 1 ?  t("Comment") : t("Comments")

  let dinamicOpenCommentsWord = !openComments ? t("OpenComments") : t("CloseComments")

  //verificar si ya hay un comentario en el reducer, si lo hay no es necesario fetchear mas comentarios con el boton de abrir comentarios
  const yaHayUnComentario = comments && comments.some(comment => comment.postId === postId)
  //console.log(yaHayUnComentario)

  const testingFetchComments = async () => {
    setOpenComments(prev => !prev);
    //console.log(yaHayUnComentario)
    if(yaHayUnComentario) return 
     dispatch(fetchCommentsByPost({postId, skip, limit}))
    setSkip( prev => prev + limit)
  }

  const loadMore = () => {
    dispatch(fetchCommentsByPost({postId, skip, limit}));
    setSkip( prev => prev + limit)
  }

  return (
    <>
      <Box className={commentCountAndButton}>
       <Typography variant="caption">
            {commentsCount} {dinamicCommentWord}
        </Typography>
        <IconButton className={btn} onClick={() => testingFetchComments()}>{dinamicOpenCommentsWord}</IconButton>
      </Box>
      {openComments && 
      <Box className={commentsContainer}>
        {commentsCount > 0  ? <Comments comments={comments} replies={replies} commentsCount={commentsCount} postId={postId}/> : <Typography className={noComments}>{t("NoComments")}</Typography>}
        {/*yaHayUnComentario && commentsCount > test && <LoadMoreBtn loadMore={loadMore} postId={postId} skip={skip} limit={limit}/>*/}
      </Box>}
    </>
  );
};

export default React.memo(CommentSection);
