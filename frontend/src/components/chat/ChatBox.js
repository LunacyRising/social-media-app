import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  Divider,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  TextField
} from "@material-ui/core"; 
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 

const ChatBox = ({ userName, avatar, friendId }) => { 

  const useStyles = makeStyles((theme) => ({ 

    chatBoxContainer: {
        position: "relative",
        width: "25%",
        marginRight: 10,
        transition: "0.2s ease-in-out"
    },
    btn:{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        textTransform: "lowercase",
        pointerEvents: "all",
        zIndex: 10,
        '&:hover': {
            backgroundColor: "#8a2af7"
        }
    },
    chat: {
        width: "100%",
        height: 250,
        backgroundColor: "#191919",
        pointerEvents: "all"
    },
    chatClosed: {
        width: "25%",
        marginRight: 10,
        transform: "translateY(87.2%)",
        transition: "0.2s ease-in-out"
    },
    listItem:{
        paddingLeft: 10
    },
    avatarAndText: {
        display: "flex",
        alignItems: "center",
        width: "98%"
    },  
    avatarList: {
        minWidth: "auto",
        marginRight: 10
    },
    friendAvatar: {
        width: 25,
        height: 25
    },
    messageInputContainer: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%"
    },
    messageInput: {
        width: "100%"
    }
  }));
  const classes = useStyles();

  const { chatBoxContainer, btn, chat, chatClosed, listItem, avatarAndText, avatarList, friendAvatar, messageInputContainer, messageInput } = classes;

  const { chatMenuIds } = useSelector(state => state.modalsReducer);

  const friendIdExists =  chatMenuIds.some(id => id === friendId)

  const { t } = useTranslation();

  dayjs.extend(relativeTime);

  const [ chatOpen, setChatOpen ] = useState(true);

  return (
    <>
        {friendIdExists && 
            <Box className={ chatOpen ? chatBoxContainer : chatClosed}>
                <Button className={btn} onClick={() => setChatOpen(prev => !prev)} endIcon={ !chatOpen ? <ExpandLessRoundedIcon/> : <ExpandMoreRoundedIcon/>}>
                    {userName}
                </Button>
                <List className={chat} disableGutters={true}> 
                    <ListItem className={listItem} disableGutters={true}>
                        <Box className={avatarAndText}>
                            <ListItemAvatar className={avatarList}>
                                <Avatar  className={friendAvatar} alt={userName} src={avatar}/>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography color="primary" variant="caption">hola como estas?</Typography>}/>
                        </Box>
                    </ListItem>
                    <Divider/>
                    <Box className={messageInputContainer}>
                        <TextField className={messageInput} label="Say something 🥉" />
                    </Box>
                </List>
            </Box>
        }
    </>
  );
};

export default ChatBox;
