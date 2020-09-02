import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Badge } from "@material-ui/core";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PendingMessagesMenu from "./PendingMessagesMenu";
import { saveMessages } from "../../actions/chatActions/saveMessages";
import { changeMessageStatus2 } from "../../actions/chatActions/changeMessageStatus";

const NewMessageNotification = () => {

    const useStyles = makeStyles(() => ({

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

    const { notiIcon, btn } = classes;

    const { t } = useTranslation();

    const dispatch = useDispatch()

    const { socket } = useSelector(state => state.ioReducer);
    
    const { messagesNotifications } = useSelector(state => state.notificationsReducer);

    const { chatBoxes } = useSelector(state => state.chatReducer);

    const [ menuOpen, setMenuOpen ] = useState(false);

    const boxesRef = useRef();

    useEffect(() => {
        boxesRef.current = chatBoxes
    },[chatBoxes])

    const chatBoxExists = (personId) => {
        return boxesRef.current.some(person => person.id === personId )
    }

    const receiveMessage2 = (data) => {
        const { senderId } = data
        if(!chatBoxExists(senderId)){
            dispatch(saveMessages({...data, messageStatus: "unseen"}));
       } 
    }

    useEffect(() => {
        socket.on("receive-message", receiveMessage2)
        return () => {
            socket.removeListener("receive-message", receiveMessage2);
        }
    },[socket])

    const messageSeenConfirmed2Listener = (data) => {
        const { messages } = data
        dispatch(changeMessageStatus2(messages))
    }

    useEffect(() => {
        socket.on("message-seen-confirmed-2", messageSeenConfirmed2Listener)
        return () => {
            socket.removeListener("message-seen-confirmed-2", messageSeenConfirmed2Listener);
        }
    },[socket])
  
    return(
        <> 
            <IconButton className={ btn } onClick={() => setMenuOpen(prev => !prev)}> 
                <Badge badgeContent={messagesNotifications.length} color="primary">
                    <ChatBubbleOutlineOutlinedIcon  className={notiIcon}/>
                </Badge>
                <PendingMessagesMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} messagesNotifications={messagesNotifications}/>
            </IconButton> 
        </>
    )
}

export default React.memo(NewMessageNotification)