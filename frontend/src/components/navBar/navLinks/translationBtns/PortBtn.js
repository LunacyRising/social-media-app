import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import brazil from "../../../../../src/utils/images/brazil.png";

const LoginBtn = ( {changeLang }) => {


  const useStyles = makeStyles(() => ({
    
    btn: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
        transition: ".2s ease all",
        "&:hover": {
          textDecoration: "none",
          color: "#8b70d2",
          backgroundColor: "transparent"
        },
      }
  }));
  const classes = useStyles();
  const { btn } = classes;


  const dispatch = useDispatch()


    return (
            <>
                <IconButton onClick={() => changeLang("port")}>
                    <img className={btn} src={brazil} width={42} height={42} alt="brazil"/>
                </IconButton>
            </>
        )
    }
export default LoginBtn
