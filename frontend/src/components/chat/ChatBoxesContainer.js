import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core"; 
import ChatBox from "./ChatBox";

const ChatBoxesContainer = ({ friends }) => { 

  const useStyles = makeStyles(() => ({ 

    chatBoxesContainer: {
        position: "absolute",
        bottom: 0,
        right: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        width: 800,
        pointerEvents: "none"
    },
  }));
  const classes = useStyles();

  const { chatBoxesContainer } = classes;

  return (
    <>
        <Box className={chatBoxesContainer} disableGutters={true}> 
            {friends.map(friend =>(
              <ChatBox userName={friend.userName} avatar={friend.avatar} friendId={friend.friendId}/>
            ))}
        </Box> 
    </>
  );
};

export default ChatBoxesContainer;
