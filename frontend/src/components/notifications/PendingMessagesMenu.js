import React from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { makeStyles } from "@material-ui/core/styles";
import { Typography,Box, Avatar, ListItemText, List, ListItem } from "@material-ui/core";
import { createChatBox } from "../../actions/chatActions/createChatBox";

const PendingMessagesMenu = ({ menuOpen, setMenuOpen, messagesNotifications }) => {

  const { darkMode } = useSelector(state => state.darkModeReducer);

  const useStyles = makeStyles((theme) => ({

    menu:{
        position: "absolute",
        top: 35,
        width: 300,
        right: -70,
        padding: 0,
        "@media(min-width: 768px)" : {
            top: 47,
            right: "initial"
        },
    },
    menuItem: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 10,
        backgroundColor: darkMode ? "#232b2b" : theme.palette.background.paper
    },
    avatarAndText: {
        display: "flex"
    },
    avatar: {
        width: 30,
        height: 30,
        margin: "8px 10px 0px 0px"
    },
    messageTime: {
        color: "white"
    },
    userName:{
        fontSize: 14,
        color: theme.palette.secondary.dark,
        marginBottom: 10
    },
    textMessage: {
        fontSize: 12,
        lineHeight: 1.8,
        wordBreak: "break-word"
    }
  }));
  const classes = useStyles();

  const { menu, menuItem, avatarAndText, messageTime, avatar, userName, textMessage, } = classes;

  const { chatBoxes } = useSelector(state => state.chatReducer);

  const dispatch = useDispatch();

  dayjs.extend(relativeTime); 

  const chatBoxExists = (personId) => {
    return chatBoxes.some(person => person.id === personId )
}

  const createSingleChatBox = (personId, personInfo) => {
    !chatBoxExists(personId) && dispatch(createChatBox(personInfo))
}

  return (
    <>  
        {menuOpen &&
        <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
            <List className={menu}>
                {messagesNotifications.length > 0 &&
                messagesNotifications.map(message =>(
                <ListItem className={menuItem}  onClick={() => createSingleChatBox(message.senderId, {id: message.senderId, userName: message.sender, personAvatar: message.avatar})} disableGutters={true}>
                        <Typography className={messageTime} variant="caption">
                            {dayjs(message.sendedAt).fromNow()}
                        </Typography>
                        <Box className={avatarAndText}>
                            <Avatar className={avatar} alt={message.userName} src={message.avatar} />
                            <ListItemText primary={<Typography className={userName}>{message.sender}</Typography>}
                            secondary={<Typography className={textMessage}>{message.chatMessage}</Typography>}/>
                        </Box>
                </ListItem>
                ))}
            </List >
        </ClickAwayListener>}
    </>
  );
};

export default PendingMessagesMenu;
