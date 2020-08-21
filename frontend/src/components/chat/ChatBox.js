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
import { saveMessages } from "../../actions/chatActions/saveMessages";
import { addImageChat } from "../../helperFunctions/addImageChat";
import { addGifChat } from "../../helperFunctions/addGifChat";
import { addEmojiChat } from "../../helperFunctions/addEmojiChat";

const ChatBox = ({ personUserName, personId, personAvatar }) => { 

const [ alert, setAlert ] = useState(false);

console.log("me re renderizochatbox")

  const useStyles = makeStyles((theme) => ({ 

    chatBoxContainer: {
        position: "absolute",
        top: 0,
        left: 0,
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
    chatClosed: {
        transform: "translateX(100%)",
        transition: "0.2s ease-in-out"
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
    sender:{
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

    const { chatBoxContainer, chatToggle, name, chat, chatClosed, avatarChatClosed, messageContainer, message, sender, messageTime, sendedMessage, receivedMessage, receiver, isWrittingMessage, friendAvatar, btnsContainer } = classes;

    const { userId, userName, avatar } = useSelector(state => state.authReducer);

    const { chatMessages } = useSelector(state => state.chatReducer);

    const { socket } = useSelector(state => state.ioReducer);

    const [ play ] = useSound(alerta);

    const { t } = useTranslation();

    dayjs.extend(relativeTime);

    const [ chatOpen, setChatOpen ] = useState(true);

    const [ chatMessage, setChatMessage ] = useState(null);

    const [ writter, setWritter ] = useState(null);

    const [ isWritting, setIsWritting ] = useState(false);

    const [ gifstMenuOpen, setGifstMenuOpen ] = useState(false);

    const [ emojisMenuOpen, setEmojisMenuOpen ] = useState(false);

    const lastElementRef = useRef();

    const dispatch = useDispatch();

    const filteredMessages = chatMessages.filter( msg => msg.senderId === personId && msg.receiverId === userId || msg.senderId === userId && msg.receiverId === personId);

    const newMessageAlert = () => {
        setAlert(true);
        play()
    }

    //alerta de mensaje cuando el chat esta minimizado
    useEffect(() => {
        socket.on("answer", ({senderId}) => {
            !chatOpen && senderId === personId && newMessageAlert()
        })
    },[chatMessages])


    const handleChange = (e) => {
        e.preventDefault();
        setChatMessage(e.target.value);
        socket.emit("is writting", userName, personUserName)
    }

    //recive el evento del cuando el otro usuario esta escribiendo
    useEffect(() => {
        socket.on("is writting",({sender}) => {
        setWritter(sender)
        setIsWritting(true)
        })
    },[writter])

    //recive el evento del cuando el otro usuario dejo de escribir
    useEffect(() => {
        socket.on("stopped writting", () => {
            setIsWritting(false)
        })
    },[isWritting])

   //emite evento de parar de escribir cuando uno borra lo que escribio previamente
    useEffect(() => {
        chatMessage === "" && socket.emit("stopped writting", userName, personUserName)
    },[chatMessage])


    //scroll cuando se manda o recive mensaje
    useEffect(() => {
        lastElementRef.current !== null && lastElementRef.current.scrollIntoView({behavior: "smooth"})
    },[filteredMessages])

    const messageInfo = {chatMessage, receiver: personUserName, sender: userName, avatar, receiverId: personId, senderId: userId, sendedAt: Date.now()};

    const submitMsg = (e) => {
        e.preventDefault();
        dispatch(saveMessages(messageInfo))
        socket.emit("chat message", messageInfo)
        socket.emit("stopped writting", userName, personUserName)
        setChatMessage("")
        console.log("socketemit", socket["emit"])
    }

    const saveMessage = (args) => {
        dispatch(saveMessages(args))
    }

    const removeAlert = () => {
       alert && setAlert(false) 
    }

    return (
    <>
        {chatOpen ?
            <Box className={ chatOpen ? chatBoxContainer : chatClosed}>
                <Box className={chatToggle} onClick={() => setChatOpen(prev => !prev)}>
                    <Typography className={name}>
                        {personUserName}
                    </Typography>
                    <DeleteChatBox id={personId}/>
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
                                <img style={{ width: "100%"}} className={msg.senderId === userId ? `${message} ${sender}`: `${message} ${receiver}`}src={msg.chatMessage} alt="chat picture"/> :
                                <Typography className={msg.senderId === userId ? `${message} ${sender}`: `${message} ${receiver}`}>
                                    {msg.chatMessage}
                                </Typography>}
                            </Box>
                        </ListItem>
                    ))}
                    {isWritting && <Typography className={isWrittingMessage} color="primary">{`${writter} ${t("Chat.isWritting")}...`}</Typography>}
                    <Box ref={lastElementRef} style={{height: 0}}/>
                </List>
                <InputField chatMsg={chatMessage} removeAlert={removeAlert} handleChange={handleChange} submitMsg={submitMsg}/>
                <Box className={btnsContainer}>
                    <UploadImageBtn chatBoxComponent func={addImageChat} messageInfo={messageInfo} saveMessage={saveMessage} socket={socket}/>
                    <SearchGif chatBoxComponent func={addGifChat} messageInfo={messageInfo} saveMessage={saveMessage} socket={socket} setGifstMenuOpen={setGifstMenuOpen}/>
                    <SearchEmoji chatBoxComponent setEmojisMenuOpen={setEmojisMenuOpen}/>
                </Box>
                {gifstMenuOpen && <GifsMenu chatBoxComponent setGifstMenuOpen={setGifstMenuOpen} func={addGifChat} messageInfo={messageInfo} saveMessage={saveMessage} socket={socket}/>}
                {emojisMenuOpen && <EmojisMenu chatBoxComponent setEmojisMenuOpen={setEmojisMenuOpen} setChatMessage={setChatMessage} func={addEmojiChat}/>}
            </Box>
        :<Avatar className={avatarChatClosed} src={personAvatar} onClick={() => setChatOpen(true)}/>}
    </>
  );
};

export default ChatBox;
