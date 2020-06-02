import React  from "react";
import {useDispatch, useSelector} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem , ListItemIcon, Divider} from "@material-ui/core";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import LoginBtn from "./navLinks/authBtns/LoginBtn";
import RegisterBtn from "./navLinks/authBtns/RegisterBtn";
import LogoutBtn from "./navLinks/authBtns/LogoutBtn";
import DarkModeSwich from "./darkMode/DarkModeSwich";
import FavoritesBtn from "./navLinks/userBtns/FavoritesBtn";
import EditProfileBtn from "./navLinks/userBtns/EditProfileBtn";
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
            item: isAuthenticated && <FavoritesBtn/>
        },
        {
            item: isAuthenticated && <EditProfileBtn/>
        },
        {
            item: isAuthenticated && <LogoutBtn/>
        },
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
                        {arr.map(item =>(
                            <ListItem>
                                {item.item}
                            </ListItem>
                        ))}
                    </List>
                </SwipeableDrawer>
            </>
        )
    }
export default Drawer
