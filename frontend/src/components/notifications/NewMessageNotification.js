import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Badge } from "@material-ui/core";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
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
    
    const { pendingMessages, chatMessages } = useSelector(state => state.chatReducer);

    useEffect(() => {
        socket.on("answer", (chatMsg)=> {
            dispatch(saveMessages(chatMsg));
        })
    },[])
  
    return(
        <> 
            <IconButton className={ btn }> 
                <Badge badgeContent={pendingMessages.length} color="primary">
                    <ChatBubbleOutlineOutlinedIcon  className={notiIcon}/>
                </Badge>
            </IconButton> 
        </>
    )
}

export default React.memo(NewMessageNotification)