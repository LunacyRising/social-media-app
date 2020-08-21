import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core"; 
import ChatBox from "./ChatBox";

const ChatBoxesContainer = () => { 

  const useStyles = makeStyles(() => ({ 

    chatBoxesContainer: {
        position: "fixed",
        top: 0,
        right: 0,
        display: "flex",
        justifyContent: "end",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1500,
        "@media(min-width: 768px)" : {
          top: "initial",
          bottom: 0,
          flexDirection: "row-reverse",
          height: "initial"
      },
    },
  }));
  
  const classes = useStyles();

  const { chatBoxesContainer } = classes;

  const { chatBoxes } = useSelector(state => state.chatReducer);

  return (
    <>
        <Box className={chatBoxesContainer}> 
            {chatBoxes.map(box =>(
              <ChatBox key={box.id} personUserName={box.userName} personId={box.id} personAvatar={box.personAvatar}/>
             ))}
        </Box> 
    </>
  );
};

export default ChatBoxesContainer;
