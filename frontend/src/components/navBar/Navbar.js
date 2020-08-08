import React from "react";
import { useTranslation } from "react-i18next";
import { AppBar, Avatar, Box, Button, IconButton, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openDrawer } from "../../actions/modalsActions/drawer";
import purple from "../../utils/images/purple.svg";
import DarkModeSwich from "./darkMode/DarkModeSwich";
import EngBtn from "./navLinks/translationBtns/EngBtn";
import EsBtn from "./navLinks/translationBtns/EsBtn";
import PortBtn from "./navLinks/translationBtns/PortBtn";
import Notifications from "../notifications/Notifications";
import FriendInvNotification from "../notifications/FriendInvNotification";
import LoginBtn from "./navLinks/authBtns/LoginBtn"; 
import RegisterBtn from "./navLinks/authBtns/RegisterBtn";
import Drawer from "./Drawer";
import SearchBar from "./SearchBar";
import { ThemeConsumer } from "styled-components";

const Navbar = () => {

  const { role, isAuthenticated, userName, avatar} = useSelector(store => store.authReducer);
  
  const useStyles = makeStyles((theme) => ({ 

    navBar: {
      position: "relative",
      background: "#3b4248",
      boxShadow: "0 3px 5px 2px #8b70d2",
      display: "flex",
      flexDirection: "row", 
      height: "8vh",
      justifyContent: "space-between",
      alignItems: "center",
      "@media(min-width: 768px)" : {
        justifyContent: "space-around",
        height: "10vh",
     }
    },
    homeLinkContainer: {
      display: "flex",
      alignItems: "center",
      animation: "aside 1.3s ease-out"
    },
    homeLink: {
      cursor: "pointer",
      width: 45,
      height: 45,
      marginLeft: 15,
      "@media(min-width: 1024px)" : {
        marginRight: 280
      }
    },
    user:{
      display: "none",
      "@media(min-width: 768px)" : {
        display: "block",
        marginRight: 80,
        marginLeft: 5
     }
    },
    authBtnsContainer: {
      display: "none",
      "@media(min-width: 1024px)" : {
        display: "flex",
        alignItems: "center",
        animation: "aside2 1.3s ease-out",
      }
    },
    langBtnsContainer: {
      display: "none",
      "@media(min-width: 1200px)" : {
        display: !isAuthenticated && "flex",
        alignItems: "center",
        animation: "aside2 1.3s ease-out",
      }
    },
    hamburger: {
      width: 30,
      height: 30,
      color: "white",
      transition: "0.2s ease-in-out",
      animation: "aside2 1.3s ease-out",
      "&:hover":{
        color: theme.palette.primary.main
      },
        "@media(min-width: 1200px)" : {
        display: !isAuthenticated && "none"
      }
    }
  }));

  const classes = useStyles();
  const {
    navBar,
    homeLinkContainer,
    homeLink,
    user,
    authBtnsContainer,
    langBtnsContainer,
    hamburger
  } = classes; 

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
   
  const auth = 
    <Box className={`${authBtnsContainer}`}>
      <LoginBtn/>
      <RegisterBtn/>
    </Box>

  
  const langBtns = 
  <Box className={langBtnsContainer}>
    <EngBtn/>
    <EsBtn/>
    <PortBtn/>
  </Box>

  return (
    <>
      <nav>
        <AppBar className={navBar} position="fixed">
            <Box className={homeLinkContainer}>
              <IconButton className={homeLink} component={Link} to="/">
                <img src={purple} width={40} height={40} alt="logo"/>
              </IconButton>
              <SearchBar/>
            </Box>
            {langBtns}
            {!isAuthenticated && auth}
            <Box style={{ marginRight: 10}}>
              <IconButton className={hamburger} onClick={() => dispatch(openDrawer())}>
                  {!isAuthenticated ? <MenuIcon/> : 
                  <>
                    <Avatar src={avatar} alt="profile pic"/>
                    <Typography className={user}>{userName}</Typography>
                  </>
                  }
              </IconButton>
              {isAuthenticated &&
                <>
                  <FriendInvNotification/>
                  <Notifications/>
                </>
              }
            </Box>
            <Drawer role={role}/>
        </AppBar>
      </nav>
    </>
  );
};

export default Navbar;
