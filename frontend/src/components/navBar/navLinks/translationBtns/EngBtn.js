import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import englishicon from "../../../../../src/utils/images/englishicon.svg";

const LoginBtn = ( {changeLang }) => {


  const useStyles = makeStyles(() => ({
    
    btn: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
        transition: ".2s ease all",
        width: 40,
        height: 40,
        backgroundImage: `url(${englishicon})`,
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
                <IconButton onClick={() => changeLang("en")}>
                    <span className={btn}/>
                </IconButton>
            </>
        )
    }
export default LoginBtn
