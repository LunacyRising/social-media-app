import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";

const EditProfileBtn = () => {


  const useStyles = makeStyles((theme) => ({

    btn: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: theme.typography.fontFamily,
        textTransform: "uppercase",
        transition: ".2s ease all",
        marginRight: 10,
        "&:hover": {
          textDecoration: "none",
          color: "#8b70d2",
          backgroundColor: "transparent"
        },
      }
  }));
  const classes = useStyles();

  const { btn } = classes;

  const { t } = useTranslation();

  const dispatch = useDispatch();

    return (
            <>
                <Button component={Link} to="/editProfile" className={btn} onClick={() => dispatch(closeDrawer())}>{t("EditProfile")}</Button> 
            </>
        )
    }
export default EditProfileBtn
