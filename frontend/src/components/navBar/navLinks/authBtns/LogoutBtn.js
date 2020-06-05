import React from "react";
import { useHistory} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { logoutAction } from "../../../../actions/authActions/logoutAction";
import { closeDrawer } from "../../../../actions/modalsActions/drawer";


const LogoutBtn = () => {


  const useStyles = makeStyles(() => ({

    btn: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      textTransform: "uppercase",
      transition: "0.2s ease all",
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

  const history = useHistory(); 

  const logoutDispatch = () => { 
    dispatch(logoutAction());
    dispatch(closeDrawer());
    history.push("/logingOut");
  }

  const dispatch = useDispatch()


    return (
            <>
                <Button className={btn} onClick={() => logoutDispatch()}>
                    {t("Logout")}
                </Button>
            </>
        )
    }
export default LogoutBtn