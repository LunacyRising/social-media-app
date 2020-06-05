import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";

const FavoritesBtn = () => {


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

    return (
            <>
                <Button component={Link} to="/favorites" className={btn} onClick={() =>dispatch(closeDrawer())}>{t("Favorites")}</Button>
            </>
        )
    }
export default FavoritesBtn
