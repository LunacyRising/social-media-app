import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { NavBtn } from "../../../../styledComponents/MyBtn";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";

const GalleriesBtn = () => {


  const useStyles = makeStyles(() => ({

    link: {
      color: "white",
      "&:hover": { 
        textDecoration: "none",
        color: "white"
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
                  <Link className={link} to={"/galleries"} onClick={() =>dispatch(closeDrawer())}>{t("ExploreGalleries")}</Link>
                </NavBtn>
            </>
        )
    }
export default GalleriesBtn
