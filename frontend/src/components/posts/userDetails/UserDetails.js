import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {Card, Tooltip, CardContent, Avatar, Typography, Box, IconButton} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';


const UserDetails = ({avatar,creatorUserName}) => {

    const useStyles = makeStyles((theme) => ({
        wholeCont: {
            position: "absolute",
            zIndex: theme.zIndex.tooltip,
            bottom: 20,
            border: "solid 1px #2e3236",
            transition: "all 0.3s" 
        },
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        avatarContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: 10
        },
        userAvatar: {
            height: 75,
            width: 75,
        },
        info: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 3
        },
        individualInfo: {
            fontSize: 10
        },
        individualInfo2: {
            marginLeft: 8,
            fontSize: 10,
        },
        btns: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 10
        }
        }));
    const classes = useStyles();

    const {wholeCont ,container, avatarContainer, userAvatar, info,individualInfo, individualInfo2,btns} = classes;

    const dispatch = useDispatch(); 

    return (
        <>
            <Card className={wholeCont}>
                <Box className={avatarContainer}>
                    <Avatar className={userAvatar} alt="userAvatar" src={avatar}/>
                    <Typography>{creatorUserName}</Typography>
                </Box>
                <CardContent>
                    <Box className={container}>
                        <Box className={info}>
                            <Typography className={individualInfo} color="primary" variant="caption">Register Date:</Typography>
                            <Typography className={individualInfo2}>Dec 13, 2016</Typography>
                        </Box>
                        <Box className={info}>   
                        <   Typography className={individualInfo} color="primary" variant="caption">Posts:</Typography>
                            <Typography className={individualInfo2}>1.823</Typography>
                        </Box>
                        <Box className={info}>
                            <Typography className={individualInfo} color="primary" variant="caption">Sympathy:</Typography>
                            <Typography className={individualInfo2}>776</Typography>
                        </Box>
                        <Box className={info}>
                            <Typography className={individualInfo} color="primary" variant="caption">Points:</Typography>
                            <Typography className={individualInfo2}>113</Typography>
                        </Box>
                        <Box className={info}>
                            <Typography className={individualInfo} color="primary" variant="caption">Genre:</Typography>
                            <Typography className={individualInfo2}>Male</Typography>
                        </Box>
                    </Box>
                    <Box className={btns}>
                        <Tooltip title="Add To Friend!">
                            <IconButton>
                                <AddCircleIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add To Friend!">
                            <IconButton>
                                <AddCircleIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add To Friend!">
                            <IconButton>
                                <AddCircleIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </CardContent>  
            </Card>
        </>
    );
};

export default UserDetails;