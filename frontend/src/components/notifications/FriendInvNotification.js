import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Badge, Typography, Fade, Box, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { fetchFriendRequests } from "../../actions/friendsActions/fetchFriendRequests";
import { cancelFriendRequest } from "../../actions/friendsActions/cancelFriendRequest";
import { acceptFriendRequest } from "../../actions/friendsActions/acceptFriendRequest";

const FriendInvNotification = () => {

  const useStyles = makeStyles((theme) => ({

    friendRequestIcon:{
        width: 25,
        height: 25,
        marginLeft: 10
    },
    menu:{
        position: "absolute",
        top: 35,
        left: 0,
        width: 200,
    },
    friendRequestNotification:{
        display:"flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: 20, 
        backgroundColor: theme.palette.background.paper
    },
    avatar: {
        width: 30,
        height: 30
    },
    userName:{
        fontSize: 13
    },
    createdAt:{
        fontSize: 12
    },
    notiIcon: {
        color: "white",  
    },
    btn: {
        marginRight: 5,
        fontSize: 10
    },
    btnsContainer:{
        display: "flex", 
        justifyContent: "space-between",
        marginTop: 7
    }
  }));
  const classes = useStyles();

  const { friendRequestIcon,  menu, friendRequestNotification, notiIcon, avatar, userName, createdAt, btn, btnsContainer } = classes;

  const { friendRequests } = useSelector(state => state.friendsReducer);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  dayjs.extend(relativeTime); 

  const [ menuOpen, setMenuOpen ] = useState(false);

  useEffect(() => {
      dispatch(fetchFriendRequests())
  },[])


  return (
    <>  
      <IconButton className={friendRequestIcon} onClick={() => setMenuOpen(true)}> 
            <Badge badgeContent={friendRequests.length} color="primary">
                <PersonOutlineRoundedIcon  className={notiIcon}/>
            </Badge>
            {menuOpen &&
            <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
                <List className={menu}>
                    {friendRequests.length >= 1 &&
                    friendRequests.map(request =>(
                    <ListItem className={friendRequestNotification} disableGutters={true}>
                        <Box style={{display: "flex", alignItems: "center", width: "97%", marginLeft:"3%"}}>
                            <ListItemAvatar style={{minWidth: "auto", marginRight: 5}}>
                                <Avatar  className={avatar} alt={request.userName} src={request.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={<Typography className={userName}>{request.userName}</Typography>}
                            secondary={<Typography className={createdAt}>{dayjs(request.createdAt).fromNow()}</Typography>}/>
                        </Box>
                        <Box className={btnsContainer}>
                            <Button
                            className={btn}
                            onClick={() => dispatch(cancelFriendRequest(request._id))}
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<CancelRoundedIcon />}
                            >
                            {t("Cancel")}
                            </Button>

                            <Button
                            className={btn}
                            onClick={() => dispatch(acceptFriendRequest(request._id, request.userId))}
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<AddCircleOutlineRoundedIcon />}
                            >
                            {t("Accept")}
                            </Button>
                        </Box>
                    </ListItem>
                    ))}
                </List >
            </ClickAwayListener>}
        </IconButton> 
    </>
  );
};

export default FriendInvNotification;
