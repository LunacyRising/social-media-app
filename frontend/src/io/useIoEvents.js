import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { emitEvent } from "./emitEvents/emitEvents";
import { saveMessages } from "../actions/chatActions/saveMessages";
import { changeMessageStatus } from "../actions/chatActions/changeMessageStatus";

const useIoEvents = (initialState) => {

    const [values, setValues] = useState(initialState); 

    const [ isWritting, setIsWritting ] = useState(false);

    const [ writter, setWritter ] = useState("");

    const [ error, setError ] = useState(false);

    const { chatMessage, avatar, sender, receiver, senderId, receiverId, personUserName, } = values;

    const { socket } = useSelector(state => state.ioReducer);

    const messageInfo = {
        chatMessage,
        avatar,
        receiver,
        sender,
        receiverId, 
        senderId,
        messageStatus: "sending",
        clientMsgId: uuidv4(),
        sendedAt: Date.now()
    };

    const dispatch = useDispatch(); 
  
    const handleChange = e => {
        const target = e.target; 
        setValues(prev => ({  
          ...prev, 
          [target.name]: target.value
        }));
        emitEvent("is-writting", {sender, receiver, senderId, receiverId}, socket)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        emitEvent("send-message", messageInfo, socket,() => {
            setValues(prev => ({
                ...prev, chatMessage: ""
            }))
        });
        dispatch(saveMessages(messageInfo));
        if(error){
            console.log("hay error vieja")
            dispatch(changeMessageStatus(messageInfo.clientMsgId, "error"));
        }
    }

   const chatError = () => {
        setError(true)
    }

    useEffect(() => {
        socket.on("error", chatError);
        return () => {
            socket.removeListener("error", chatError);
        }
    },[socket])

    const reconnect = () => {
        setError(false)
    }

    useEffect(() => {
        socket.on("reconnect", reconnect);
        return () => {
            socket.removeListener("reconnect", reconnect);
        }
    },[socket])

    const isWrittingListener = (data) => {
        const { sender } = data;
        if(sender === receiver){
            setWritter(sender)
            setIsWritting(true)
        };
    }

    const isWrittingEvent = () => {
        socket.on("is-writting2", isWrittingListener)
    }

    const stoppedWrittingListener = (data) => {
        const { sender } = data;
        if(sender === personUserName){
            setIsWritting(false)
       }
    }

    const stoppedWrittingEvent = () => {
        socket.on("stopped-writting", stoppedWrittingListener)
    }

    //emite evento cuando se dejo de escribir
    const emitStoppedWrittingEvent = () => {
        if(chatMessage === ""){
            emitEvent("stopped-writting2", {sender, receiver, receiverId}, socket)
        }
    }

    const messageSeenConfirmedListener = (data) => {
        const { clientMsgId, seenAt } = data;
        dispatch(changeMessageStatus(clientMsgId, "seen", seenAt))
    }

    const messageSeenConfirmed = () => {
        socket.on("message-seen-confirmed", messageSeenConfirmedListener)
    }

    //cambia el status del mensaje de enviando a recibido
    const messageReceivedEvent = () => {
        socket.on("message-sent", ({receiverId, clientMsgId}, callback) => {
            dispatch(changeMessageStatus(clientMsgId, "sent"));
            callback()
        });
    }

    const emitMessageSeenEvent2 = (messages) => {
        emitEvent("message-seen-confirmed-2", {sender, receiver, messages}, socket)
    }
    
    return { 
        values,
        setValues,
        messageInfo,
        handleChange,
        handleSubmit, 
        writter, 
        isWritting, 
        error, 
        isWrittingEvent, 
        stoppedWrittingEvent, 
        emitStoppedWrittingEvent, 
        messageReceivedEvent, 
        messageSeenConfirmed, 
        emitMessageSeenEvent2, 
        isWrittingListener,
        stoppedWrittingListener,
        messageSeenConfirmedListener
    }
}

export default useIoEvents