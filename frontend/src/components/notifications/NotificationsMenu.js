import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from 'react-transition-group';  
import { makeStyles } from "@material-ui/core/styles"; 
import { Typography, Divider, IconButton} from "@material-ui/core";
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import DeleteAllNotificationsBtn from "./DeleteAllNotificationsBtn";
import { deleteNotification } from "../../actions/notificationsActions/deleteNotification";
import { Notification } from "../../styledComponents/Notification";
import dayjs from "dayjs";

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
     padding: 10,
     marginTop: 14
    },
    createdAt: {
      paddingTop: 5,
      paddingBottom: 10,
      paddingLeft: 10,
      fontSize: 10
    },
    deleteBtn: {
      position: "absolute",
      top: -2,
      right: 2,
      width: 20,
      height: 20,
      cursor: "pointer"
    },
    deleteIcon: {
      fontSize: 16
    }
  })); 
  const classes = useStyles();

  const { noNotifications, noti, createdAt, deleteBtn, deleteIcon } = classes; 

  let { notifications} = useSelector(state => state.notificationsReducer);
 
  const dispatch = useDispatch();

  const deleteNoti = (id) => { 
    dispatch(deleteNotification({ notificationId: id }));  
  
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
                      <Typography  className={createdAt} variant="caption">{dayjs(notification.createdAt).format("DD-MMMM-YYYY")}</Typography>
                      <IconButton className={deleteBtn} onClick={() => deleteNoti( notification._id)}><HighlightOffOutlinedIcon className={deleteIcon}/></IconButton>
                  </Notification>
                  <Divider />
                </> 
                </CSSTransition>
             ))   
         }
            {notifications.length > 0  && <DeleteAllNotificationsBtn/>}
        </TransitionGroup>
    </>
  );
};

export default NotificationsMenu;
