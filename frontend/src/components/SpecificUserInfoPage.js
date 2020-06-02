import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import {fetchUserAction} from "../actions/userActions/fetchUserAction";
import {fetchPostsByUser} from "../actions/postsActions/fetchPostsByUser";
import SnackbarMessages from "../components/SnackbarMessages";
import {
  Typography,
  Button,
  Card,
  Tooltip,
  Divider,
  Grid,
  CircularProgress,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const SpecificUserInfoPage = ({match}) => {

  const useStyles = makeStyles(() => ({
    cardContainer: {
      marginTop: "15vh",
      animation: "drop 1s ease",
      transition: "0.5s ease all",
      display: "flex",
      flexDirection: "column"
    },
    dark: {
      backgroundColor: "#43494E",
      backgroundImage: `url(${"https://www.transparenttextures.com/patterns/cubes.png"})`,
    },
    cardTest: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: 15,
      marginTop: 3,
    },
    noHover: {
      "&:hover": {
        backgroundColor: "transparent",
        textDecoration: "none",
        color: "#3b4248"
      }
    },
    btns: {
      paddingTop: 20,
      display: "flex",
      justifyContent: "space-between"
    },
    hidden: {
      display: "none"
    },
    imgAndDetails: {
      display: "flex",
      padding: 10,
    },
    imgBorder: {
      padding: 10
    },
    text: {
      fontFamily: "Righteous"
    }
  }));
  const classes = useStyles();
  const {
    cardTest,
    dark,
    noHover,
    cardContainer,
    btns,
    hidden,
    imgAndDetails,
    imgBorder,
    text
  } = classes;
  /////////////////////////////////////////////////////////
  dayjs.extend(relativeTime);
  dayjs.extend(LocalizedFormat);
  /////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const usersReducer = useSelector(state => state.fetchUsersReducer);
  const darkModeReducer = useSelector(state => state.darkModeReducer);
  //////////////////////////////////////////////////////////////////
  const {darkMode} = darkModeReducer
  const {user, isLoading} = usersReducer;
  //const {userName, avatar, date} = user
  const { token } = authReducer;
  /////////////////////////////////////////////////////////
  const userId = match.params.userId
  /////////////////////////////////////////////////////////
  useEffect(() =>{
    dispatch(fetchUserAction({token,userId}))
  },[])

  useEffect(() =>{
    dispatch(fetchPostsByUser({token,userId}))
  },[])

  return (
    <>
    
      <Grid className={darkMode && dark} container>
        <Grid item xs={2}>
              
        </Grid>
        <Grid item xs={3}>
        {/*!user || isLoading ? 
        <CircularProgress size={100}/>
          : 
          <Card className={cardContainer}>
            <img src={user.avatar} width={100} height={100} alt="avatar"/>
            <Typography>
              {user.userName}
            </Typography>
            <Tooltip title={formatDate}>
              <Typography>
                {dayjs(user.date).format("LL")}
              </Typography>
            </Tooltip>
        </Card>*/}
        </Grid>
        <Grid item xs={5}>
            
        </Grid>
        <Grid item xs={2}>
            
        </Grid>
      </Grid>
    </>
  );
};

export default SpecificUserInfoPage;
