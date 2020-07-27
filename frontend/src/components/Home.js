import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Posts from "./posts/Posts";
import PostTextArea from "./posts/PostTextArea";
import NoResults from "./posts/NoResults";
import SnackbarMessages from "./SnackbarMessages";
//import FriendMenu from "./friends/FriendMenu";
import { fetchInitialPosts } from "../actions/postsActions/fetchInitialPosts";


const Home = () => {

  const useStyles = makeStyles((theme) => ({

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
    noMorePosts: {
      textAlign: "center",
      color: theme.palette.primary.main,
      marginBottom: 20
    }
  }));
  const classes = useStyles();

  const { main, noMorePosts } = classes;

  const { messageCode } = useSelector(state => state.messagesReducer);

  const { postsLoading, postsLoading2, maxResults, skip } = useSelector(state => state.postReducer);
  
  // se llego al limite de resultados
  const maxResultsReached = skip >= maxResults; 

  const history = useHistory();

  const { t } = useTranslation();

  //const { isAuthenticated } = useSelector(state => state.authReducer);

  const dispatch = useDispatch()

 
  useEffect(() => {
    dispatch(fetchInitialPosts()); 
  },[]);
  
  return (
    <>
      <main className={main}>
          <PostTextArea />
            {messageCode === 300 && !postsLoading? <NoResults/> : <Posts/>}
            {postsLoading && !postsLoading2 && <CircularProgress size={50}/>}
            {maxResultsReached && messageCode !== 300 && <p className={noMorePosts}>{t("NoMoreResults")}</p>}
            <Login/>
            <Register/>
          {/* isAuthenticated && <FriendMenu/>*/} 
      </main>
      {<SnackbarMessages />}
      {messageCode === 500 && history.push("/error")}
    </>
  );
};

export default Home;
