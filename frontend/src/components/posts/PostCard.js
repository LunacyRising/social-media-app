import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Card, Divider, Box } from "@material-ui/core";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {  CSSTransition } from 'react-transition-group' 
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import QuillModal from "../QuillModal";
import CommentSection from "../comments/CommentSection";
import LikeDislikeBtns from "./buttons/LikeDislikeBtns";
import FavoriteBtn from "./buttons/FavoriteBtn";
import AddComment from "./buttons/AddComment";
import EditPost from "./buttons/EditPost";
import DeletePost from "./buttons/DeletePost";
import GoToPost from "./buttons/GoToPost";
import UserDetails from "./userDetails/UserDetails";
import PulsingGreenBall from "../PulsingGreenBall";
import UserRanking from "./UserRanking";
import AddFriend from "../friends/AddFriend";
import { loginModalOpen } from "../../actions/modalsActions/login"
import { editPost } from "../../actions/postsActions/editPostAction";
import { createComment } from "../../actions/commentsActions/createComment";

const PostCard = ({
  postId,
  creatorId,
  creatorUserName,
  creatorAmountOfPosts, 
  title,
  text,
  media,
  mediaAlt,
  date,
  amountOfComments, 
  likes,
  dislikes,
  postAvatar,
  userIsOnline,
  singlePost
}) => {
  const useStyles = makeStyles((theme) => ({

    card: {
      margin: "0px auto 30px",
      animation: "drop 1s ease",
      //overflow:"visible",
      width: "100%",
      "@media(min-width: 481px) and (max-width: 768px)" : {
        width: "75%",
      },
      "@media(min-width: 1025px) and (max-width: 1200px)" : {
        width: "85%",
      }
    },
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "95%",
      margin: "auto",
      "@media(min-width: 769px)" : {
        justifyContent: "flex-start",
      }
    },
    leftAndRightWrapper: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
      marginTop: 20,
      "@media(min-width: 769px)" : {
         flexDirection: "row",
         justifyContent: "flex-start",
       }
    },  
    textAndMedia: {
      position: "relative",
      display: "flex",
      alignItems:"center",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      marginTop: 10,
    },
    rankingAndAvatar: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "50%",
      margin: "auto",
      "@media(min-width: 769px)" : {
        margin: "initial",
        width: "auto",
      }
    },
    userAvatarAndGreenBall: {
      position: "relative"
    },  
    userAvatar: {
      padding: 10,
      height: 80,
      width: 80,
      borderRadius: "50%",
      "@media(min-width: 769px)" : {
        height: 100,
        width: 100,
      }
    },
    postTitle: {
        fontSize: 18,
        "@media(min-width: 769px)" : {
          fontSize: 22,
        }
    },
    postText: {
        "@media(min-width: 769px)" : {
          fontSize: 18,
        }
    },
    postInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginTop: 15,
      "@media(min-width: 769px)" : {
        alignItems: "flex-start",
        width: "80%",
        marginTop: 0,
        paddingBottom: 20,
      }
    },
    mediaContainer: {
    width: "80%",
    marginTop: 10
    },  
    mediaStyle: {
      width: "100%",
      height: "100%",
      borderRadius: 5
    }, 
    creatorAndDate: {
        display: "flex",
        marginTop: 20
    },
    creator: {
      fontSize: 12,
      cursor: "pointer",
      "@media(min-width: 769px)" : {
        fontSize: 14,
      },
      '&::after': {
        content: `'|'`,
        marginLeft: 15
      }
    },
    createdAt: {
      marginLeft: 15,
      fontSize: 12,
      "@media(min-width: 769px)" : {
        fontSize: 14,
      },
    },
    btns: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
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
      //display: "flex",
      //alignItems: "center",
      //justifyContent: "space-between",
      //width: "100%",
      marginTop: 15,
     // marginLeft: 10,
    },
  }));
  const classes = useStyles();
  
  const {card, wrapper, rankingAndAvatar, leftAndRightWrapper, textAndMedia, userAvatarAndGreenBall, userAvatar, postInfo, mediaContainer, mediaStyle, postTitle, postText, creatorAndDate, creator, createdAt, btns, editAndDeletePostHidden, editAndDeletePostVisible, likeDislikeBtns,restOfBtns, friendBtnContainer } = classes;

  dayjs.extend(relativeTime); 

  const { t } = useTranslation();

  const { userName, avatar, userId, isAuthenticated } = useSelector(state => state.authReducer);

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

  const editPostBtnText = t("Edit");

  const commentBtnText = t("AddComment");

  const extraInfoPost = {
    text,
    media,
    mediaAlt
  };

  const extraInfoComment = {
    userId,
    userName,
    avatar,
    postCreator: creatorId,
    title,
    amountOfComments
  }

  return ( 
    <>  
        {openEditPostModal && <QuillModal editPostComponent extraInfo={extraInfoPost} btnText={editPostBtnText} text={text} media={media} mediaAlt={mediaAlt} id={postId} openModal={openEditPostModal} closeModal={editPostModal} action={editPost}/>}
        {comentModalOpen && <QuillModal extraInfo={extraInfoComment} btnText={commentBtnText} number={amountOfComments} text={text} media={media} mediaAlt={mediaAlt} id={postId} openModal={comentModalOpen} closeModal={handleCommentModal} action={createComment}/>}
        <Card className={card}>
          <Box className={wrapper}>
            <Box className={leftAndRightWrapper}>
              <Box className={rankingAndAvatar}>
                  <Box className={userAvatarAndGreenBall}>
                    <img
                      className={userAvatar}
                      src={postAvatar}
                      alt="avatar"
                    />
                    {userIsOnline && <PulsingGreenBall/>}
                  </Box>
                  <UserRanking creatorAmountOfPosts={creatorAmountOfPosts}/>
                  <Box className={friendBtnContainer}>
                    <AddFriend creatorUserName={creatorUserName} avatar={postAvatar}/>
                    <AddFriend creatorUserName={creatorUserName} avatar={postAvatar}/>
                    <AddFriend creatorUserName={creatorUserName} avatar={postAvatar}/>
                  </Box>
                </Box>
              <Box className={textAndMedia}>
                <Box className={postInfo}> 
                  <CSSTransition in={showDetails} timeout={500} unmountOnExit={true} classNames="userInfo">
                    <UserDetails avatar={avatar} creatorUserName={creatorUserName}/> 
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
                  <Typography className={postText} variant="body2">{text}</Typography>
                  {<Box className={mediaContainer}>
                    {media && <img className={mediaStyle} loading="lazy" src={media} alt={mediaAlt}/>}
                  </Box>}
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
              </Box>
            <Box className={btns}>
              <Box className={likeDislikeBtns}>
                <LikeDislikeBtns postBtn postId={postId} likes={likes} dislikes={dislikes} title={title} postCreator={creatorId} creatorUserName={creatorUserName}/> 
              </Box>
              <Box className={restOfBtns}>
                  {!singlePost && <GoToPost postId={postId}/>}
                  {isAuthenticated &&
                  <>
                  <AddComment postId={postId} handleCommentModal={handleCommentModal}/> 
                  <FavoriteBtn postId={postId}/>
                  </>
                  }
                <Box className={userName !== creatorUserName ? editAndDeletePostHidden : editAndDeletePostVisible}>
                  <EditPost postId={postId} editPostModal={editPostModal} />
                  <DeletePost postId={postId} title={title}/>
                </Box>   
              </Box>
            </Box>
            <Divider/>
            <CommentSection postId={postId} commentsCount={amountOfComments}/>
          </Box>
        </Card>
    </>
  );
};

export default PostCard;
