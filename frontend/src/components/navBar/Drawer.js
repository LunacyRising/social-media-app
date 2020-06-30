import React  from "react";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Box } from "@material-ui/core";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AdminPanel from "./navLinks/adminBtn/AdminPanel";
import LoginBtn from "./navLinks/authBtns/LoginBtn";
import RegisterBtn from "./navLinks/authBtns/RegisterBtn";
import LogoutBtn from "./navLinks/authBtns/LogoutBtn";
import DarkModeSwich from "./darkMode/DarkModeSwich";
import FavoritesBtn from "./navLinks/userBtns/FavoritesBtn";
import EditProfileBtn from "./navLinks/userBtns/EditProfileBtn";
import GalleriesBtn from "./navLinks/userBtns/GalleriesBtn";
import GalleryBtn from "./navLinks/userBtns/GalleryBtn";
import EngBtn from "./navLinks/translationBtns/EngBtn";
import EsBtn from "./navLinks/translationBtns/EsBtn";
import PortBtn from "./navLinks/translationBtns/PortBtn";
import { closeDrawer } from "../../actions/modalsActions/drawer";

const Drawer = ({ role }) => {


  const useStyles = makeStyles(() => ({

    paper:{
        backgroundColor: "#3b4248"
    }
  }));
  const classes = useStyles();
  const { paper} = classes;


  const { isAuthenticated } = useSelector(state => state.authReducer);

  const { openDrawer } = useSelector(state => state.modalsReducer);

  const dispatch = useDispatch();

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  
    const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }}

    const arr = [
        {
            item: !isAuthenticated && <LoginBtn/>
        },
        {
            item: !isAuthenticated && <RegisterBtn/>
        },
        {
            item: <DarkModeSwich/>
        },
        {
            item:  role === "admin" && <AdminPanel/>
        },
        {
            item: isAuthenticated && <FavoritesBtn/>
        },
        {
            item: isAuthenticated && <EditProfileBtn/>
        },
        {
            item: isAuthenticated && <GalleryBtn/>
        },
        {
            item: <GalleriesBtn/>
        },
        {
            item: 
            <Box>
                <EngBtn/>
                <EsBtn/>
                <PortBtn/>
            </Box>
        },
        {
            item: isAuthenticated && <LogoutBtn/>
        }
    ]
 

    return (
            <>
                <SwipeableDrawer
                classes={{ paper: paper }}
                anchor={"right"}
                open={openDrawer}
                onClose={() => dispatch(closeDrawer())}
                onOpen={toggleDrawer(openDrawer)}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                >
                    <List component="nav" aria-label="links">
                        {arr.map((item, index) =>(
                            <ListItem key={index}>
                                {item.item}
                            </ListItem>
                        ))}
                    </List>
                </SwipeableDrawer>
            </>
        )
    }
export default Drawer
