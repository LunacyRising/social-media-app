import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { registerModalOpen } from "../../../../actions/modalsActions/register";

const RegisterBtn = () => {


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
                <Button className={btn} onClick={() => dispatch(registerModalOpen())}>
                    {t("Register")}
                </Button>
            </>
        )
    }
export default RegisterBtn
