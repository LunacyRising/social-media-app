import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { NavBtn } from "../../../../styledComponents/MyBtn";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";

const GalleryBtn = () => {


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

  const { userId } = useSelector(state => state.authReducer);

    return (
            <>
                <NavBtn>
                  <Link className={link} to={`gallery/${userId}`} onClick={() =>dispatch(closeDrawer())}>{t("MyGallery")}</Link>
                </NavBtn>
            </>
        )
    }
export default GalleryBtn
