import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Avatar,
  Box,
  List,
  ListItem,
  CircularProgress,
  Tooltip,
  Button,
} from "@material-ui/core"; 
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 
import useSound from 'use-sound';
import alerta from "../../utils/sounds/alerta.mp3";
import InputField from "./InputField";
import GifsMenu from "../posts/GifsMenu";
import EmojisMenu from "../posts/emojis/EmojisMenu";
import UploadImageBtn from "../posts/mediaBtns/UploadImageBtn";
import SearchGif from "../posts/mediaBtns/SearchGif";
import SearchEmoji from "../posts/emojis/SearchEmoji";
import DeleteChatBox from "./btns/DeleteChatBox";
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import DoneAllRoundedIcon from '@material-ui/icons/DoneAllRounded';
import ErrorOutlineRoundedIcon from '@material-ui/icons/ErrorOutlineRounded';
import { saveMessages } from "../../actions/chatActions/saveMessages";
import { addImageChat } from "../../helperFunctions/addImageChat";
import { addGifChat } from "../../helperFunctions/addGifChat";
import { addEmojiChat } from "../../helperFunctions/addEmojiChat";
import { changeMessageStatus } from "../../actions/chatActions/changeMessageStatus";
import { changeMessageStatus2 } from "../../actions/chatActions/changeMessageStatus";
import useIoEvents from "../../io/useIoEvents";

const ChatBox = ({ personUserName, personId, personAvatar, chatMessages }) => { 

const [ alert, setAlert ] = useState(false);

  const useStyles = makeStyles((theme) => ({ 

    chatBoxContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#191919",
        transition: "0.2s ease-in-out",
        pointerEvents: "all",
        zIndex: 1500,
        "@media(min-width: 768px)" : {
            position: "relative",
            width: "30%",
            height: "70%",
            alignSelf: "end",
            marginLeft: 20
        },
        "@media(min-width: 1024px)" : {
            width: "25%",
        },
        "@media(min-width: 1200px)" : {
            width: "22%",
            height: "72%"
        }
    },
    chatToggle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%", 
        color: "white",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "4px 4px 0px 0px",
        cursor: "pointer",
        pointerEvents: "all",
        animation: alert && "new-msg 1s infinite",
        '&:hover': {
            backgroundColor: "#8a2af7"
        }
    },
    name: {
        padding: 8
    },
    chat: {
        width: "100%",
        height: 320,
        pointerEvents: "all",
        overflow: "hidden scroll",
        "@media(min-width: 768px)" : {
            height: 250
        },
    },
    avatarChatClosed: {
        alignSelf: "end",
        width: 50,
        height: 50,
        marginBottom: 20,
        border: "solid 3px transparent",
        transform: "translateX(10px)",
        pointerEvents: "all",
        cursor: "pointer",
        transition: "0.2s ease-in-out",
        animation: alert && "new-msg 1s infinite",
        "&:hover":{
            borderColor: "white",
            transform: "translateX(0px)",
        }
    },
    messageTime: {
        marginLeft: 12,
        marginBottom: 5,
        color: "white"
    },
    sendedMessage : {
        justifyContent: "flex-end"
    },
    receivedMessage: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    friendAvatar: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    messageContainer:{
        display: "flex",
        width: "100%"
    },
    message: {
        alignSelf: "center",
        marginRight: 10,
        marginLeft: 10,
        padding: 4,
        borderRadius: 4,
        fontSize: 14,
        wordBreak: "break-word"
    },
    statusIcon: {
        alignSelf: "flex-end",
        color: theme.palette.secondary.dark,
        fontSize: 12,
    },  
    sender:{
        marginRight: 5,
        color: "white",
        backgroundColor: theme.palette.secondary.dark,
    },
    receiver: {
        color: "black",
        backgroundColor: theme.palette.primary.main
    },
    isWrittingMessage:{
        marginTop: 10,
        marginLeft: 10,
        fontSize: 10
    },
    btnsContainer: {
        color: "white",
        width: "90%",
        margin: "15px auto 0px",
        pointerEvents: "all",
        "@media(min-width: 768px)" : {
            marginBottom: 15
        },
    }
    }));

    const classes = useStyles();

    const { chatBoxContainer, chatToggle, name, chat, avatarChatClosed, messageContainer, message, statusIcon, sender, messageTime, sendedMessage, receivedMessage, receiver, isWrittingMessage, friendAvatar, btnsContainer } = classes;

    const { userId, userName, avatar } = useSelector(state => state.authReducer);

    const { socket } = useSelector(state => state.ioReducer);

    const [ chatOpen, setChatOpen ] = useState(true);

    const [ gifstMenuOpen, setGifstMenuOpen ] = useState(false);

    const [ emojisMenuOpen, setEmojisMenuOpen ] = useState(false);

    const [ play ] = useSound(alerta);

    const { t } = useTranslation();

    const chatRef = useRef();

    const playRef = useRef();

    const lastElementRef = useRef();

    dayjs.extend(relativeTime);

    const filteredMessages = chatMessages.filter( msg => msg.senderId === personId && msg.receiverId === userId || msg.senderId === userId && msg.receiverId === personId);

    const dispatch = useDispatch();

    const toggleChat = () => {
        setChatOpen(prev => !prev)
    }

    const newMessageAlert = () => {
        setAlert(true);
        playRef.current()
    }

    const initialValues = {  
        chatMessage: "",
        sender: userName,
        receiver: personUserName,
        senderId: userId,
        receiverId: personId,
        avatar,
        personUserName
    };

    const { values, setValues, messageInfo, handleChange, handleSubmit, writter, isWritting, error, isWrittingEvent, stoppedWrittingEvent, emitStoppedWrittingEvent, messageReceivedEvent, messageSeenConfirmed, emitMessageSeenEvent2, isWrittingListener, stoppedWrittingListener, messageSeenConfirmedListener } = useIoEvents(initialValues)

    const {chatMessage} = values

    useEffect(() => {
        playRef.current = play
    },[play])

    useEffect(() => {
        chatRef.current = chatOpen
    },[chatOpen])

    //recibe el evento del cuando el otro usuario esta escribiendo
    useEffect(() => {
        isWrittingEvent();
        return () => {
            socket.removeListener("is writting", isWrittingListener);
        }
    },[socket])

    //recibe evento cuando se dejo de escribir
    useEffect(() => {
        stoppedWrittingEvent();
        return () => {
            socket.removeListener("stopped writting", stoppedWrittingListener);
        }
    },[socket])

    //emite evento cuando se dejo de escribir
    useEffect(() => {
        emitStoppedWrittingEvent();
        return () => {
            socket.removeListener("stopped writting");
        } 
    },[chatMessage])

    //recibe evento mensaje visto
    useEffect(() => {
        messageReceivedEvent();
        return () => {
            socket.removeListener("message-received-confirmed");
        } 
    },[socket])

    //recibe evento mensaje visto
    useEffect(() => {
        messageSeenConfirmed();
        return () => {
            socket.removeListener("message-seen-confirmed", messageSeenConfirmedListener);
        } 
    },[socket])

    useEffect(() => {
        lastElementRef.current && lastElementRef.current.scrollIntoView({behavior: "smooth"})
    },[chatMessages, chatOpen, isWritting])

   
    //alerta de mensaje cuando el chat esta minimizado
    const receiveMessage = (data) => {
        console.log("data", data)
        const {sender, senderId, clientMsgId} = data;
        if(senderId === personId && chatRef.current){
            socket.emit("message-seen", {sender, clientMsgId, seenAt: Date.now()}, () => {
               dispatch(saveMessages({...data, messageStatus: "seen"}));
               dispatch(changeMessageStatus(clientMsgId, "seen"));
            });
            }else if(senderId === personId && !chatRef.current){
            dispatch(saveMessages({...data, messageStatus: "unseen"}));
            newMessageAlert()
        }
    }
    useEffect(() => {
        socket.on("receive-message", receiveMessage)
        return () => {
            socket.removeListener("receive-message", receiveMessage);
        }
    },[socket])

    const saveMessage = (data) => {
        dispatch(saveMessages(data))
    }

    const removeAlert = () => {
       if(alert){
            setAlert(false)
            const unseenMessages = filteredMessages
            .filter(chat => chat.messageStatus === "unseen")
            .map(msg => {return {clientMsgId: msg.clientMsgId, seenAt: Date.now()}})
            emitMessageSeenEvent2(unseenMessages)
            dispatch(changeMessageStatus2(unseenMessages, userName))
       }
    }

    return (
    <>
        {chatOpen ?
            <Box className={chatBoxContainer}>
                <Box className={chatToggle} onClick={toggleChat}>
                    <Typography className={name}>
                        {personUserName}
                    </Typography>
                    {error && <Typography style={{color: "red", position: "absolute", top: 40, left: "50%", transform: "translatex(-50%)"}}>no hay internet</Typography>}
                    <DeleteChatBox id={personId} setChatOpen={setChatOpen}/>
                </Box>   
                <List className={chat}> 
                    {filteredMessages.map((msg, index) => (
                        <ListItem key={index} className={msg.senderId === personId ? receivedMessage : undefined} disableGutters={true}>
                            {msg.senderId !== userId && 
                            <Typography className={messageTime} variant="caption">
                                {dayjs(msg.sendedAt).fromNow()}
                            </Typography>}
                            <Box className={ msg.senderId === personId ? messageContainer : `${messageContainer} ${sendedMessage}`}>
                                {msg.senderId === personId && <Avatar className={friendAvatar} src={msg.avatar}/>}
                                {msg.chatMessage.includes("cloudinary") || msg.chatMessage.includes("giphy") ?
                                <img style={{ width: "100%"}} className={msg.senderId === userId ? `${message} ${sender}`: `${message} ${receiver}`}src={msg.chatMessage} alt="chat pic"/> :
                                <Typography className={msg.senderId === userId ? `${message} ${sender}`: `${message} ${receiver}`}>
                                    {msg.chatMessage}
                                </Typography>}
                                {msg.messageStatus === "sending" && msg.sender === userName && <CircularProgress className={statusIcon}/>}
                                {msg.messageStatus === "error" && msg.sender === userName && <ErrorOutlineRoundedIcon className={statusIcon}/>}
                                {msg.messageStatus === "sent" && msg.sender === userName && <DoneRoundedIcon className={statusIcon}/>}
                                {msg.messageStatus === "seen" && msg.sender === userName &&
                                <Tooltip title={`visto ${dayjs(msg.seenAt).fromNow()}`}>
                                    <DoneAllRoundedIcon className={statusIcon}/>
                                </Tooltip>
                                }
                            </Box>
                        </ListItem>
                    ))}
                    {isWritting &&
                    <Typography className={isWrittingMessage} color="primary">
                        {`${writter} ${t("Chat.isWritting")}...`}
                    </Typography>}
                    <Box ref={lastElementRef}/>
                </List>
                <InputField chatMessage={chatMessage} removeAlert={removeAlert} handleChange={handleChange} handleSubmit={handleSubmit} filteredMessages={filteredMessages}/>
                <Box className={btnsContainer}>
                    <UploadImageBtn chatBoxComponent func={addImageChat} messageInfo={messageInfo} saveMessage={saveMessage} socket={socket}/>
                    <SearchGif chatBoxComponent func={addGifChat} messageInfo={messageInfo} saveMessage={saveMessage} socket={socket} setGifstMenuOpen={setGifstMenuOpen}/>
                    <SearchEmoji chatBoxComponent setEmojisMenuOpen={setEmojisMenuOpen}/>
                </Box>
                {gifstMenuOpen && <GifsMenu chatBoxComponent gifstMenuOpen={gifstMenuOpen} setGifstMenuOpen={setGifstMenuOpen} func={addGifChat} messageInfo={messageInfo} saveMessage={saveMessage} socket={socket}/>}
                {emojisMenuOpen && <EmojisMenu chatBoxComponent setEmojisMenuOpen={setEmojisMenuOpen}  func={addEmojiChat} setValues={setValues} values={values}/>}
            </Box>
        :<Avatar className={avatarChatClosed} src={personAvatar} onClick={toggleChat}/>}
    </>
  );
};

export default ChatBox;
