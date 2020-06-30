import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";
import { NavBtn } from "../../../../styledComponents/MyBtn";

const EditProfileBtn = () => {


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
                <Link className={link} to="/editProfile" onClick={() => dispatch(closeDrawer())}>{t("EditProfile")}</Link>
              </NavBtn> 
            </>
        )
    }
export default EditProfileBtn
