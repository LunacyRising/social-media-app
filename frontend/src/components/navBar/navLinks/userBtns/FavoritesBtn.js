import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { NavBtn } from "../../../../styledComponents/MyBtn";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";

const FavoritesBtn = () => {


  const useStyles = makeStyles((theme) => ({ 

    link: {
      color: "white",
      transition: "0.3s ease-in-out",
      "&:hover": { 
        textDecoration: "none",
        color: theme.palette.primary.main
      }
    }
  }));
  const classes = useStyles();

  const { link } = classes;

  const { t } = useTranslation();

  const dispatch = useDispatch();

    return (
            <>
                <NavBtn>
                  <Link className={link} to="/favorites" onClick={() =>dispatch(closeDrawer())}>{t("Favorites")}</Link>
                </NavBtn>
            </>
        )
    }
export default FavoritesBtn
