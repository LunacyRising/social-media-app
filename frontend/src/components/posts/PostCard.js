import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, Divider, Box } from "@material-ui/core";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {  CSSTransition } from 'react-transition-group' 
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentSection from "../comments/CommentSection";
import LikeBtn from "./buttons/LikeBtn";
import DislikeBtn from "./buttons/DislikeBtn";
import AddFavorite from "./buttons/AddFavorite";
import AddComment from "./buttons/AddComment";
import EditPost from "./buttons/EditPost";
import DeletePost from "./buttons/DeletePost";
import GoToPost from "./buttons/GoToPost";
import CommentModal from "../comments/CommentModal"; 
import EditPostModal from "../EditPostModal";
import UserDetails from "./userDetails/UserDetails";
import PulsingGreenBall from "../PulsingGreenBall";
import UserRanking from "./UserRanking";
import AddFriend from "../friends/AddFriend";
import { loginModalOpen } from "../../actions/modalsActions/login";

const PostCard = ({
  postId,
  userId,
  creatorUserName,
  creatorAmountOfPosts, 
  title,
  post,
  date,
  amountOfComments, 
  likes,
  dislikes,
  avatar,
  userIsOnline,
  singlePost
}) => {
  const useStyles = makeStyles((theme) => ({

    card: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 30,
      animation: "drop 1s ease",
      overflow:"visible",
      width: "100%"
    },
    avatarAndText: {
      position: "relative",
      display: "flex",
      alignItems:"center",
      flexDirection: "column",
      marginTop: 10,
      "@media(min-width: 769px)" : {
        flexDirection: "row"
      }
    },
    userAvatar: {
      padding: 10,
      height: 75,
      width: 75,
      borderRadius: "50%"
    },
    postTitle: {
        fontSize: 18
    },
    postInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 13,
        marginTop: 15,
      "@media(min-width: 769px)" : {
        alignItems: "flex-start"
      }
    },
    creatorAndDate: {
        display: "flex",
        marginTop: 22
    },
    creator: {
      fontSize: 12,
      cursor: "pointer",
      '&::after': {
        content: `'|'`,
        marginLeft: 15
      }
    },
    createdAt: {
      marginLeft: 15,
      fontSize: 12,
    },
    btns: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 25,
      paddingBottom: 10,
      marginLeft: 8
    },
    likeDislikeBtns: {
      display: "flex",
      alignItems: "center"
    },
    restOfBtns: {
      display: "flex"
    },
    editAndDeletePostHidden: {
      display: "none",
    },
    editAndDeletePostVisible: {
      display: "flex",
    },
    friendBtnContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingTop: 10,
      marginLeft: 10,
    },
  }));
  const classes = useStyles();
  
  const {card, avatarAndText, userAvatar, postInfo, postTitle, creatorAndDate, creator, createdAt, btns, editAndDeletePostHidden, editAndDeletePostVisible, likeDislikeBtns,restOfBtns, friendBtnContainer } = classes;

  dayjs.extend(relativeTime); 

  const { userName, isAuthenticated } = useSelector(state => state.authReducer);
 
  const [commentsNumber, setCommentsNumber] = useState(amountOfComments); 

  const [showDetails, setShowDetails] = useState(false);

  const [comentModalOpen, setCommentModalOpen] = useState(false);

  const [openEditPostModal, setOpenEditPostModal] = useState(false);

  const handleCommentModal = () => {
    isAuthenticated ? setCommentModalOpen(prev => !prev) : dispatch(loginModalOpen());
  };

  const editPostModal = () => {
    setOpenEditPostModal(prev => !prev);
  };


  const dispatch = useDispatch(); 

  return ( 
    <>  
        <EditPostModal postToEdit={post} postId={postId} openEditPostModal={openEditPostModal} editPostModal={editPostModal} />
        <CommentModal  postId={postId} postCreator={userId} title={title} amountOfComments={commentsNumber} setCommentsNumber={setCommentsNumber} comentModalOpen={comentModalOpen} handleCommentModal={handleCommentModal}/>   
        <Card className={card}>
          <Box className={avatarAndText}>
            <Box style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between"}}>
              {userIsOnline && <PulsingGreenBall/>}
              <img
                className={userAvatar}
                src={avatar}
                alt="avatar"
              />
              <UserRanking creatorAmountOfPosts={creatorAmountOfPosts}/>
              <Box className={friendBtnContainer}>
                <AddFriend creatorUserName={creatorUserName} avatar={avatar}/>
                <AddFriend creatorUserName={creatorUserName} avatar={avatar}/>
                <AddFriend creatorUserName={creatorUserName} avatar={avatar}/>
              </Box>
            </Box>
            <Box className={postInfo}> 
              <CSSTransition in={showDetails} timeout={500} unmountOnExit={true} classNames="userInfo">
                <UserDetails avatar={avatar} creatorUserName={creatorUserName} setShowDetails={setShowDetails}/> 
              </CSSTransition>
              <Typography
                  className={postTitle}
                  paragraph={true}
                  target="_blank"
                  variant="h6"
                  color="primary"
                >
                  {title}
              </Typography>
              <Typography  variant="body2">{post}</Typography>
              <Box className={creatorAndDate}>
                <ClickAwayListener onClickAway={() => setShowDetails(false)}>
                  <Typography
                    className={creator}
                    onClick={() => setShowDetails(true)}
                    color="primary"
                    >
                    {creatorUserName}
                  </Typography> 
                </ClickAwayListener>
                <time>
                  <Typography className={createdAt}>
                    {dayjs(date).fromNow()}
                  </Typography>
                </time>
              </Box>
              </Box>
            </Box>
          <Box className={btns}>
            <Box className={likeDislikeBtns}>
              <LikeBtn postId={postId} title={title} postCreator={userId} creatorUserName={creatorUserName} likes={likes}/>
              <DislikeBtn postId={postId} dislikes={dislikes}/>
            </Box>
            <Box className={restOfBtns}>
                {!singlePost && <GoToPost postId={postId}/>}
                <AddComment postId={postId} handleCommentModal={handleCommentModal}/> 
                <AddFavorite postId={postId} userId={userId} title={title} post={post} userName={userName} amountOfComments={amountOfComments} date={date} />
              <Box className={userName !== creatorUserName ? editAndDeletePostHidden : editAndDeletePostVisible}>
                <EditPost postId={postId} editPostModal={editPostModal} />
                <DeletePost postId={postId} title={title}/>
              </Box>   
            </Box>
          </Box>
          <Divider/>
          <CommentSection postId={postId} commentsCount={commentsNumber}/>
        </Card>
    </>
  );
};

export default PostCard;
