import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { fetchPost } from "../../actions/postsActions/fetchSinglePostAction" 
import Login from "../auth/Login";
import Register from "../auth/Register";
import PostCard from "./PostCard";
import SnackbarMessages from "../SnackbarMessages";


const SinglePostPage = ({ match }) => {

    const useStyles = makeStyles(() => ({

        container: {
            display: "flex",
            justifyContent:"center",
            margin: "50vh auto 0",
            transform: "translateY(-50%)",
            width: "80%",
            height: "100%"
        }
      })); 
      
    const classes = useStyles();
    
    const { container } = classes;

    const postId = match.params.postId

    const dispatch = useDispatch(); 

    useEffect(() => {
    dispatch(fetchPost(postId));
    }, []);

  const { post } = useSelector(state => state.postReducer);

  const { isAuthenticated } = useSelector(state => state.authReducer);

  return (
    <>  
        <Box className={container}>
            <PostCard 
            singlePost
            avatar={post.avatar} 
            post={post.post} 
            creatorUserName={post.userName} 
            creatorAmountOfPosts={post.creatorAmountOfPosts} 
            title={post.title} 
            date={post.date}  
            amounOfComments={post.amounOfComments}
            postCreator={post.userId}
            postId={post._id}
            likes={post.likes}
            dislikes={post.dislikes}
            userIsOnline={post.userIsOnline}
            postToEdit={post.post}
            />
        </Box>
        {<SnackbarMessages/>}
        { !isAuthenticated && <Login/> }
        { !isAuthenticated && <Register/> }
    </>
  );
};

export default SinglePostPage;
