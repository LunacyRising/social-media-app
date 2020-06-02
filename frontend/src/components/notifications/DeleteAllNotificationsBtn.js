import React from "react";
import {useDispatch} from "react-redux";
import {deleteAllNotifications} from "../../actions/notificationsActions/deleteAllNotifications";
import {Button, Box} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const DeleteAllNotificationsBtn = () => {

    const useStyles = makeStyles(() => ({
       btnContainer: {
            width: "80%",
            margin: "10px auto",
            textAlign: "center",
            fontSize: 10
        },
       btn: {
            fontSize: 10
        }
      }));
      const classes = useStyles();
      const {btn, btnContainer} = classes;
      ////////////////////////////////////////
      const dispatch = useDispatch()
    return(
        <> 
            <Box className={btnContainer}>
                <Button className={btn} onClick={() => dispatch(deleteAllNotifications())}>Delete all notifications</Button>
            </Box>
        </>
    )
}

export default DeleteAllNotificationsBtn