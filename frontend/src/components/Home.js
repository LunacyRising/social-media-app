import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SortPosts from "./posts/SortPosts";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Posts from "./posts/Posts";
import PostTextArea from "./posts/PostTextArea";
import SnackbarMessages from "./SnackbarMessages";
import FriendMenu from "./friends/FriendMenu";
import LoadMoreBtn from "./posts/buttons/LoadMoreBtn";
import { fetchPosts } from "../actions/postsActions/fetchPostsAction";

const Home = () => {

  const useStyles = makeStyles(() => ({

    main: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "90%",
      margin: "auto",
      "@media(min-width: 1024px) and (max-width: 1200px)" : {
        width: "70%"
      },
      "@media(min-width: 1201px)" : {
        width: "50%"
      }
    },
    postsContainer: {
      width: "100%"
    },
    spinner: { 
      textAlign: "center"
    }
  }));
  const classes = useStyles();

  const { main, postsContainer } = classes;

  const { messageCode } = useSelector(state => state.messagesReducer);

  const { posts, amountOfPosts, skip ,} = useSelector(state => state.postReducer);

  const history = useHistory();

  //const { isAuthenticated } = useSelector(state => state.authReducer);

  const dispatch = useDispatch()

  const getPosts = () => {
    amountOfPosts >= skip &&
    dispatch(fetchPosts()) 
  }

  useEffect(() => {
    getPosts();
  }, []);


  /*useEffect(() => {
    dispatch(fetchFriends())
  },[])*/

  

  return (
    <>
      <main className={main}>
          <PostTextArea />
            <section className={postsContainer}>
              <SortPosts/>
              <Posts posts={posts}/>
              <Login/>
              <Register/>
            </section>
          {/* isAuthenticated && <FriendMenu/>*/}
          { amountOfPosts >= skip && <LoadMoreBtn/>}
      </main>
      {<SnackbarMessages />}
      {messageCode === 500 && history.push("/error")}
    </>
  );
};

export default Home;
