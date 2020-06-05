import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import spanishicon from "../../../../../src/utils/images/spanishicon.svg";

const LoginBtn = ({ changeLang }) => {


  const useStyles = makeStyles(() => ({
    
    btn: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
        transition: ".2s ease all",
        width: 40,
        height: 40,
        backgroundImage: `url(${spanishicon})`,
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
                <IconButton onClick={() => changeLang("es")}>
                    <span className={btn}/>
                </IconButton>
            </>
        )
    }
export default LoginBtn
