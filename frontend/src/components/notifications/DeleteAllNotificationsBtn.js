import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteAllNotifications } from "../../actions/notificationsActions/deleteAllNotifications";
import { Button, Box } from "@material-ui/core";
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

      const { t } = useTranslation();

      const dispatch = useDispatch()

    return(
        <> 
            <Box className={btnContainer}>
                <Button className={btn} onClick={() => dispatch(deleteAllNotifications())}>{t("DeleteAllNotifications")}</Button>
            </Box>
        </>
    )
}

export default DeleteAllNotificationsBtn