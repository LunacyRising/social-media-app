import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getNotifications} from "../../actions/notificationsActions/getNotifications";
import NotificationsMenu from "./NotificationsMenu";
import { IconButton, Badge, Menu, Fade } from "@material-ui/core";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { makeStyles } from "@material-ui/core/styles";

const Notifications = () => {
  const useStyles = makeStyles(() => ({
    menu: {
        //marginTop: 10,
        //padding: "0px"
    },
    notiContainer: {
     // position: "absolute",
     // right: 0,
      transition: "ease"

    },
    notiIcon: {
        color: "white",  
    },
    btn: {
      width: 25,
      height: 25,
      marginLeft: 10
    }
  }));
  const classes = useStyles();

  const { notiContainer, notiIcon, btn} = classes;

  const { notifications} = useSelector(state => state.notificationsReducer);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  //const [open, setOpen] = useState(false);
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getNotifications()) 
  },[])

  return (
    <>  
      <IconButton className={ btn } onClick={handleClick}> 
            <Badge badgeContent={notifications && notifications.length} color="primary">
                <NotificationsNoneIcon  className={notiIcon}/>
            </Badge>
        </IconButton> 
      <Menu
          className={notiContainer}
          getContentAnchorEl={null}
          MenuListProps={{ style: { padding: 4 } }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
            <NotificationsMenu/>
        </Menu> 
    </>
  );
};

export default Notifications;
