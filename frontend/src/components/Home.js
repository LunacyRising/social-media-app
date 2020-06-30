import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Posts from "./posts/Posts";
import PostTextArea from "./posts/PostTextArea";
import NoPostFound from "./posts/NoPostFound";
import SnackbarMessages from "./SnackbarMessages";
//import FriendMenu from "./friends/FriendMenu";
import { fetchInitialPosts } from "../actions/postsActions/fetchInitialPosts";

const Home = () => {

  const useStyles = makeStyles(() => ({

    main: {
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
    noResults: { 
      textAlign: "center"
    },
    spinner: {
      position: "absolute",
      left: "49%"
    }
  }));
  const classes = useStyles();

  const { main, postsContainer, noResults, spinner } = classes;

  const { messageCode } = useSelector(state => state.messagesReducer);

  const { amountOfPosts, postsLoading } = useSelector(state => state.postReducer);

  const history = useHistory();

  //const { isAuthenticated } = useSelector(state => state.authReducer);

  const dispatch = useDispatch()

 
  useEffect(() => {
    dispatch(fetchInitialPosts()); 
  },[]);
  
  
  return (
    <>
      <main className={main}>
          <PostTextArea />
            <section className={postsContainer}>
              {messageCode === 300 && !postsLoading? <NoPostFound/> : <Posts/>}
              {postsLoading && <CircularProgress className={spinner} size={50}/>}
              <Login/>
              <Register/>
            </section>
          {/* isAuthenticated && <FriendMenu/>*/} 
      </main>
      {<SnackbarMessages />}
      {messageCode === 500 && history.push("/error")}
    </>
  );
};

export default Home;
