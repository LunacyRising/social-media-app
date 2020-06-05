import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import {loginModalOpen} from "../../../../actions/modalsActions/login";

const LoginBtn = () => {


  const useStyles = makeStyles(() => ({
    
    btn: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
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

  const dispatch = useDispatch()


    return (
            <>
                <Button className={btn} onClick={() => dispatch(loginModalOpen())}>
                {t("Login")} 
                </Button>
            </>
        )
    }
export default LoginBtn
