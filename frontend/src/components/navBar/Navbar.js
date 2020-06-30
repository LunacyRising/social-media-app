import React from "react";
import { useTranslation } from "react-i18next";
import { AppBar, Avatar, Box, Button, IconButton } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openDrawer } from "../../actions/modalsActions/drawer";
import purple from "../../utils/images/purple.svg";
import DarkModeSwich from "./darkMode/DarkModeSwich";
import Notifications from "../notifications/Notifications";
import LoginBtn from "./navLinks/authBtns/LoginBtn"; 
import RegisterBtn from "./navLinks/authBtns/RegisterBtn";
import Drawer from "./Drawer";
import SearchBar from "./SearchBar";

const Navbar = () => {
  
  const useStyles = makeStyles(() => ({ 

    navBar: {
      position: "relative",
      background: "#3b4248",
      boxShadow: "0 3px 5px 2px #8b70d2",
      display: "flex",
      flexDirection: "row", 
      height: "10vh",
      justifyContent: "space-between",
      alignItems: "center",
      "@media(min-width: 768px)" : {
        justifyContent: "space-around"
     }
    },
    links: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
      transition: "0.1s ease all",
      "&:hover": {
        textDecoration: "none",
        color: "#8b70d2",
      }
    },
    homeLink: {
      animation: "aside 1.3s ease-out",
      cursor: "pointer",
      width: 45,
      height: 45,
      marginLeft: 15
    },
    btn: {
      display:"flex",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textTransform: "uppercase",
      transition: ".2s ease-out",
      marginRight: 10,
      "&:hover": {
        textDecoration: "none",
        color: "#8b70d2",
        backgroundColor: "transparent"
      },
    },
    authBtnsContainer: {
      display: "flex",
      alignItems: "center",
      animation: "aside2 1.3s ease-out",
      "@media(max-width: 768px)" : {
        display: "none"
     }
    },
    hamburger: {
      animation: "aside2 1.3s ease-out",
      "@media(min-width: 769px)" : {
       display: "none"
    }
    },
    loggedIn: {
      display: "none",
      "@media(min-width: 769px)" : {
        display: "flex"
     }
    },
    loggedInBtnsContainer: {
      display: "none",
      alignItems: "center",
      "@media(min-width: 769px)" : {
        display: "flex"
     }
    }
  }));

  const classes = useStyles();
  const {
    navBar,
    links,
    homeLink,
    btn,
    authBtnsContainer,
    hamburger,
    loggedIn,
    loggedInBtnsContainer
  } = classes; 

  const { role, isAuthenticated, userName, avatar} = useSelector(store => store.authReducer);

  const { t, i18n } = useTranslation();

    const changeLang = (language) => {
    i18n.changeLanguage(language);
  }

  const dispatch = useDispatch();

  const drawerDispatch = () => {
    dispatch(openDrawer())
  }
   
  const auth = 
    <Box className={`${authBtnsContainer} ${loggedIn}`}>
      <LoginBtn/>
      <RegisterBtn/>
      <DarkModeSwich/>
    </Box>

  const loggedInBtns = 
    <Box className={loggedInBtnsContainer}>
      <Avatar src={avatar} alt="profile pic"/>
      <Button style={{color: "white", fontWeight: "bold"}} onClick={() => drawerDispatch()}>
        {userName}
      </Button>
      <Notifications/>
    </Box>

  return (
    <>
      <nav>
        <AppBar className={navBar} position="fixed">
            <IconButton className={`${links} ${homeLink}`} component={Link} to="/">
             <img src={purple} width={40} height={40} alt="logo"/>
            </IconButton>
            <SearchBar/>
            <Box>
            {!isAuthenticated && auth}
              <Box className={`${btn} ${hamburger}`}>
                {!isAuthenticated ?
                <IconButton  style={{color: "white"}} onClick={() => drawerDispatch()}>
                  <MenuIcon/>
                </IconButton>
                :
                <IconButton style={{width: 40, height: 40}} onClick={() => drawerDispatch()}> 
                  <Avatar src={avatar} alt="profile pic"/>
                </IconButton>}
                {isAuthenticated && <Notifications/>}
              </Box>
              {isAuthenticated && loggedInBtns}
              <Drawer role={role}/>
            </Box>
        </AppBar>
      </nav>
    </>
  );
};

export default Navbar;
