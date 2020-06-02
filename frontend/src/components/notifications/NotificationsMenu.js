import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from 'react-transition-group';   
import { deleteNotification } from "../../actions/notificationsActions/deleteNotification";
import { Typography, Divider, Box, IconButton} from "@material-ui/core";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { makeStyles } from "@material-ui/core/styles";
import DeleteAllNotificationsBtn from "./DeleteAllNotificationsBtn";
import {Notification} from "../../styledComponents/Notification";

const NotificationsMenu = () => {
  const useStyles = makeStyles(() => ({ 
    menuItem: {
      position: "relative",
      display: "flex",
      justifyContent:"space-around",
      flexDirection: "column",
    },
    noNotifications: {
      paddingRight: 10,
      paddingLeft: 10,
      padding: 10,
      textAlign: "center",
      whiteSpace: "nowrap"
    },
    noti: {
     paddingLeft: 10,
     marginTop: 25
    },
    createdAt: {
      paddingTop: 5,
      paddingLeft: 10,
      fontSize: 10
    },
    deleteBtn: {
      position: "absolute",
      top: -2,
      right: 2,
      cursor: "pointer"
    },
    deleteIcon: {
      fontSize: 16
    }
  })); 
  const classes = useStyles();

  const {menuItem, noNotifications, noti, createdAt, deleteBtn,deleteIcon} = classes; 

  let { notifications} = useSelector(state => state.notificationsReducer);
 
  const dispatch = useDispatch();
 
 
  const deleteNoti = (id) => { 
    notifications = notifications.filter(noti =>  noti._id !== id);
    dispatch(deleteNotification({notificationId: id, notifications}));
  
  }

  return ( 
    <> 
    <TransitionGroup component={null}>
        {!notifications || notifications.length === 0 ? <Typography className={noNotifications} variant="caption">you dont have any notification</Typography>:
             notifications.map(notification => (
                <CSSTransition
                key={notification._id}
                timeout={500}
                classNames="notification"  
                unmountOnExit={true}
                >
                <>
                  <Notification>
                      <Typography className={noti} variant="caption">{notification.message}</Typography>
                      <Typography  className={createdAt} variant="caption">March 29, 2020</Typography>
                      <IconButton className={deleteBtn} onClick={() => deleteNoti( notification._id)}><HighlightOffOutlinedIcon className={deleteIcon}/></IconButton>
                  </Notification>
                  <Divider />
                </> 
                </CSSTransition>
             ))   
        }
            {/*testAnimation.map(test => (
                <CSSTransition
                key={test.id}
                timeout={500}
                classNames="item"
                >
                <>
                  <Notifications>
                      <Typography className={noti} variant="caption">{test.message}</Typography>
                      <Typography  className={createdAt} variant="caption">{test.date}</Typography>
                      <iconButton className={deleteBtn} onClick={() => deleteNoti( test.id)}><HighlightOffOutlinedIcon className={deleteIcon}/></iconButton>
                      <Divider />
                  </Notifications>
                </> 
                </CSSTransition>
            ))*/} 
            {notifications.length > 0  && <DeleteAllNotificationsBtn/>}
        </TransitionGroup>
    </>
  );
};

export default NotificationsMenu;
