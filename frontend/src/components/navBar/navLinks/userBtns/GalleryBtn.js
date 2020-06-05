import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";

const GalleryBtn = () => {


  const useStyles = makeStyles((theme) => ({
    btn: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
        fontFamily: theme.typography.fontFamily,
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

  const { userId } = useSelector(state => state.authReducer);

    return (
            <>
                <Button component={Link} to={`gallery/${userId}`} className={btn} onClick={() =>dispatch(closeDrawer())}>Gallery</Button>
            </>
        )
    }
export default GalleryBtn
