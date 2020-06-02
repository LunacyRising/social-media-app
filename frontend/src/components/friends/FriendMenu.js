import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Menu, Box, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const FriendMenu = ({ creatorUserName, avatar}) => { 

    const useStyles = makeStyles(() => ({
        container: {
            position: "absolute",
            bottom: 0,
            right: 20,
            width: 400
        },
        menu: {
            '& div': {
                width: 300
            }
        },
        friendsContainer: {
            width: "80%",
            margin: "auto",
        },
        friend: {
            width: "100%",
            height: 60,
            padding: 10,
        }
      }));
      const classes = useStyles();
      const { container, menu, friendsContainer, friend} = classes;

      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);

      const handleClose = () => {
        setAnchorEl(null);
      };
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    /////////////////////////////////////////////////////////
    const {isAuthenticated} = useSelector(state => state.authReducer);
    /////////////////////////////////////////////////////////
    const dispatch = useDispatch(); 
    //////////////////////////////////////////////////////////
  
    return (
        <>
            <Box className={container}>
                <IconButton onClick={handleClick}>Open friends menu</IconButton>
                <Box className={friendsContainer}>
                    <Menu className={menu}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                    PopoverClasses={{
                        width: 500
                    }}
                    >
                        <Box className={friend}>Rubi Henderson</Box>
                        <Divider/>
                        <Box className={friend}>Rubi Henderson</Box>
                        <Divider/>
                        <Box className={friend}>Rubi Henderson</Box>
                        <Divider/>
                        <Box className={friend}>Rubi Henderson</Box>
                    </Menu>   
                </Box>
            </Box>
        </>
    );
};

export default FriendMenu;
