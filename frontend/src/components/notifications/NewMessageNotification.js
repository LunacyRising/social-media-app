import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Badge } from "@material-ui/core";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PendingMessagesMenu from "./PendingMessagesMenu";
import { saveMessages } from "../../actions/chatActions/saveMessages";

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

    const [ menuOpen, setMenuOpen ] = useState(false);

    useEffect(() => {
        socket.on("answer", (chatMsg)=> {
            dispatch(saveMessages(chatMsg));
        })
    },[])
  
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