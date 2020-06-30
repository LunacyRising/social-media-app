import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteAllNotifications } from "../../actions/notificationsActions/deleteAllNotifications";
import { Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const DeleteAllNotificationsBtn = () => {

    const useStyles = makeStyles(() => ({
       btn: {
            fontSize: 10,
            padding: 10,
            width: "100%"
        }
      }));
      const classes = useStyles();

      const { btn } = classes;

      const { t } = useTranslation();

      const dispatch = useDispatch()

    return(
        <> 
            <Button className={btn} onClick={() => dispatch(deleteAllNotifications())}>{t("DeleteAllNotifications")}</Button>
        </>
    )
}

export default DeleteAllNotificationsBtn