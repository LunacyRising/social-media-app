import React from "react";
import { AppBar, Avatar, Box, Button, IconButton, } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../actions/authActions/logoutAction";
import { openDrawer } from "../../actions/modalsActions/drawer";
import DarkModeSwich from "./darkMode/DarkModeSwich";
import Notifications from "../notifications/Notifications";
import LoginBtn from "./navLinks/authBtns/LoginBtn";
import RegisterBtn from "./navLinks/authBtns/RegisterBtn";
import Drawer from "./Drawer";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const useStyles = makeStyles(() => ({

    navBar: {
      background: "#3b4248",
      boxShadow: "0 3px 5px 2px #8b70d2",
      display: "flex",
      flexDirection: "row", 
      height: "10vh",
      justifyContent: "space-around",
      alignItems: "center"
    },
    links: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
      transition: "0.1s ease all",
      paddingBottom: 5,
      "&:hover": {
        textDecoration: "none",
        color: "#8b70d2",
      }
    },
    homeLink: {
      marginTop: 5,
      animation: "aside 1.3s ease-in" 
    },
    btn: {
      display:"flex",
      alignItems: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textTransform: "uppercase",
      transition: ".2s ease all",
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
      animation: "aside2 1.3s ease-in",
      "@media(max-width: 768px)" : {
        display: "none"
     }
    },
    hamburger: {
      animation: "aside2 1.3s ease-in",
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

  const history = useHistory();

  const dispatch = useDispatch();

  const logoutDispatch = () => {
    dispatch(logoutAction());
    history.push("/logingOut");
  }

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
      <Button style={{color: "white", fontWeight: "bold"}} onClick={() => dispatch(openDrawer())}>
        {userName}
      </Button>
      <Notifications/>
    </Box>

  return (
    <>
      <nav>
        <AppBar className={navBar} position="fixed">
            <Link className={`${links} ${homeLink}`} to="/"> 
              Home
            </Link>
            <SearchBar/>
            <Box>
            {!isAuthenticated && auth}
              <Box className={`${btn} ${hamburger}`}>
                {!isAuthenticated ?
                <IconButton  style={{color: "white"}} onClick={() => drawerDispatch()}>
                  <MenuIcon/>
                </IconButton>
                :
                <IconButton onClick={() => drawerDispatch()}>
                  <Avatar src={avatar} alt="profile pic"/>
                </IconButton>}
                {isAuthenticated && <Notifications/>}
              </Box>
              {isAuthenticated && loggedInBtns}
              {<Drawer role={role}/>}
            </Box>
        </AppBar>
      </nav>
    </>
  );
};

export default Navbar;
