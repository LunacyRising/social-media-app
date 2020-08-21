import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import PulsingGreenBall from "../PulsingGreenBall";
import { createChatBox } from "../../actions/chatActions/createChatBox";

const FriendMenu = () => { 

    const useStyles = makeStyles((theme) => ({

        menuContainer:{
            position: "fixed",
            right: 0,
            bottom: 0,
            width: 200
        },
        btn:{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: theme.palette.primary.main,
            textTransform: "lowercase",
            '&:hover': {
                backgroundColor: "#191919",
            }
        },
        friendMenu:{
            width: "100%",
            backgroundColor:"#191919",
        },
        listItem:{
            paddingLeft: 15,
            cursor: "pointer"
        }
    }));

    const classes = useStyles();

    const dispatch = useDispatch();
    
    const { menuContainer, btn, friendMenu, listItem } = classes;

    const { friends } = useSelector(state => state.friendsReducer);

    const { chatBoxes } = useSelector(state => state.chatReducer);

    const [ menuOpen, setMenuOpen ] = useState(false);

    const chatBoxExists = (personId) => {
        return chatBoxes.some(person => person.id === personId )
    }

    const createSingleChatBox = (personId, personInfo) => {
        !chatBoxExists(personId) && dispatch(createChatBox(personInfo))
    }

    return (
        <>
            <Box className={menuContainer}>
                <Button className={btn} onClick={() => setMenuOpen(prev => !prev)} endIcon={menuOpen ? <ExpandMoreRoundedIcon/> : <ExpandLessRoundedIcon/>}>
                    chat ({friends.length})
                </Button>
                {menuOpen &&
                <ClickAwayListener onClickAway={() => setMenuOpen(false)}>
                    <List className={friendMenu} disablePadding={true}>
                        {friends.length > 0 && friends.map(friend => (
                            <Box key={friend.friendId}>
                                <ListItem className={listItem} onClick={() => createSingleChatBox(friend.friendId, {id: friend.friendId, userName: friend.userName, personAvatar: friend.avatar})} disableGutters={true}>
                                    <ListItemAvatar>
                                        <Avatar alt={friend.userName} src={friend.avatar}/>
                                        <PulsingGreenBall friendMenuComponent/>
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography color="primary" variant="caption">{friend.userName}</Typography>}/>
                                </ListItem>
                                <Divider/>
                            </Box>
                        ))}
                    </List>
                </ClickAwayListener>}
            </Box>
        </>
    );
};

export default FriendMenu;
