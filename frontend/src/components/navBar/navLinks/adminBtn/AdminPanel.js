import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { NavBtn } from "../../../../styledComponents/MyBtn";

const AdminPanel = () => {

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

    return (
            <>
                <NavBtn>
                    <Link className={link} to="/admin/users">Admin panel</Link>
                </NavBtn>
            </>
        )
    }
export default AdminPanel
